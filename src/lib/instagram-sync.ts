/*
Arquivo: src/lib/instagram-sync.ts
Objetivo: Funcoes utilitarias e integracoes compartilhadas.
Guia rapido: consulte imports no topo, depois tipos/constantes, e por fim a exportacao principal.
*/

import { prisma } from '@/lib/prisma'
import { getInstagramPosts } from '@/lib/apify'

const DEFAULT_AUTO_SYNC_INTERVAL_MS = 60 * 60 * 1000

let inFlightSync: Promise<InstagramSyncResult> | null = null
let lastSuccessfulSyncAt = 0

export interface InstagramSyncResult {
  success: boolean
  message: string
  stats: {
    total: number
    created: number
    updated: number
    skipped: number
  }
}

interface SyncOptions {
  force?: boolean
  minIntervalMs?: number
}

function emptyStats() {
  return {
    total: 0,
    created: 0,
    updated: 0,
    skipped: 0,
  }
}

async function isAutoSyncNeeded(minIntervalMs: number): Promise<boolean> {
  const now = Date.now()
  if (now - lastSuccessfulSyncAt < minIntervalMs) {
    return false
  }

  if (!prisma) {
    return false
  }

  const latest = await prisma.instagramPost.findFirst({
    select: { updatedAt: true },
    orderBy: { updatedAt: 'desc' },
  })

  if (!latest?.updatedAt) {
    return true
  }

  return now - new Date(latest.updatedAt).getTime() >= minIntervalMs
}

export async function syncInstagramPosts(options?: SyncOptions): Promise<InstagramSyncResult> {
  if (!process.env.APIFY_API_TOKEN) {
    return {
      success: false,
      message: 'APIFY_API_TOKEN não configurada.',
      stats: emptyStats(),
    }
  }

  if (!prisma) {
    return {
      success: false,
      message: 'Database not configured.',
      stats: emptyStats(),
    }
  }

  const force = options?.force ?? false
  const minIntervalMs = options?.minIntervalMs ?? DEFAULT_AUTO_SYNC_INTERVAL_MS

  if (!force) {
    const needed = await isAutoSyncNeeded(minIntervalMs)
    if (!needed) {
      return {
        success: true,
        message: 'Instagram sync skipped: dataset still fresh.',
        stats: emptyStats(),
      }
    }
  }

  if (inFlightSync) {
    return inFlightSync
  }

  inFlightSync = (async () => {
    const posts = await getInstagramPosts()
    if (!posts || posts.length === 0) {
      return {
        success: false,
        message: 'Nenhum post encontrado no Apify.',
        stats: emptyStats(),
      }
    }

    const db = prisma
    const stats = emptyStats()
    stats.total = posts.length

    try {
      for (const post of posts) {
        try {
          const existing = await db.instagramPost.findUnique({
            where: { postId: post.id },
          })
          const displayUrl = post.displayUrl || post.images?.[0] || ''

          const postData = {
            shortCode: post.shortCode,
            type: post.type || 'Image',
            url: post.url,
            displayUrl,
            videoUrl: post.videoUrl || null,
            caption: post.caption || null,
            hashtags: post.hashtags || [],
            mentions: post.mentions || [],
            likesCount: post.likesCount || 0,
            commentsCount: post.commentsCount || 0,
            videoViewCount: post.videoViewCount || null,
            dimensionsWidth: post.dimensionsWidth || null,
            dimensionsHeight: post.dimensionsHeight || null,
            timestamp: post.timestamp ? new Date(post.timestamp) : null,
            isActive: true,
          }

          if (existing) {
            await db.instagramPost.update({
              where: { postId: post.id },
              data: postData,
            })
            stats.updated += 1
          } else {
            await db.instagramPost.create({
              data: {
                postId: post.id,
                ...postData,
              },
            })
            stats.created += 1
          }
        } catch (error) {
          console.error(`Erro ao processar post ${post.id}:`, error)
          stats.skipped += 1
        }
      }

      lastSuccessfulSyncAt = Date.now()

      return {
        success: true,
        message: 'Sincronização concluída.',
        stats,
      }
    } catch (error) {
      console.error('Erro na sincronização:', error)
      return {
        success: false,
        message: 'Erro na sincronização.',
        stats,
      }
    }
  })()

  try {
    return await inFlightSync
  } finally {
    inFlightSync = null
  }
}

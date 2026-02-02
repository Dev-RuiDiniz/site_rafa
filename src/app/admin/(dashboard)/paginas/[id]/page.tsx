"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiOutlineArrowLeft,
  HiOutlineSave,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineMenuAlt2,
  HiOutlinePhotograph,
  HiOutlineVideoCamera,
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineSpeakerphone,
  HiOutlineNewspaper,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { BlockEditor } from "@/components/admin/page-builder/BlockEditor";
import SEOFields from "@/components/admin/SEOFields";

interface PageBlock {
  id?: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
  active: boolean;
}

interface Page {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  description: string | null;
  published: boolean;
  isSystem: boolean;
  blocks: PageBlock[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
}

const BLOCK_TYPES = [
  { type: "hero", name: "Hero", icon: HiOutlinePhotograph, description: "Seção de destaque com imagem/vídeo" },
  { type: "text", name: "Texto", icon: HiOutlineMenuAlt2, description: "Bloco de texto com título" },
  { type: "gallery", name: "Galeria", icon: HiOutlineViewGrid, description: "Grade de imagens" },
  { type: "video", name: "Vídeo", icon: HiOutlineVideoCamera, description: "Vídeo do YouTube ou Vimeo" },
  { type: "features", name: "Features", icon: HiOutlineCollection, description: "Lista de características" },
  { type: "cta", name: "CTA", icon: HiOutlineSpeakerphone, description: "Chamada para ação" },
  { type: "cards", name: "Cards", icon: HiOutlineNewspaper, description: "Grade de cards" },
];

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPage();
  }, [id]);

  const fetchPage = async () => {
    try {
      const res = await fetch(`/api/admin/pages/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
      } else {
        router.push("/admin/paginas");
      }
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!page) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: page.name,
          slug: page.slug,
          title: page.title,
          description: page.description,
          published: page.published,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          metaKeywords: page.metaKeywords,
          ogImage: page.ogImage,
          blocks: page.blocks.map((block, index) => ({
            type: block.type,
            content: block.content,
            order: index,
            active: block.active,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPage(data.page);
        alert("Página salva com sucesso!");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar página");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Erro ao salvar página");
    } finally {
      setSaving(false);
    }
  };

  const addBlock = (type: string) => {
    if (!page) return;

    const newBlock: PageBlock = {
      type,
      content: getDefaultContent(type),
      order: page.blocks.length,
      active: true,
    };

    setPage({
      ...page,
      blocks: [...page.blocks, newBlock],
    });
    setShowBlockSelector(false);
    setEditingBlockIndex(page.blocks.length);
  };

  const getDefaultContent = (type: string): Record<string, unknown> => {
    switch (type) {
      case "hero":
        return {
          badge: "",
          title: "Título do Hero",
          subtitle: "Subtítulo",
          description: "Descrição do hero",
          image: "",
          video: "",
          button1Text: "Botão Principal",
          button1Link: "#",
          button2Text: "",
          button2Link: "",
          overlay: 60,
          align: "center",
        };
      case "text":
        return {
          title: "Título da Seção",
          subtitle: "",
          content: "Conteúdo de texto aqui...",
          align: "left",
          background: "white",
        };
      case "gallery":
        return {
          title: "Galeria",
          subtitle: "",
          images: [],
          columns: 3,
          gap: 4,
        };
      case "video":
        return {
          title: "",
          url: "",
          autoplay: false,
          controls: true,
        };
      case "features":
        return {
          title: "Nossos Diferenciais",
          subtitle: "",
          items: [
            { icon: "star", title: "Feature 1", description: "Descrição da feature" },
            { icon: "star", title: "Feature 2", description: "Descrição da feature" },
            { icon: "star", title: "Feature 3", description: "Descrição da feature" },
          ],
          columns: 3,
        };
      case "cta":
        return {
          title: "Pronto para começar?",
          description: "Entre em contato conosco",
          buttonText: "Fale Conosco",
          buttonLink: "/contato",
          background: "black",
        };
      case "cards":
        return {
          title: "Cards",
          subtitle: "",
          cards: [
            { image: "", title: "Card 1", description: "Descrição", link: "" },
          ],
          columns: 3,
        };
      default:
        return {};
    }
  };

  const removeBlock = (index: number) => {
    if (!page || !confirm("Tem certeza que deseja remover este bloco?")) return;

    const newBlocks = page.blocks.filter((_, i) => i !== index);
    setPage({ ...page, blocks: newBlocks });
    if (editingBlockIndex === index) {
      setEditingBlockIndex(null);
    }
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!page) return;

    const newBlocks = [...page.blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;

    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setPage({ ...page, blocks: newBlocks });

    if (editingBlockIndex === index) {
      setEditingBlockIndex(targetIndex);
    } else if (editingBlockIndex === targetIndex) {
      setEditingBlockIndex(index);
    }
  };

  const updateBlockContent = (index: number, content: Record<string, unknown>) => {
    if (!page) return;

    const newBlocks = [...page.blocks];
    newBlocks[index] = { ...newBlocks[index], content };
    setPage({ ...page, blocks: newBlocks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Página não encontrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/paginas"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {page.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              /{page.slug}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/${page.slug === 'home' ? '' : page.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
          >
            <HiOutlineEye className="w-4 h-4" />
            Visualizar
          </a>
          <Button onClick={handleSave} disabled={saving}>
            <HiOutlineSave className="w-4 h-4 mr-2" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Page Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Configurações da Página
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={page.name}
              onChange={(e) => setPage({ ...page, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Slug (URL)
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400 mr-1">/</span>
              <input
                type="text"
                value={page.slug}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={page.published ? "published" : "draft"}
              onChange={(e) => setPage({ ...page, published: e.target.value === "published" })}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicada</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <SEOFields
            metaTitle={page.metaTitle || ""}
            metaDescription={page.metaDescription || ""}
            metaKeywords={page.metaKeywords || ""}
            ogImage={page.ogImage || ""}
            slug={page.slug}
            onChange={(field, value) => setPage({ ...page, [field]: value })}
          />
        </div>
      </div>

      {/* Blocks Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Blocos da Página
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Arraste e organize os blocos para montar sua página
          </p>
        </div>

        <div className="p-6 space-y-4">
          {page.blocks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Nenhum bloco adicionado ainda
              </p>
              <Button onClick={() => setShowBlockSelector(true)}>
                <HiOutlinePlus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Bloco
              </Button>
            </div>
          ) : (
            <>
              {page.blocks.map((block, index) => (
                <motion.div
                  key={index}
                  layout
                  className={`border rounded-lg overflow-hidden ${
                    editingBlockIndex === index
                      ? "border-black dark:border-white"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {/* Block Header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                    onClick={() => setEditingBlockIndex(editingBlockIndex === index ? null : index)}
                  >
                    <div className="flex items-center gap-3">
                      {BLOCK_TYPES.find((b) => b.type === block.type)?.icon && (
                        <span className="p-1.5 bg-white dark:bg-gray-600 rounded">
                          {(() => {
                            const Icon = BLOCK_TYPES.find((b) => b.type === block.type)?.icon;
                            return Icon ? <Icon className="w-4 h-4" /> : null;
                          })()}
                        </span>
                      )}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {BLOCK_TYPES.find((b) => b.type === block.type)?.name || block.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(index, "up");
                        }}
                        disabled={index === 0}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-30"
                      >
                        <HiChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveBlock(index, "down");
                        }}
                        disabled={index === page.blocks.length - 1}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-30"
                      >
                        <HiChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBlock(index);
                        }}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Block Editor */}
                  {editingBlockIndex === index && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <BlockEditor
                        type={block.type}
                        content={block.content}
                        onChange={(content: Record<string, unknown>) => updateBlockContent(index, content)}
                      />
                    </div>
                  )}
                </motion.div>
              ))}

              <Button
                variant="outline"
                onClick={() => setShowBlockSelector(true)}
                className="w-full border-dashed"
              >
                <HiOutlinePlus className="w-4 h-4 mr-2" />
                Adicionar Bloco
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Block Selector Modal */}
      {showBlockSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Escolha um Bloco
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Selecione o tipo de bloco que deseja adicionar
              </p>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {BLOCK_TYPES.map((blockType) => (
                <button
                  key={blockType.type}
                  onClick={() => addBlock(blockType.type)}
                  className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-black dark:hover:border-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <blockType.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-2" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {blockType.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    {blockType.description}
                  </span>
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setShowBlockSelector(false)}
                className="w-full"
              >
                Cancelar
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

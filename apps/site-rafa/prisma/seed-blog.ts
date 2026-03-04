import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog data...");

  // Create categories
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: "tendencias" },
      update: {},
      create: {
        name: "Tendências",
        slug: "tendencias",
        description: "As últimas tendências do mercado de beleza",
        color: "#F59E0B",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "tecnologia" },
      update: {},
      create: {
        name: "Tecnologia",
        slug: "tecnologia",
        description: "Inovações tecnológicas para o setor",
        color: "#3B82F6",
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: "negocios" },
      update: {},
      create: {
        name: "Negócios",
        slug: "negocios",
        description: "Dicas para gestão de salões e spas",
        color: "#10B981",
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create tags
  const tags = await Promise.all([
    prisma.blogTag.upsert({
      where: { slug: "head-spa" },
      update: {},
      create: { name: "Head Spa", slug: "head-spa" },
    }),
    prisma.blogTag.upsert({
      where: { slug: "design-italiano" },
      update: {},
      create: { name: "Design Italiano", slug: "design-italiano" },
    }),
    prisma.blogTag.upsert({
      where: { slug: "wellness" },
      update: {},
      create: { name: "Wellness", slug: "wellness" },
    }),
    prisma.blogTag.upsert({
      where: { slug: "tricologia" },
      update: {},
      create: { name: "Tricologia", slug: "tricologia" },
    }),
    prisma.blogTag.upsert({
      where: { slug: "sustentabilidade" },
      update: {},
      create: { name: "Sustentabilidade", slug: "sustentabilidade" },
    }),
  ]);

  console.log(`✅ Created ${tags.length} tags`);

  // Create blog posts
  const posts = [
    {
      title: "Head Spa: A Tendência que Está Revolucionando os Salões de Beleza",
      slug: "head-spa-tendencia-revolucionando-saloes",
      excerpt:
        "Descubra como o Head Spa se tornou o serviço mais procurado em salões de alto padrão e como implementar essa técnica japonesa no seu negócio.",
      content: `O Head Spa, técnica de origem japonesa que combina massagem craniana, tratamento capilar e aromaterapia, está conquistando o mercado brasileiro de beleza. Em 2024, registramos um aumento de 340% na procura por este serviço em salões de alto padrão.

## O que é Head Spa?

O Head Spa vai muito além de uma simples lavagem de cabelo. É uma experiência sensorial completa que combina:

- **Diagnóstico do couro cabeludo** com equipamentos de alta tecnologia
- **Massagem craniana** com técnicas orientais
- **Tratamentos personalizados** para cada tipo de cabelo e couro cabeludo
- **Aromaterapia** para relaxamento profundo
- **Vapor e hidratação** com produtos premium

## Por que investir em Head Spa?

Os números falam por si:

1. **Ticket médio 3x maior** que serviços tradicionais
2. **90% de taxa de retorno** dos clientes
3. **Alto índice de indicação** - clientes satisfeitos trazem novos clientes
4. **Diferenciação competitiva** no mercado saturado

## Equipamentos essenciais

Para oferecer uma experiência de Head Spa de excelência, você precisa de:

- Estações ergonômicas com reclinação adequada
- Sistema de vapor e nebulização
- Iluminação ajustável
- Isolamento acústico
- Produtos profissionais de alta qualidade

## Conclusão

O Head Spa representa uma oportunidade única de elevar o posicionamento do seu salão e aumentar significativamente a rentabilidade. A tendência é global e veio para ficar.`,
      image: "/images/site/Head-spa-1.jpg",
      cover: "/images/site/Head-spa-2.jpg",
      categoryIds: [categories[0].id, categories[1].id],
      tagIds: [tags[0].id, tags[2].id],
    },
    {
      title: "Design Italiano: Como o Mobiliário Premium Transforma a Experiência do Cliente",
      slug: "design-italiano-mobiliario-premium-experiencia-cliente",
      excerpt:
        "Entenda por que os melhores salões e spas do mundo escolhem mobiliário italiano e como isso impacta diretamente na percepção de valor do seu negócio.",
      content: `O design italiano é sinônimo de excelência há décadas. No universo da beleza e bem-estar, essa tradição se traduz em mobiliário que une estética impecável, ergonomia avançada e durabilidade excepcional.

## A tradição italiana no design de mobiliário

A Itália lidera a indústria de design de mobiliário profissional há mais de 60 anos. Marcas como Maletti e Nilo representam o ápice dessa expertise, fornecendo para os salões e spas mais renomados do mundo.

## Características do design italiano

### Ergonomia
- Cadeiras projetadas para longas sessões de trabalho
- Lavatórios que protegem a coluna do profissional
- Estações que otimizam o fluxo de trabalho

### Materiais Premium
- Aço inoxidável de alta qualidade
- Couro legítimo ou ecológico de primeira linha
- Acabamentos resistentes ao uso intensivo

### Estética Atemporal
- Linhas clean e sofisticadas
- Cores neutras que se adaptam a qualquer ambiente
- Design que não envelhece com o tempo

## O impacto na percepção de valor

Clientes percebem imediatamente a diferença de um ambiente equipado com mobiliário premium:

1. **Confiança aumentada** no profissionalismo do estabelecimento
2. **Disposição maior** para pagar por serviços de alto valor
3. **Experiência memorável** que gera indicações

## Investimento que se paga

O mobiliário italiano profissional tem vida útil de 15-20 anos, tornando o custo-benefício extremamente favorável quando comparado a opções de menor qualidade.`,
      image: "/images/site/Shirobody_showroom.jpg",
      cover: "/images/site/heaven2.jpg",
      categoryIds: [categories[0].id],
      tagIds: [tags[1].id, tags[2].id],
    },
    {
      title: "Tricologia: O Futuro da Saúde Capilar nos Salões de Beleza",
      slug: "tricologia-futuro-saude-capilar-saloes",
      excerpt:
        "A tricologia está transformando salões em centros de saúde capilar. Saiba como oferecer tratamentos especializados e aumentar sua rentabilidade.",
      content: `A tricologia, ciência que estuda os cabelos e o couro cabeludo, está saindo dos consultórios médicos e chegando aos salões de beleza mais avançados. Essa expansão representa uma oportunidade extraordinária para profissionais que desejam se diferenciar.

## O que é Tricologia?

A tricologia é o estudo científico do cabelo e do couro cabeludo, incluindo:

- Estrutura e fisiologia capilar
- Doenças e condições do couro cabeludo
- Tratamentos preventivos e corretivos
- Diagnóstico com equipamentos especializados

## Por que trazer a Tricologia para seu salão?

### Demanda crescente
- 60% da população sofre com algum problema capilar
- Busca por soluções personalizadas está em alta
- Clientes querem resultados, não apenas estética

### Diferenciação competitiva
- Poucos salões oferecem este serviço
- Posiciona seu negócio como especialista
- Atrai público qualificado e com poder aquisitivo

### Alta rentabilidade
- Tratamentos de alto valor agregado
- Protocolos de múltiplas sessões
- Venda de produtos profissionais

## Equipamentos essenciais para Tricologia

1. **Dermatoscópio digital** para análise do couro cabeludo
2. **Vapor de ozônio** para tratamentos
3. **Cadeira com posição reclinável** para procedimentos
4. **LED terapêutico** para estimulação capilar

## Formação profissional

É fundamental investir em capacitação adequada:

- Cursos de formação em tricologia
- Certificações de produtos profissionais
- Atualização constante em novas técnicas

## Conclusão

A tricologia representa o futuro dos salões de beleza premium. Quem se posicionar agora estará à frente da concorrência nos próximos anos.`,
      image: "/images/site/DK3E3179-MOD.jpg",
      cover: "/images/site/Total-Body-356.jpg",
      categoryIds: [categories[1].id, categories[2].id],
      tagIds: [tags[3].id, tags[0].id],
    },
  ];

  for (const postData of posts) {
    const { categoryIds, tagIds, ...data } = postData;

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      console.log(`⏭️  Post "${data.title}" already exists, skipping...`);
      continue;
    }

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        published: true,
        publishedAt: new Date(),
        views: Math.floor(Math.random() * 500) + 100,
        categories: {
          create: categoryIds.map((categoryId) => ({ categoryId })),
        },
        tags: {
          create: tagIds.map((tagId) => ({ tagId })),
        },
      },
    });

    console.log(`✅ Created post: ${post.title}`);
  }

  console.log("\n🎉 Blog seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding blog:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

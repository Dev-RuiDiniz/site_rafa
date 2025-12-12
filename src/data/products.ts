export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  video?: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "lavatorios",
    name: "Lavatórios",
    slug: "lavatorios",
    description: "Lavatórios de design italiano com tecnologia de ponta para lavagem de cabelos.",
    image: "/images/site/Heaven 1.jpeg",
  },
  {
    id: "massagem",
    name: "Massagem",
    slug: "massagem",
    description: "Equipamentos com tecnologia shiatsu integrada para relaxamento completo.",
    image: "/images/site/Shirobody_showroom.jpg",
  },
  {
    id: "spa",
    name: "Spa",
    slug: "spa",
    description: "Soluções completas para tratamentos corporais e experiências de spa.",
    image: "/images/site/2024-12-04_Scena_ShiroBody_hor.jpg",
  },
  {
    id: "tratamento",
    name: "Tratamento",
    slug: "tratamento",
    description: "Equipamentos profissionais para tratamentos capilares avançados.",
    image: "/images/site/Head-spa-1.jpg",
  },
  {
    id: "mobiliario",
    name: "Mobiliário",
    slug: "mobiliario",
    description: "Cadeiras, bancadas e móveis de design exclusivo para seu salão.",
    image: "/images/site/PLANIMETRIA-La-Beautique---Mongolia-Multifunzione.jpg",
  },
];

export const products: Product[] = [
  {
    id: "heaven",
    name: "Heaven",
    slug: "heaven",
    category: "Lavatórios",
    categorySlug: "lavatorios",
    shortDescription: "A perfeição em design e conforto para lavagem de cabelos.",
    description: `O Heaven representa o ápice da engenharia italiana aplicada ao bem-estar. 
    Com design ergonômico premiado e materiais de altíssima qualidade, este lavatório 
    transforma a simples lavagem de cabelos em uma experiência sensorial única.
    
    Desenvolvido para proporcionar o máximo conforto ao cliente e praticidade ao profissional, 
    o Heaven conta com ajuste elétrico de altura, apoio de pescoço anatômico e cuba em cerâmica 
    de alta resistência.`,
    features: [
      "Ajuste elétrico de altura",
      "Apoio de pescoço ergonômico",
      "Cuba em cerâmica italiana",
      "Estofamento em couro sintético premium",
      "Sistema de massagem opcional",
      "Design premiado internacionalmente",
    ],
    image: "/images/site/Heaven 1.jpeg",
    gallery: [
      "/images/site/Heaven 1.jpeg",
      "/images/site/Heaven 2.jpg",
      "/images/site/Heaven 3.jpg",
      "/images/site/Heaven 4.jpg",
      "/images/site/Heaven 5.jpg",
      "/images/site/Heaven 6.jpg",
      "/images/site/Heaven 7.jpg",
      "/images/site/Heaven 8.jpg",
    ],
    video: "https://www.youtube.com/watch?v=example",
    featured: true,
  },
  {
    id: "shirobody",
    name: "Shirobody",
    slug: "shirobody",
    category: "Massagem",
    categorySlug: "massagem",
    shortDescription: "Tecnologia shiatsu integrada para uma experiência única.",
    description: `O Shirobody combina a tradição milenar da massagem shiatsu japonesa com o 
    design sofisticado italiano. Este equipamento revolucionário oferece uma experiência 
    completa de relaxamento durante o tratamento capilar.
    
    Com múltiplos programas de massagem e intensidade ajustável, o Shirobody permite 
    personalizar cada sessão de acordo com as preferências do cliente.`,
    features: [
      "Sistema de massagem shiatsu",
      "Múltiplos programas de massagem",
      "Intensidade ajustável",
      "Aquecimento integrado",
      "Controle remoto sem fio",
      "Memória de configurações",
    ],
    image: "/images/site/Shirobody_showroom.jpg",
    gallery: [
      "/images/site/Shirobody_showroom.jpg",
      "/images/site/Shirobody_01.jpg",
      "/images/site/Shirobody_02.jpg",
      "/images/site/Shirobody_05.jpg",
      "/images/site/Shirobody_salvacollo.jpg",
    ],
    featured: true,
  },
  {
    id: "total-body",
    name: "Total Body",
    slug: "total-body",
    category: "Spa",
    categorySlug: "spa",
    shortDescription: "Experiência completa de spa com tecnologia avançada.",
    description: `O Total Body é a solução definitiva para salões que desejam oferecer 
    tratamentos corporais de alto padrão. Com tecnologia de ponta e design envolvente, 
    este equipamento proporciona uma experiência de spa completa.
    
    Ideal para tratamentos de hidratação, relaxamento e revitalização corporal.`,
    features: [
      "Cápsula de tratamento corporal",
      "Sistema de vapor integrado",
      "Cromoterapia LED",
      "Aromaterapia",
      "Controle de temperatura",
      "Painel touch de controle",
    ],
    image: "/images/site/total_body_mod.jpg",
    gallery: [
      "/images/site/total_body_mod.jpg",
      "/images/site/2024-12-04_Scena_ShiroBody_hor.jpg",
    ],
    featured: true,
  },
  {
    id: "spa-garcon",
    name: "Spa Garçon",
    slug: "spa-garcon",
    category: "Tratamento",
    categorySlug: "tratamento",
    shortDescription: "Tratamento capilar com tecnologia de vapor.",
    description: `O Spa Garçon é o equipamento profissional ideal para tratamentos capilares 
    que necessitam de vapor e aplicação de produtos. Com tecnologia de nebulização avançada, 
    proporciona uma distribuição uniforme, potencializando a absorção.
    
    Essencial para tratamentos de hidratação profunda, reconstrução e coloração.`,
    features: [
      "Sistema de vapor profissional",
      "Aplicação de produtos",
      "Timer digital",
      "Design ergonômico",
      "Fácil manutenção",
      "Múltiplas funções",
    ],
    image: "/images/site/SPA_GARCON_nuovo_03.png",
    gallery: [
      "/images/site/SPA_GARCON_nuovo_03.png",
      "/images/site/SPA_GARCON_nuovo_04.png",
      "/images/site/SPA_GARCON_nuovo_05.png",
      "/images/site/SPA_GARCON_nuovo_08.png",
      "/images/site/SPA_GARCON_nuovo_10.png",
      "/images/site/SPA_GARCON_nuovo_11.png",
      "/images/site/SPA_GARCON_nuovo_12.png",
      "/images/site/SPA_GARCON_nuovo_13.png",
      "/images/site/SPA_GARCON_nuovo_14.png",
    ],
    featured: true,
  },
  {
    id: "head-spa",
    name: "Head Spa",
    slug: "head-spa",
    category: "Tratamento",
    categorySlug: "tratamento",
    shortDescription: "Experiência sensorial completa para tratamentos capilares.",
    description: `O Head Spa oferece uma experiência sensorial única, combinando tecnologia 
    de vapor, iluminação e massagem para tratamentos capilares de alto padrão.
    
    Ideal para spas e salões que buscam oferecer serviços diferenciados e memoráveis.`,
    features: [
      "Cúpula de vapor",
      "Iluminação relaxante",
      "Sistema de massagem",
      "Controle de temperatura",
      "Design futurista",
      "Experiência imersiva",
    ],
    image: "/images/site/Head-spa-1.jpg",
    gallery: [
      "/images/site/Head-spa-1.jpg",
      "/images/site/Head-spa-2.jpg",
      "/images/site/Head-spa-3.jpg",
      "/images/site/Head-spa-4.jpg",
      "/images/site/Head-spa-5.jpg",
      "/images/site/Head-spa-6.jpg",
    ],
    featured: true,
  },
  {
    id: "lavatorio-led",
    name: "Lavatório LED",
    slug: "lavatorio-led",
    category: "Lavatórios",
    categorySlug: "lavatorios",
    shortDescription: "Lavatório com iluminação LED integrada.",
    description: `Lavatório moderno com sistema de iluminação LED integrado, criando uma 
    atmosfera única durante o tratamento. A iluminação pode ser ajustada para criar 
    diferentes ambientes e experiências.
    
    Perfeito para salões que buscam inovação e diferenciação.`,
    features: [
      "Iluminação LED RGB",
      "Controle de cores",
      "Cuba em cerâmica",
      "Design moderno",
      "Fácil instalação",
      "Baixo consumo de energia",
    ],
    image: "/images/site/DK3E3179-MOD.jpg",
    gallery: [
      "/images/site/DK3E3179-MOD.jpg",
    ],
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

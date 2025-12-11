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
    image: "/images/categories/lavatorios.jpg",
  },
  {
    id: "massagem",
    name: "Massagem",
    slug: "massagem",
    description: "Equipamentos com tecnologia shiatsu integrada para relaxamento completo.",
    image: "/images/categories/massagem.jpg",
  },
  {
    id: "spa",
    name: "Spa",
    slug: "spa",
    description: "Soluções completas para tratamentos corporais e experiências de spa.",
    image: "/images/categories/spa.jpg",
  },
  {
    id: "tratamento",
    name: "Tratamento",
    slug: "tratamento",
    description: "Equipamentos profissionais para tratamentos capilares avançados.",
    image: "/images/categories/tratamento.jpg",
  },
  {
    id: "mobiliario",
    name: "Mobiliário",
    slug: "mobiliario",
    description: "Cadeiras, bancadas e móveis de design exclusivo para seu salão.",
    image: "/images/categories/mobiliario.jpg",
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
    image: "/images/products/heaven.jpg",
    gallery: [
      "/images/products/heaven-1.jpg",
      "/images/products/heaven-2.jpg",
      "/images/products/heaven-3.jpg",
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
    image: "/images/products/shirobody.jpg",
    gallery: [
      "/images/products/shirobody-1.jpg",
      "/images/products/shirobody-2.jpg",
      "/images/products/shirobody-3.jpg",
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
    image: "/images/products/total-body.jpg",
    gallery: [
      "/images/products/total-body-1.jpg",
      "/images/products/total-body-2.jpg",
      "/images/products/total-body-3.jpg",
    ],
    featured: true,
  },
  {
    id: "spa-garcon",
    name: "Spa Garçon",
    slug: "spa-garcon",
    category: "Lavatórios",
    categorySlug: "lavatorios",
    shortDescription: "Elegância e funcionalidade em um único produto.",
    description: `O Spa Garçon une elegância atemporal com funcionalidade excepcional. 
    Projetado para espaços que valorizam o design sofisticado sem abrir mão da praticidade, 
    este lavatório é perfeito para salões de alto padrão.
    
    Sua estrutura compacta e linhas clean se adaptam a qualquer ambiente.`,
    features: [
      "Design compacto e elegante",
      "Cuba basculante",
      "Misturador monocomando",
      "Apoio de braços integrado",
      "Estrutura em aço inox",
      "Fácil limpeza e manutenção",
    ],
    image: "/images/products/spa-garcon.jpg",
    gallery: [
      "/images/products/spa-garcon-1.jpg",
      "/images/products/spa-garcon-2.jpg",
      "/images/products/spa-garcon-3.jpg",
    ],
    featured: true,
  },
  {
    id: "vapomist",
    name: "Vapomist",
    slug: "vapomist",
    category: "Tratamento",
    categorySlug: "tratamento",
    shortDescription: "Vapor profissional para tratamentos capilares.",
    description: `O Vapomist é o equipamento profissional ideal para tratamentos capilares 
    que necessitam de vapor. Com tecnologia de nebulização avançada, proporciona uma 
    distribuição uniforme do vapor, potencializando a absorção de produtos.
    
    Essencial para tratamentos de hidratação profunda, reconstrução e coloração.`,
    features: [
      "Vapor de ozônio opcional",
      "Timer digital",
      "Braço articulado 360°",
      "Reservatório de grande capacidade",
      "Aquecimento rápido",
      "Rodízios com trava",
    ],
    image: "/images/products/vapomist.jpg",
    gallery: [
      "/images/products/vapomist-1.jpg",
      "/images/products/vapomist-2.jpg",
      "/images/products/vapomist-3.jpg",
    ],
    featured: true,
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

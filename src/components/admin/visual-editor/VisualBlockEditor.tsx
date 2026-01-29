"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineUpload, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

interface VisualBlockEditorProps {
  type: string;
  content: Record<string, unknown>;
  onChange: (content: Record<string, unknown>) => void;
}

export function VisualBlockEditor({ type, content, onChange }: VisualBlockEditorProps) {
  switch (type) {
    case "hero-slider":
      return <HeroSliderEditor content={content} onChange={onChange} />;
    case "hero":
      return <HeroEditor content={content} onChange={onChange} />;
    case "featured-products":
      return <FeaturedProductsEditor content={content} onChange={onChange} />;
    case "why-choose-us":
      return <WhyChooseUsEditor content={content} onChange={onChange} />;
    case "maletti-partnership":
      return <MalettiPartnershipEditor content={content} onChange={onChange} />;
    case "maintenance-preview":
      return <MaintenancePreviewEditor content={content} onChange={onChange} />;
    case "catalog-cta":
      return <CatalogCTAEditor content={content} onChange={onChange} />;
    case "text":
      return <TextEditor content={content} onChange={onChange} />;
    case "gallery":
      return <GalleryEditor content={content} onChange={onChange} />;
    case "video":
      return <VideoEditor content={content} onChange={onChange} />;
    case "features":
      return <FeaturesEditor content={content} onChange={onChange} />;
    case "cta":
      return <CTAEditor content={content} onChange={onChange} />;
    case "cards":
      return <CardsEditor content={content} onChange={onChange} />;
    case "contact-hero":
      return <ContactHeroEditor content={content} onChange={onChange} />;
    case "contact-options":
      return <ContactOptionsEditor content={content} onChange={onChange} />;
    case "contact-info":
      return <ContactInfoEditor content={content} onChange={onChange} />;
    case "maintenance-hero":
      return <MaintenanceHeroEditor content={content} onChange={onChange} />;
    case "maintenance-services":
      return <MaintenanceServicesEditor content={content} onChange={onChange} />;
    case "maintenance-benefits":
      return <MaintenanceBenefitsEditor content={content} onChange={onChange} />;
    case "maintenance-cta":
      return <MaintenanceCTAEditor content={content} onChange={onChange} />;
    case "maintenance-faq":
      return <MaintenanceFAQEditor content={content} onChange={onChange} />;
    case "products-hero":
      return <ProductsHeroEditor content={content} onChange={onChange} />;
    case "products-grid":
      return <ProductsGridEditor content={content} onChange={onChange} />;
    case "products-cta":
      return <ProductsCTAEditor content={content} onChange={onChange} />;
    case "brands-hero":
      return <BrandsHeroEditor content={content} onChange={onChange} />;
    case "brands-section":
      return <BrandsSectionEditor content={content} onChange={onChange} />;
    case "brands-partnership":
      return <BrandsPartnershipEditor content={content} onChange={onChange} />;
    case "brands-cta":
      return <BrandsCTAEditor content={content} onChange={onChange} />;
    case "about-hero":
      return <AboutHeroEditor content={content} onChange={onChange} />;
    case "about-mission":
      return <AboutMissionEditor content={content} onChange={onChange} />;
    case "about-values":
      return <AboutValuesEditor content={content} onChange={onChange} />;
    case "about-partnership":
      return <AboutPartnershipEditor content={content} onChange={onChange} />;
    case "about-cta":
      return <AboutCTAEditor content={content} onChange={onChange} />;
    case "maletti-hero":
      return <MalettiHeroEditor content={content} onChange={onChange} />;
    case "maletti-essencia":
      return <MalettiEssenciaEditor content={content} onChange={onChange} />;
    case "maletti-brasil":
      return <MalettiBrasilEditor content={content} onChange={onChange} />;
    case "maletti-headspa":
      return <MalettiHeadSpaEditor content={content} onChange={onChange} />;
    case "maletti-design":
      return <MalettiDesignEditor content={content} onChange={onChange} />;
    case "maletti-catalogo":
      return <MalettiCatalogoEditor content={content} onChange={onChange} />;
    default:
      return <div className="text-gray-500 text-sm">Editor não disponível</div>;
  }
}

// Componentes de Input reutilizáveis
function InputField({ label, value, onChange, placeholder, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black/10 focus:border-black"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 3 }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-black/10 focus:border-black"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImageUploader({ value, onChange, label = "Imagem" }: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {value && (
          <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
            <Image src={value} alt="Preview" fill className="object-cover" />
          </div>
        )}
        <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 text-sm">
          <HiOutlineUpload className="w-4 h-4" />
          <span>{uploading ? "Enviando..." : "Upload"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}

// Hero Slider Editor
function HeroSliderEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const slides = (content.slides as Array<{
    badge?: string;
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    button1Text?: string;
    button1Link?: string;
    button2Text?: string;
    button2Link?: string;
  }>) || [];

  const [activeSlide, setActiveSlide] = useState(0);

  const addSlide = () => {
    const newSlides = [...slides, {
      badge: "",
      title: "Novo Slide",
      subtitle: "",
      description: "",
      image: "",
      button1Text: "Ver Mais",
      button1Link: "#",
      button2Text: "",
      button2Link: "",
    }];
    onChange({ ...content, slides: newSlides });
    setActiveSlide(newSlides.length - 1);
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    onChange({ ...content, slides: newSlides });
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_, i) => i !== index);
    onChange({ ...content, slides: newSlides });
    if (activeSlide >= newSlides.length) {
      setActiveSlide(newSlides.length - 1);
    }
  };

  const currentSlide = slides[activeSlide];

  return (
    <div className="space-y-4">
      {/* Slide Tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setActiveSlide(index); }}
            className={`px-3 py-1 text-xs rounded-full ${
              activeSlide === index
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Slide {index + 1}
          </button>
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); addSlide(); }}
          className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700"
        >
          <HiOutlinePlus className="w-3 h-3" />
        </button>
      </div>

      {currentSlide && (
        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Slide {activeSlide + 1}</span>
            {slides.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); removeSlide(activeSlide); }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Remover
              </button>
            )}
          </div>

          <InputField
            label="Título"
            value={currentSlide.title || ""}
            onChange={(v) => updateSlide(activeSlide, "title", v)}
          />
          <InputField
            label="Subtítulo"
            value={currentSlide.subtitle || ""}
            onChange={(v) => updateSlide(activeSlide, "subtitle", v)}
          />
          <TextareaField
            label="Descrição"
            value={currentSlide.description || ""}
            onChange={(v) => updateSlide(activeSlide, "description", v)}
            rows={2}
          />
          <ImageUploader
            label="Imagem de Fundo"
            value={currentSlide.image || ""}
            onChange={(v) => updateSlide(activeSlide, "image", v)}
          />
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Botão 1 - Texto"
              value={currentSlide.button1Text || ""}
              onChange={(v) => updateSlide(activeSlide, "button1Text", v)}
            />
            <InputField
              label="Botão 1 - Link"
              value={currentSlide.button1Link || ""}
              onChange={(v) => updateSlide(activeSlide, "button1Link", v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <InputField
              label="Botão 2 - Texto"
              value={currentSlide.button2Text || ""}
              onChange={(v) => updateSlide(activeSlide, "button2Text", v)}
            />
            <InputField
              label="Botão 2 - Link"
              value={currentSlide.button2Link || ""}
              onChange={(v) => updateSlide(activeSlide, "button2Link", v)}
            />
          </div>
        </div>
      )}

      <InputField
        label="Velocidade Autoplay (ms)"
        value={String((content.autoplaySpeed as number) || 6000)}
        onChange={(v) => onChange({ ...content, autoplaySpeed: parseInt(v) || 6000 })}
        type="number"
      />
    </div>
  );
}

// Hero Editor (simples)
function HeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const hasVideo = !!(content.video as string);
  return (
    <div className="space-y-3">
      <InputField
        label="Badge"
        value={(content.badge as string) || ""}
        onChange={(v) => onChange({ ...content, badge: v })}
        placeholder="Ex: Novidade"
      />
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={3}
      />
      <div className="grid grid-cols-2 gap-2">
        <SelectField
          label="Alinhamento"
          value={(content.align as string) || "center"}
          onChange={(v) => onChange({ ...content, align: v })}
          options={[
            { value: "left", label: "Esquerda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Direita" },
          ]}
        />
        <InputField
          label="Overlay (%)"
          value={String((content.overlay as number) || 50)}
          onChange={(v) => onChange({ ...content, overlay: parseInt(v) || 50 })}
          type="number"
        />
      </div>
      <InputField
        label="URL do Vídeo (opcional)"
        value={(content.video as string) || ""}
        onChange={(v) => onChange({ ...content, video: v })}
        placeholder="/video.mp4 ou deixe vazio para usar imagem"
      />
      {!hasVideo && (
        <ImageUploader
          label="Imagem de Fundo"
          value={(content.image as string) || ""}
          onChange={(v) => onChange({ ...content, image: v })}
        />
      )}
      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão - Texto"
          value={(content.button1Text as string) || ""}
          onChange={(v) => onChange({ ...content, button1Text: v })}
        />
        <InputField
          label="Botão - Link"
          value={(content.button1Link as string) || ""}
          onChange={(v) => onChange({ ...content, button1Link: v })}
        />
      </div>
    </div>
  );
}

// Featured Products Editor
function FeaturedProductsEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || "Produtos em Destaque"}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || "Coleção"}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <InputField
        label="Limite de Produtos"
        value={String((content.limit as number) || 10)}
        onChange={(v) => onChange({ ...content, limit: parseInt(v) || 10 })}
        type="number"
      />
      <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-700 p-2 rounded">
        Os produtos são carregados automaticamente do catálogo (produtos marcados como destaque).
      </div>
    </div>
  );
}

// Why Choose Us Editor
function WhyChooseUsEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const features = (content.features as Array<{ icon: string; title: string; description: string }>) || [];
  const stats = (content.stats as Array<{ value: string; label: string }>) || [];

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChange({ ...content, features: newFeatures });
  };

  const addFeature = () => {
    onChange({
      ...content,
      features: [...features, { icon: "sparkles", title: "Nova Feature", description: "Descrição" }],
    });
  };

  const removeFeature = (index: number) => {
    onChange({ ...content, features: features.filter((_, i) => i !== index) });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onChange({ ...content, stats: newStats });
  };

  return (
    <div className="space-y-4">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={2}
      />

      {/* Features */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-gray-600">Features</span>
        {features.map((feature, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Feature {index + 1}</span>
              <button onClick={() => removeFeature(index)} className="text-red-500">
                <HiOutlineTrash className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label="Ícone"
                value={feature.icon}
                onChange={(v) => updateFeature(index, "icon", v)}
                options={[
                  { value: "shield", label: "Escudo" },
                  { value: "cube", label: "Cubo" },
                  { value: "support", label: "Suporte" },
                  { value: "sparkles", label: "Estrelas" },
                ]}
              />
              <InputField
                label="Título"
                value={feature.title}
                onChange={(v) => updateFeature(index, "title", v)}
              />
            </div>
            <InputField
              label="Descrição"
              value={feature.description}
              onChange={(v) => updateFeature(index, "description", v)}
            />
          </div>
        ))}
        <button
          onClick={addFeature}
          className="w-full py-1.5 text-xs border border-dashed border-gray-300 rounded hover:border-gray-400"
        >
          + Adicionar Feature
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-gray-600">Estatísticas</span>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1">
              <input
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded"
                placeholder="10+"
              />
              <input
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded"
                placeholder="Anos"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Maletti Partnership Editor
function MalettiPartnershipEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const paragraphs = (content.paragraphs as string[]) || [];
  const features = (content.features as string[]) || [];

  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <ImageUploader
        label="Imagem"
        value={(content.image as string) || ""}
        onChange={(v) => onChange({ ...content, image: v })}
      />
      <InputField
        label="Ano de Fundação"
        value={(content.foundationYear as string) || "1965"}
        onChange={(v) => onChange({ ...content, foundationYear: v })}
      />

      {/* Parágrafos */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-gray-600">Parágrafos</span>
        {paragraphs.map((p, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={p}
              onChange={(e) => {
                const newParagraphs = [...paragraphs];
                newParagraphs[index] = e.target.value;
                onChange({ ...content, paragraphs: newParagraphs });
              }}
              rows={2}
              className="flex-1 px-2 py-1 text-xs border rounded"
            />
            <button
              onClick={() => onChange({ ...content, paragraphs: paragraphs.filter((_, i) => i !== index) })}
              className="text-red-500"
            >
              <HiOutlineTrash className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange({ ...content, paragraphs: [...paragraphs, "Novo parágrafo..."] })}
          className="w-full py-1 text-xs border border-dashed rounded hover:border-gray-400"
        >
          + Adicionar Parágrafo
        </button>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-gray-600">Features (lista)</span>
        {features.map((f, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={f}
              onChange={(e) => {
                const newFeatures = [...features];
                newFeatures[index] = e.target.value;
                onChange({ ...content, features: newFeatures });
              }}
              className="flex-1 px-2 py-1 text-xs border rounded"
            />
            <button
              onClick={() => onChange({ ...content, features: features.filter((_, i) => i !== index) })}
              className="text-red-500"
            >
              <HiOutlineTrash className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange({ ...content, features: [...features, "Nova feature"] })}
          className="w-full py-1 text-xs border border-dashed rounded hover:border-gray-400"
        >
          + Adicionar Feature
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão 1 - Texto"
          value={(content.button1Text as string) || ""}
          onChange={(v) => onChange({ ...content, button1Text: v })}
        />
        <InputField
          label="Botão 1 - Link"
          value={(content.button1Link as string) || ""}
          onChange={(v) => onChange({ ...content, button1Link: v })}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão 2 - Texto"
          value={(content.button2Text as string) || ""}
          onChange={(v) => onChange({ ...content, button2Text: v })}
        />
        <InputField
          label="Botão 2 - Link"
          value={(content.button2Link as string) || ""}
          onChange={(v) => onChange({ ...content, button2Link: v })}
        />
      </div>
    </div>
  );
}

// Maintenance Preview Editor
function MaintenancePreviewEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const services = (content.services as Array<{ icon: string; title: string; description: string }>) || [];

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    onChange({ ...content, services: newServices });
  };

  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={2}
      />

      {/* Services */}
      <div className="space-y-2">
        <span className="text-xs font-medium text-gray-600">Serviços</span>
        {services.map((service, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-2">
            <SelectField
              label="Ícone"
              value={service.icon}
              onChange={(v) => updateService(index, "icon", v)}
              options={[
                { value: "wrench", label: "Chave" },
                { value: "clock", label: "Relógio" },
                { value: "check", label: "Check" },
              ]}
            />
            <InputField
              label="Título"
              value={service.title}
              onChange={(v) => updateService(index, "title", v)}
            />
            <InputField
              label="Descrição"
              value={service.description}
              onChange={(v) => updateService(index, "description", v)}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão - Texto"
          value={(content.buttonText as string) || ""}
          onChange={(v) => onChange({ ...content, buttonText: v })}
        />
        <InputField
          label="Botão - Link"
          value={(content.buttonLink as string) || ""}
          onChange={(v) => onChange({ ...content, buttonLink: v })}
        />
      </div>
    </div>
  );
}

// Catalog CTA Editor
function CatalogCTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={2}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Telefone (formatado)"
          value={(content.phone as string) || ""}
          onChange={(v) => onChange({ ...content, phone: v })}
          placeholder="(11) 98198-2279"
        />
        <InputField
          label="Telefone (raw)"
          value={(content.phoneRaw as string) || ""}
          onChange={(v) => onChange({ ...content, phoneRaw: v })}
          placeholder="+5511981982279"
        />
      </div>
      <TextareaField
        label="Mensagem WhatsApp"
        value={(content.whatsappMessage as string) || ""}
        onChange={(v) => onChange({ ...content, whatsappMessage: v })}
        rows={2}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão Catálogo"
          value={(content.buttonText as string) || ""}
          onChange={(v) => onChange({ ...content, buttonText: v })}
        />
        <InputField
          label="Botão Consultor"
          value={(content.consultorButtonText as string) || ""}
          onChange={(v) => onChange({ ...content, consultorButtonText: v })}
        />
      </div>
    </div>
  );
}

// Text Editor
function TextEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <TextareaField
        label="Conteúdo"
        value={(content.content as string) || ""}
        onChange={(v) => onChange({ ...content, content: v })}
        rows={4}
      />
      <div className="grid grid-cols-2 gap-2">
        <SelectField
          label="Alinhamento"
          value={(content.align as string) || "left"}
          onChange={(v) => onChange({ ...content, align: v })}
          options={[
            { value: "left", label: "Esquerda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Direita" },
          ]}
        />
        <SelectField
          label="Fundo"
          value={(content.background as string) || "white"}
          onChange={(v) => onChange({ ...content, background: v })}
          options={[
            { value: "white", label: "Branco" },
            { value: "gray", label: "Cinza" },
            { value: "black", label: "Preto" },
          ]}
        />
      </div>
    </div>
  );
}

// Gallery Editor
function GalleryEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const images = (content.images as string[]) || [];
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        onChange({ ...content, images: [...images, data.url] });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <SelectField
        label="Colunas"
        value={String((content.columns as number) || 3)}
        onChange={(v) => onChange({ ...content, columns: parseInt(v) })}
        options={[
          { value: "2", label: "2 colunas" },
          { value: "3", label: "3 colunas" },
          { value: "4", label: "4 colunas" },
        ]}
      />
      <div>
        <span className="text-xs font-medium text-gray-600 mb-2 block">Imagens</span>
        <div className="grid grid-cols-4 gap-1">
          {images.map((img, index) => (
            <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded overflow-hidden group">
              <Image src={img} alt="" fill className="object-cover" />
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, images: images.filter((_, i) => i !== index) }); }}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded flex items-center justify-center cursor-pointer hover:border-gray-400" onClick={(e) => e.stopPropagation()}>
            {uploading ? "..." : <HiOutlinePlus className="w-4 h-4 text-gray-400" />}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} onClick={(e) => e.stopPropagation()} />
          </label>
        </div>
      </div>
    </div>
  );
}

// Video Editor
function VideoEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="URL do Vídeo"
        value={(content.url as string) || ""}
        onChange={(v) => onChange({ ...content, url: v })}
        placeholder="https://youtube.com/..."
      />
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={(content.autoplay as boolean) || false}
            onChange={(e) => onChange({ ...content, autoplay: e.target.checked })}
          />
          Autoplay
        </label>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={(content.controls as boolean) !== false}
            onChange={(e) => onChange({ ...content, controls: e.target.checked })}
          />
          Controles
        </label>
      </div>
    </div>
  );
}

// Features Editor
function FeaturesEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const items = (content.items as Array<{ icon: string; title: string; description: string }>) || [];

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...content, items: newItems });
  };

  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <div className="grid grid-cols-2 gap-2">
        <SelectField
          label="Colunas"
          value={String((content.columns as number) || 3)}
          onChange={(v) => onChange({ ...content, columns: parseInt(v) })}
          options={[
            { value: "2", label: "2 colunas" },
            { value: "3", label: "3 colunas" },
            { value: "4", label: "4 colunas" },
          ]}
        />
        <SelectField
          label="Fundo"
          value={(content.background as string) || "white"}
          onChange={(v) => onChange({ ...content, background: v })}
          options={[
            { value: "white", label: "Branco" },
            { value: "gray", label: "Cinza" },
            { value: "black", label: "Preto" },
          ]}
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Itens</label>
        {items.map((item, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1">
            <div className="flex gap-2">
              <input
                value={item.icon || ""}
                onChange={(e) => updateItem(index, "icon", e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                className="w-16 px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
                placeholder="Ícone"
              />
              <input
                value={item.title}
                onChange={(e) => updateItem(index, "title", e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onFocus={(e) => e.stopPropagation()}
                className="flex-1 px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
                placeholder="Título"
              />
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, items: items.filter((_, i) => i !== index) }); }}
                className="text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash className="w-3 h-3" />
              </button>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
              placeholder="Descrição"
              rows={2}
            />
          </div>
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); onChange({ ...content, items: [...items, { icon: "star", title: "", description: "" }] }); }}
          className="w-full py-1.5 text-xs border border-dashed rounded hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          + Adicionar Item
        </button>
      </div>
    </div>
  );
}

// CTA Editor
function CTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={2}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputField
          label="Botão - Texto"
          value={(content.buttonText as string) || ""}
          onChange={(v) => onChange({ ...content, buttonText: v })}
        />
        <InputField
          label="Botão - Link"
          value={(content.buttonLink as string) || ""}
          onChange={(v) => onChange({ ...content, buttonLink: v })}
        />
      </div>
      <SelectField
        label="Fundo"
        value={(content.background as string) || "black"}
        onChange={(v) => onChange({ ...content, background: v })}
        options={[
          { value: "white", label: "Branco" },
          { value: "gray", label: "Cinza" },
          { value: "black", label: "Preto" },
        ]}
      />
    </div>
  );
}

// Cards Editor
function CardsEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const cards = (content.cards as Array<{ image: string; title: string; description: string; link: string }>) || [];
  const [uploading, setUploading] = useState<number | null>(null);

  const updateCard = (index: number, field: string, value: string) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    onChange({ ...content, cards: newCards });
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(index);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        updateCard(index, "image", data.url);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="space-y-3">
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      <InputField
        label="Subtítulo"
        value={(content.subtitle as string) || ""}
        onChange={(v) => onChange({ ...content, subtitle: v })}
      />
      <SelectField
        label="Colunas"
        value={String((content.columns as number) || 3)}
        onChange={(v) => onChange({ ...content, columns: parseInt(v) })}
        options={[
          { value: "2", label: "2 colunas" },
          { value: "3", label: "3 colunas" },
          { value: "4", label: "4 colunas" },
        ]}
      />
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600">Cards</label>
        {cards.map((card, index) => (
          <div key={index} className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">Card {index + 1}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, cards: cards.filter((_, i) => i !== index) }); }}
                className="text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-2">
              {card.image && (
                <div className="relative w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <Image src={card.image} alt="" fill className="object-cover" />
                </div>
              )}
              <label className="flex-1 flex items-center justify-center gap-1 px-2 py-1 border border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400 text-xs">
                <HiOutlineUpload className="w-3 h-3" />
                <span>{uploading === index ? "..." : "Imagem"}</span>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} className="hidden" onClick={(e) => e.stopPropagation()} />
              </label>
            </div>
            <input
              value={card.title}
              onChange={(e) => updateCard(index, "title", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
              placeholder="Título"
            />
            <textarea
              value={card.description}
              onChange={(e) => updateCard(index, "description", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
              placeholder="Descrição"
              rows={2}
            />
            <input
              value={card.link}
              onChange={(e) => updateCard(index, "link", e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={(e) => e.stopPropagation()}
              className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-600 dark:border-gray-500"
              placeholder="Link"
            />
          </div>
        ))}
        <button
          onClick={(e) => { e.stopPropagation(); onChange({ ...content, cards: [...cards, { image: "", title: "", description: "", link: "" }] }); }}
          className="w-full py-1.5 text-xs border border-dashed rounded hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          + Adicionar Card
        </button>
      </div>
    </div>
  );
}

// Contact Hero Editor
function ContactHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Badge"
        value={(content.badge as string) || ""}
        onChange={(v) => onChange({ ...content, badge: v })}
        placeholder="Ex: Contato"
      />
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
        placeholder="Fale Conosco"
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={3}
      />
    </div>
  );
}

// Contact Options Editor
function ContactOptionsEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const options = (content.options as Array<{
    icon?: string;
    title?: string;
    description?: string;
    action?: string;
  }>) || [];

  const updateOption = (index: number, field: string, value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    onChange({ ...content, options: newOptions });
  };

  const addOption = () => {
    onChange({
      ...content,
      options: [...options, { icon: "download", title: "Nova Opção", description: "", action: "contact" }],
    });
  };

  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Opção {index + 1}</span>
            {options.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, options: options.filter((_, i) => i !== index) }); }}
                className="text-red-500 text-xs"
              >
                Remover
              </button>
            )}
          </div>
          <SelectField
            label="Ícone"
            value={option.icon || "download"}
            onChange={(v) => updateOption(index, "icon", v)}
            options={[
              { value: "download", label: "Download" },
              { value: "chat", label: "Chat" },
              { value: "calendar", label: "Calendário" },
              { value: "phone", label: "Telefone" },
              { value: "mail", label: "Email" },
            ]}
          />
          <InputField
            label="Título"
            value={option.title || ""}
            onChange={(v) => updateOption(index, "title", v)}
          />
          <InputField
            label="Descrição"
            value={option.description || ""}
            onChange={(v) => updateOption(index, "description", v)}
          />
          <SelectField
            label="Ação"
            value={option.action || "contact"}
            onChange={(v) => updateOption(index, "action", v)}
            options={[
              { value: "catalog", label: "Abrir Formulário Catálogo" },
              { value: "contact", label: "Abrir Formulário Contato" },
            ]}
          />
        </div>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); addOption(); }}
        className="w-full py-2 text-xs border border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
      >
        + Adicionar Opção
      </button>
    </div>
  );
}

// Contact Info Editor
function ContactInfoEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Título da Seção"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
        placeholder="Informações de Contato"
      />
      <InputField
        label="Telefone"
        value={(content.phone as string) || ""}
        onChange={(v) => onChange({ ...content, phone: v })}
        placeholder="(11) 98198-2279"
      />
      <InputField
        label="Telefone (formato link)"
        value={(content.phoneRaw as string) || ""}
        onChange={(v) => onChange({ ...content, phoneRaw: v })}
        placeholder="+5511981982279"
      />
      <InputField
        label="E-mail"
        value={(content.email as string) || ""}
        onChange={(v) => onChange({ ...content, email: v })}
        placeholder="contato@exemplo.com"
      />
      <InputField
        label="Endereço Linha 1"
        value={(content.address1 as string) || ""}
        onChange={(v) => onChange({ ...content, address1: v })}
        placeholder="São Paulo, SP"
      />
      <InputField
        label="Endereço Linha 2"
        value={(content.address2 as string) || ""}
        onChange={(v) => onChange({ ...content, address2: v })}
        placeholder="Brasil"
      />
      <TextareaField
        label="Horário de Atendimento"
        value={(content.hours as string) || ""}
        onChange={(v) => onChange({ ...content, hours: v })}
        placeholder="Segunda a Sexta: 9h às 18h"
        rows={2}
      />
      <InputField
        label="Texto Botão WhatsApp"
        value={(content.whatsappButtonText as string) || ""}
        onChange={(v) => onChange({ ...content, whatsappButtonText: v })}
        placeholder="Chamar no WhatsApp"
      />
      <TextareaField
        label="Mensagem WhatsApp"
        value={(content.whatsappMessage as string) || ""}
        onChange={(v) => onChange({ ...content, whatsappMessage: v })}
        rows={2}
      />
    </div>
  );
}

// Maintenance Hero Editor
function MaintenanceHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField
        label="Badge"
        value={(content.badge as string) || ""}
        onChange={(v) => onChange({ ...content, badge: v })}
        placeholder="Ex: Suporte Técnico"
      />
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
        placeholder="Manutenção"
      />
      <TextareaField
        label="Descrição"
        value={(content.description as string) || ""}
        onChange={(v) => onChange({ ...content, description: v })}
        rows={3}
      />
      <ImageUploader
        label="Imagem"
        value={(content.image as string) || ""}
        onChange={(v) => onChange({ ...content, image: v })}
      />
      <InputField
        label="Texto do Botão"
        value={(content.buttonText as string) || ""}
        onChange={(v) => onChange({ ...content, buttonText: v })}
        placeholder="Solicitar Manutenção"
      />
      <InputField
        label="Link WhatsApp"
        value={(content.whatsappLink as string) || ""}
        onChange={(v) => onChange({ ...content, whatsappLink: v })}
        placeholder="https://wa.me/..."
      />
    </div>
  );
}

// Maintenance Services Editor
function MaintenanceServicesEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const services = (content.services as Array<{
    icon?: string;
    title?: string;
    description?: string;
    features?: string[];
  }>) || [];

  const updateService = (index: number, field: string, value: unknown) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    onChange({ ...content, services: newServices });
  };

  return (
    <div className="space-y-3">
      <InputField
        label="Badge"
        value={(content.badge as string) || ""}
        onChange={(v) => onChange({ ...content, badge: v })}
      />
      <InputField
        label="Título"
        value={(content.title as string) || ""}
        onChange={(v) => onChange({ ...content, title: v })}
      />
      {services.map((service, index) => (
        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Serviço {index + 1}</span>
            {services.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); onChange({ ...content, services: services.filter((_, i) => i !== index) }); }}
                className="text-red-500 text-xs"
              >
                Remover
              </button>
            )}
          </div>
          <SelectField
            label="Ícone"
            value={service.icon || "wrench"}
            onChange={(v) => updateService(index, "icon", v)}
            options={[
              { value: "wrench", label: "Chave" },
              { value: "clock", label: "Relógio" },
              { value: "check", label: "Check" },
              { value: "shield", label: "Escudo" },
              { value: "truck", label: "Caminhão" },
            ]}
          />
          <InputField label="Título" value={service.title || ""} onChange={(v) => updateService(index, "title", v)} />
          <TextareaField label="Descrição" value={service.description || ""} onChange={(v) => updateService(index, "description", v)} rows={2} />
          <TextareaField
            label="Features (uma por linha)"
            value={(service.features || []).join("\n")}
            onChange={(v) => updateService(index, "features", v.split("\n").filter(Boolean))}
            rows={3}
          />
        </div>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); onChange({ ...content, services: [...services, { icon: "wrench", title: "", description: "", features: [] }] }); }}
        className="w-full py-2 text-xs border border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
      >
        + Adicionar Serviço
      </button>
    </div>
  );
}

// Maintenance Benefits Editor
function MaintenanceBenefitsEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const benefits = (content.benefits as Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>) || [];

  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    onChange({ ...content, benefits: newBenefits });
  };

  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={2} />
      {benefits.map((benefit, index) => (
        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Benefício {index + 1}</span>
            {benefits.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); onChange({ ...content, benefits: benefits.filter((_, i) => i !== index) }); }} className="text-red-500 text-xs">Remover</button>
            )}
          </div>
          <SelectField
            label="Ícone"
            value={benefit.icon || "shield"}
            onChange={(v) => updateBenefit(index, "icon", v)}
            options={[
              { value: "shield", label: "Escudo" },
              { value: "truck", label: "Caminhão" },
              { value: "clock", label: "Relógio" },
              { value: "check", label: "Check" },
            ]}
          />
          <InputField label="Título" value={benefit.title || ""} onChange={(v) => updateBenefit(index, "title", v)} />
          <InputField label="Descrição" value={benefit.description || ""} onChange={(v) => updateBenefit(index, "description", v)} />
        </div>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); onChange({ ...content, benefits: [...benefits, { icon: "shield", title: "", description: "" }] }); }}
        className="w-full py-2 text-xs border border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
      >
        + Adicionar Benefício
      </button>
    </div>
  );
}

// Maintenance CTA Editor
function MaintenanceCTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={2} />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link WhatsApp" value={(content.whatsappLink as string) || ""} onChange={(v) => onChange({ ...content, whatsappLink: v })} />
    </div>
  );
}

// Maintenance FAQ Editor
function MaintenanceFAQEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const faqs = (content.faqs as Array<{ question?: string; answer?: string }>) || [];

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    onChange({ ...content, faqs: newFaqs });
  };

  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      {faqs.map((faq, index) => (
        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500">Pergunta {index + 1}</span>
            {faqs.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); onChange({ ...content, faqs: faqs.filter((_, i) => i !== index) }); }} className="text-red-500 text-xs">Remover</button>
            )}
          </div>
          <InputField label="Pergunta" value={faq.question || ""} onChange={(v) => updateFaq(index, "question", v)} />
          <TextareaField label="Resposta" value={faq.answer || ""} onChange={(v) => updateFaq(index, "answer", v)} rows={3} />
        </div>
      ))}
      <button
        onClick={(e) => { e.stopPropagation(); onChange({ ...content, faqs: [...faqs, { question: "", answer: "" }] }); }}
        className="w-full py-2 text-xs border border-dashed border-gray-300 rounded-lg hover:bg-gray-50"
      >
        + Adicionar Pergunta
      </button>
    </div>
  );
}

// Products Hero Editor
function ProductsHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Catálogo" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} placeholder="Nossos Produtos" />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
    </div>
  );
}

// Products Grid Editor - escolhe modo de exibição e filtra categorias/produtos
function ProductsGridEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const [categories, setCategories] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [products, setProducts] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [loadingData, setLoadingData] = useState(true);

  const mode = (content.mode as string) || "all";
  const selectedCategories = (content.selectedCategories as string[]) || [];
  const selectedProducts = (content.selectedProducts as string[]) || [];

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then(r => r.json()),
      fetch("/api/products").then(r => r.json()),
    ]).then(([catData, prodData]) => {
      setCategories(catData.categories || []);
      setProducts(prodData.products || []);
    }).finally(() => setLoadingData(false));
  }, []);

  const toggleCategory = (slug: string) => {
    const newSelected = selectedCategories.includes(slug)
      ? selectedCategories.filter(s => s !== slug)
      : [...selectedCategories, slug];
    onChange({ ...content, selectedCategories: newSelected });
  };

  const toggleProduct = (id: string) => {
    const newSelected = selectedProducts.includes(id)
      ? selectedProducts.filter(s => s !== id)
      : [...selectedProducts, id];
    onChange({ ...content, selectedProducts: newSelected });
  };

  return (
    <div className="space-y-4">
      <div onClick={(e) => e.stopPropagation()}>
        <SelectField
          label="Modo de Exibição"
          value={mode}
          onChange={(v) => onChange({ ...content, mode: v })}
          options={[
            { value: "all", label: "Todos os Produtos" },
            { value: "categories", label: "Por Categorias" },
            { value: "selected", label: "Produtos Específicos" },
          ]}
        />
      </div>

      {mode === "categories" && (
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Categorias</label>
          {loadingData ? (
            <div className="text-xs text-gray-400">Carregando...</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={(e) => { e.stopPropagation(); toggleCategory(cat.slug); }}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedCategories.includes(cat.slug)
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === "selected" && (
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Produtos ({selectedProducts.length} selecionados)</label>
          {loadingData ? (
            <div className="text-xs text-gray-400">Carregando...</div>
          ) : (
            <div className="max-h-48 overflow-y-auto space-y-1 border border-gray-200 rounded-lg p-2">
              {products.map(prod => (
                <label key={prod.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(prod.id)}
                    onChange={() => toggleProduct(prod.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">{prod.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <InputField
          label="Limite de Produtos"
          value={String((content.limit as number) || "")}
          onChange={(v) => onChange({ ...content, limit: v ? parseInt(v) : null })}
          placeholder="Deixe vazio para todos"
          type="number"
        />
      </div>
    </div>
  );
}

// Products CTA Editor
function ProductsCTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={2} />
      <InputField label="Texto Botão Principal" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link WhatsApp" value={(content.whatsappLink as string) || ""} onChange={(v) => onChange({ ...content, whatsappLink: v })} />
      <InputField label="Texto Botão Secundário" value={(content.secondaryButtonText as string) || ""} onChange={(v) => onChange({ ...content, secondaryButtonText: v })} />
      <InputField label="Link Secundário" value={(content.secondaryLink as string) || ""} onChange={(v) => onChange({ ...content, secondaryLink: v })} />
    </div>
  );
}

// Brands Hero Editor
function BrandsHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Nossas Marcas" />
      <TextareaField label="Título (use | para quebra de linha)" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} rows={2} placeholder="Excelência|em cada|detalhe" />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} placeholder="Ver Produtos" />
      <InputField label="Link do Botão" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} placeholder="/produtos" />
    </div>
  );
}

// Brands Section Editor
function BrandsSectionEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Portfólio" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} placeholder="Marcas que representamos" />
    </div>
  );
}

// Brands Partnership Editor
function BrandsPartnershipEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Nossas Parcerias" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} placeholder="Marcas que confiam na SHR" />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
    </div>
  );
}

// Brands CTA Editor
function BrandsCTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={2} />
      <InputField label="Texto Botão Principal" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link Principal" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} />
      <InputField label="Texto Botão Secundário" value={(content.secondaryButtonText as string) || ""} onChange={(v) => onChange({ ...content, secondaryButtonText: v })} />
      <InputField label="Link Secundário" value={(content.secondaryLink as string) || ""} onChange={(v) => onChange({ ...content, secondaryLink: v })} />
    </div>
  );
}

// About Hero Editor
function AboutHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Sobre Nós" />
      <TextareaField label="Título (use | para quebra)" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} rows={2} placeholder="A arte de|transformar|salões" />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="Texto Botão Principal" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link Principal" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} />
      <InputField label="Texto Botão Secundário" value={(content.secondaryButtonText as string) || ""} onChange={(v) => onChange({ ...content, secondaryButtonText: v })} />
      <InputField label="Link Secundário" value={(content.secondaryLink as string) || ""} onChange={(v) => onChange({ ...content, secondaryLink: v })} />
      <InputField label="Stat 1 Valor" value={(content.stat1Value as string) || ""} onChange={(v) => onChange({ ...content, stat1Value: v })} placeholder="10+" />
      <InputField label="Stat 1 Label" value={(content.stat1Label as string) || ""} onChange={(v) => onChange({ ...content, stat1Label: v })} placeholder="Anos de mercado" />
      <InputField label="Stat 2 Valor" value={(content.stat2Value as string) || ""} onChange={(v) => onChange({ ...content, stat2Value: v })} placeholder="500+" />
      <InputField label="Stat 2 Label" value={(content.stat2Label as string) || ""} onChange={(v) => onChange({ ...content, stat2Label: v })} placeholder="Clientes" />
    </div>
  );
}

// About Mission Editor
function AboutMissionEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Nossa Missão" />
      <TextareaField label="Citação" value={(content.quote as string) || ""} onChange={(v) => onChange({ ...content, quote: v })} rows={4} />
      <InputField label="Autor" value={(content.author as string) || ""} onChange={(v) => onChange({ ...content, author: v })} placeholder="— Equipe SHR" />
    </div>
  );
}

// About Values Editor
function AboutValuesEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const values = (content.values as Array<{ title: string; description: string }>) || [];
  
  const updateValue = (index: number, field: string, value: string) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field]: value };
    onChange({ ...content, values: newValues });
  };

  const addValue = () => {
    onChange({ ...content, values: [...values, { title: "", description: "" }] });
  };

  const removeValue = (index: number) => {
    onChange({ ...content, values: values.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Nossos Valores" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} placeholder="O que nos guia" />
      <div className="space-y-3">
        <label className="block text-xs font-medium text-gray-600">Valores</label>
        {values.map((val, i) => (
          <div key={i} className="p-3 border border-gray-200 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Valor {i + 1}</span>
              <button onClick={(e) => { e.stopPropagation(); removeValue(i); }} className="text-red-500 text-xs">Remover</button>
            </div>
            <input className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="Título" value={val.title} onChange={(e) => updateValue(i, "title", e.target.value)} onClick={(e) => e.stopPropagation()} />
            <textarea className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" placeholder="Descrição" rows={2} value={val.description} onChange={(e) => updateValue(i, "description", e.target.value)} onClick={(e) => e.stopPropagation()} />
          </div>
        ))}
        <button onClick={(e) => { e.stopPropagation(); addValue(); }} className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-gray-400">+ Adicionar Valor</button>
      </div>
    </div>
  );
}

// About Partnership Editor
function AboutPartnershipEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Parceria Exclusiva" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição 1" value={(content.description1 as string) || ""} onChange={(v) => onChange({ ...content, description1: v })} rows={3} />
      <TextareaField label="Descrição 2" value={(content.description2 as string) || ""} onChange={(v) => onChange({ ...content, description2: v })} rows={3} />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link do Botão" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} />
      <InputField label="Badge Anos" value={(content.yearsBadge as string) || ""} onChange={(v) => onChange({ ...content, yearsBadge: v })} placeholder="55+" />
      <InputField label="Badge Anos Label" value={(content.yearsBadgeLabel as string) || ""} onChange={(v) => onChange({ ...content, yearsBadgeLabel: v })} placeholder="Anos de história" />
    </div>
  );
}

// About CTA Editor
function AboutCTAEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={2} />
      <InputField label="Texto Botão Principal" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link Principal" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} />
      <InputField label="Texto Botão Secundário" value={(content.secondaryButtonText as string) || ""} onChange={(v) => onChange({ ...content, secondaryButtonText: v })} />
      <InputField label="Link Secundário (WhatsApp)" value={(content.secondaryLink as string) || ""} onChange={(v) => onChange({ ...content, secondaryLink: v })} />
    </div>
  );
}

// Maletti Hero Editor
function MalettiHeroEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Título Principal" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} placeholder="Transforme Espaços." />
      <InputField label="Título Destaque" value={(content.titleHighlight as string) || ""} onChange={(v) => onChange({ ...content, titleHighlight: v })} placeholder="Eleve Experiências." />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="URL do Vídeo" value={(content.videoUrl as string) || ""} onChange={(v) => onChange({ ...content, videoUrl: v })} placeholder="/Video Home.mp4" />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
    </div>
  );
}

// Maletti Essência Editor
function MalettiEssenciaEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const stats = (content.stats as Array<{ number: string; label: string }>) || [];
  const updateStat = (i: number, field: string, value: string) => {
    const newStats = [...stats]; newStats[i] = { ...newStats[i], [field]: value }; onChange({ ...content, stats: newStats });
  };
  return (
    <div className="space-y-4">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Nossa História" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={4} />
      <InputField label="Imagem Showroom" value={(content.showroomImage as string) || ""} onChange={(v) => onChange({ ...content, showroomImage: v })} placeholder="/images/site/Shirobody_showroom.jpg" />
      <label className="block text-xs font-medium text-gray-600">Estatísticas</label>
      {stats.map((stat, i) => (
        <div key={i} className="flex gap-2">
          <input className="w-1/3 px-2 py-1 text-sm border rounded" placeholder="60+" value={stat.number} onChange={(e) => updateStat(i, "number", e.target.value)} onClick={(e) => e.stopPropagation()} />
          <input className="flex-1 px-2 py-1 text-sm border rounded" placeholder="Anos de história" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} onClick={(e) => e.stopPropagation()} />
        </div>
      ))}
    </div>
  );
}

// Maletti Brasil Editor
function MalettiBrasilEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const images = (content.carouselImages as Array<{ src: string; alt: string }>) || [];
  const updateImage = (i: number, field: string, value: string) => {
    const newImages = [...images]; newImages[i] = { ...newImages[i], [field]: value }; onChange({ ...content, carouselImages: newImages });
  };
  const addImage = () => onChange({ ...content, carouselImages: [...images, { src: "", alt: "" }] });
  const removeImage = (i: number) => onChange({ ...content, carouselImages: images.filter((_, idx) => idx !== i) });
  return (
    <div className="space-y-4">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Distribuidor Exclusivo" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <TextareaField label="Descrição Secundária" value={(content.description2 as string) || ""} onChange={(v) => onChange({ ...content, description2: v })} rows={2} />
      <InputField label="Texto Botão Principal" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link WhatsApp" value={(content.whatsappLink as string) || ""} onChange={(v) => onChange({ ...content, whatsappLink: v })} />
      <InputField label="Texto Botão Secundário" value={(content.secondaryButtonText as string) || ""} onChange={(v) => onChange({ ...content, secondaryButtonText: v })} />
      <InputField label="Link Secundário" value={(content.secondaryLink as string) || ""} onChange={(v) => onChange({ ...content, secondaryLink: v })} />
      <label className="block text-xs font-medium text-gray-600">Imagens do Carousel</label>
      {images.map((img, i) => (
        <div key={i} className="p-2 border rounded space-y-1">
          <div className="flex justify-between"><span className="text-xs">Imagem {i+1}</span><button onClick={(e) => { e.stopPropagation(); removeImage(i); }} className="text-red-500 text-xs">Remover</button></div>
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="/images/site/..." value={img.src} onChange={(e) => updateImage(i, "src", e.target.value)} onClick={(e) => e.stopPropagation()} />
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="Alt text" value={img.alt} onChange={(e) => updateImage(i, "alt", e.target.value)} onClick={(e) => e.stopPropagation()} />
        </div>
      ))}
      <button onClick={(e) => { e.stopPropagation(); addImage(); }} className="w-full py-2 border border-dashed rounded text-sm text-gray-500">+ Adicionar Imagem</button>
    </div>
  );
}

// Maletti Head SPA Editor
function MalettiHeadSpaEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const images = (content.images as string[]) || [];
  const benefits = (content.benefits as Array<{ title: string; description: string }>) || [];
  const updateBenefit = (i: number, field: string, value: string) => {
    const newBenefits = [...benefits]; newBenefits[i] = { ...newBenefits[i], [field]: value }; onChange({ ...content, benefits: newBenefits });
  };
  return (
    <div className="space-y-4">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Tendência Mundial" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
      <InputField label="Link do Botão" value={(content.buttonLink as string) || ""} onChange={(v) => onChange({ ...content, buttonLink: v })} />
      <label className="block text-xs font-medium text-gray-600">Imagens (6 URLs, uma por linha)</label>
      <textarea className="w-full px-3 py-2 text-sm border rounded" rows={6} value={images.join("\n")} onChange={(e) => onChange({ ...content, images: e.target.value.split("\n").filter(Boolean) })} onClick={(e) => e.stopPropagation()} />
      <label className="block text-xs font-medium text-gray-600">Benefícios</label>
      {benefits.map((b, i) => (
        <div key={i} className="p-2 border rounded space-y-1">
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="Título" value={b.title} onChange={(e) => updateBenefit(i, "title", e.target.value)} onClick={(e) => e.stopPropagation()} />
          <textarea className="w-full px-2 py-1 text-sm border rounded" placeholder="Descrição" rows={2} value={b.description} onChange={(e) => updateBenefit(i, "description", e.target.value)} onClick={(e) => e.stopPropagation()} />
        </div>
      ))}
    </div>
  );
}

// Maletti Design Editor
function MalettiDesignEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  const products = (content.products as Array<{ name: string; image: string; description: string }>) || [];
  const updateProduct = (i: number, field: string, value: string) => {
    const newProducts = [...products]; newProducts[i] = { ...newProducts[i], [field]: value }; onChange({ ...content, products: newProducts });
  };
  const addProduct = () => onChange({ ...content, products: [...products, { name: "", image: "", description: "" }] });
  const removeProduct = (i: number) => onChange({ ...content, products: products.filter((_, idx) => idx !== i) });
  return (
    <div className="space-y-4">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Excelência em Mobiliário" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="Imagem do Vídeo" value={(content.videoThumbnail as string) || ""} onChange={(v) => onChange({ ...content, videoThumbnail: v })} placeholder="/images/site/DK3E3179-MOD.jpg" />
      <InputField label="URL do Vídeo YouTube" value={(content.videoUrl as string) || ""} onChange={(v) => onChange({ ...content, videoUrl: v })} placeholder="https://youtube.com/..." />
      <label className="block text-xs font-medium text-gray-600">Produtos</label>
      {products.map((p, i) => (
        <div key={i} className="p-2 border rounded space-y-1">
          <div className="flex justify-between"><span className="text-xs">Produto {i+1}</span><button onClick={(e) => { e.stopPropagation(); removeProduct(i); }} className="text-red-500 text-xs">Remover</button></div>
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="Nome" value={p.name} onChange={(e) => updateProduct(i, "name", e.target.value)} onClick={(e) => e.stopPropagation()} />
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="/images/site/..." value={p.image} onChange={(e) => updateProduct(i, "image", e.target.value)} onClick={(e) => e.stopPropagation()} />
          <input className="w-full px-2 py-1 text-sm border rounded" placeholder="Descrição" value={p.description} onChange={(e) => updateProduct(i, "description", e.target.value)} onClick={(e) => e.stopPropagation()} />
        </div>
      ))}
      <button onClick={(e) => { e.stopPropagation(); addProduct(); }} className="w-full py-2 border border-dashed rounded text-sm text-gray-500">+ Adicionar Produto</button>
    </div>
  );
}

// Maletti Catálogo Editor
function MalettiCatalogoEditor({ content, onChange }: { content: Record<string, unknown>; onChange: (c: Record<string, unknown>) => void }) {
  return (
    <div className="space-y-3">
      <InputField label="Badge" value={(content.badge as string) || ""} onChange={(v) => onChange({ ...content, badge: v })} placeholder="Material Exclusivo" />
      <InputField label="Título" value={(content.title as string) || ""} onChange={(v) => onChange({ ...content, title: v })} />
      <TextareaField label="Descrição" value={(content.description as string) || ""} onChange={(v) => onChange({ ...content, description: v })} rows={3} />
      <InputField label="Imagem do Catálogo" value={(content.catalogImage as string) || ""} onChange={(v) => onChange({ ...content, catalogImage: v })} placeholder="/images/site/PLANIMETRIA..." />
      <InputField label="Título do Formulário" value={(content.formTitle as string) || ""} onChange={(v) => onChange({ ...content, formTitle: v })} placeholder="Solicite seu Catálogo" />
      <InputField label="Descrição do Formulário" value={(content.formDescription as string) || ""} onChange={(v) => onChange({ ...content, formDescription: v })} />
      <InputField label="Texto do Botão" value={(content.buttonText as string) || ""} onChange={(v) => onChange({ ...content, buttonText: v })} />
    </div>
  );
}

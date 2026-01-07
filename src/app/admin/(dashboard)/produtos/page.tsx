"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlineSearch } from "react-icons/hi";
import { Modal, ConfirmModal } from "@/components/admin/Modal";
import { ImageUpload, GalleryUpload } from "@/components/admin/ImageUpload";

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  features: string[];
  image: string | null;
  gallery: string[];
  featured: boolean;
  active: boolean;
  category: { id: string; name: string } | null;
  brands: { brand: { id: string; name: string } }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Brand {
  id: string;
  name: string;
}

const emptyProduct = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  features: [] as string[],
  specifications: [] as { label: string; value: string }[],
  image: "",
  gallery: [] as string[],
  video: "",
  featured: false,
  active: true,
  categoryId: "",
  brandIds: [] as string[],
};

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [specLabel, setSpecLabel] = useState("");
  const [specValue, setSpecValue] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [page, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?page=${page}&search=${search}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/admin/brands?all=true");
      const data = await res.json();
      setBrands(data.brands || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openCreate = () => {
    setSelectedProduct(null);
    setFormData(emptyProduct);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      features: product.features || [],
      specifications: (product as any).specifications?.map((s: any) => ({ label: s.label, value: s.value })) || [],
      image: product.image || "",
      gallery: product.gallery || [],
      video: "",
      featured: product.featured,
      active: product.active,
      categoryId: product.category?.id || "",
      brandIds: product.brands?.map((b) => b.brand.id) || [],
    });
    setModalOpen(true);
  };

  const openView = (product: Product) => {
    setSelectedProduct(product);
    setViewModalOpen(true);
  };

  const openDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = selectedProduct
        ? `/api/admin/products/${selectedProduct.id}`
        : "/api/admin/products";
      const method = selectedProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${selectedProduct.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        fetchProducts();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const addSpec = () => {
    if (specLabel.trim() && specValue.trim()) {
      setFormData({ 
        ...formData, 
        specifications: [...formData.specifications, { label: specLabel.trim(), value: specValue.trim() }] 
      });
      setSpecLabel("");
      setSpecValue("");
    }
  };

  const removeSpec = (index: number) => {
    setFormData({ ...formData, specifications: formData.specifications.filter((_, i) => i !== index) });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-black dark:text-white">Produtos</h1>
          <p className="text-gray-400 mt-1 text-sm">Gerencie os produtos do catálogo</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <HiOutlinePlus className="h-4 w-4" />
          Novo Produto
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:border-black dark:focus:border-white outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-zinc-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-800">
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Produto</th>
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Categoria</th>
              <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Status</th>
              <th className="px-6 py-4 text-right text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Carregando...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400">Nenhum produto encontrado</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
                        {product.image && (
                          <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover h-full w-full" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-black dark:text-white">{product.name}</p>
                        <p className="text-sm text-gray-400">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {product.category?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] uppercase tracking-wider font-medium ${
                      product.active
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                    }`}>
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openView(product)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button onClick={() => openEdit(product)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                        <HiOutlinePencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => openDelete(product)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 text-sm ${
                p === page
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "border border-gray-200 dark:border-zinc-700 hover:border-black dark:hover:border-white"
              } transition-colors`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProduct ? "Editar Produto" : "Novo Produto"}
        size="xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição Curta</label>
            <textarea
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição Completa</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marcas</label>
            <div className="flex flex-wrap gap-3 p-4 border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
              {brands.length === 0 ? (
                <p className="text-sm text-gray-400">Nenhuma marca cadastrada</p>
              ) : (
                brands.map((brand) => (
                  <label
                    key={brand.id}
                    className={`flex items-center gap-2 px-4 py-2 border cursor-pointer transition-all ${
                      formData.brandIds.includes(brand.id)
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-gray-200 dark:border-zinc-600 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.brandIds.includes(brand.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, brandIds: [...formData.brandIds, brand.id] });
                        } else {
                          setFormData({ ...formData, brandIds: formData.brandIds.filter((id) => id !== brand.id) });
                        }
                      }}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{brand.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Características</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                placeholder="Digite uma característica..."
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none text-sm"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)} className="ml-1 text-gray-400 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Informações Técnicas</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specLabel}
                onChange={(e) => setSpecLabel(e.target.value)}
                placeholder="Ex: Dimensões"
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none text-sm"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())}
                placeholder="Ex: 60x80x120cm"
                className="flex-1 px-4 py-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white focus:border-black dark:focus:border-white outline-none text-sm"
              />
              <button
                type="button"
                onClick={addSpec}
                className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm hover:bg-gray-800 dark:hover:bg-gray-100"
              >
                Adicionar
              </button>
            </div>
            <div className="space-y-2">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-zinc-800 text-sm">
                  <span><strong>{spec.label}:</strong> {spec.value}</span>
                  <button type="button" onClick={() => removeSpec(index)} className="text-gray-400 hover:text-red-500">×</button>
                </div>
              ))}
            </div>
          </div>

          <ImageUpload
            label="Imagem Principal"
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            folder="products"
          />

          <GalleryUpload
            label="Galeria de Imagens"
            value={formData.gallery}
            onChange={(urls) => setFormData({ ...formData, gallery: urls })}
            folder="products"
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="accent-black"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Ativo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="accent-black"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Destaque</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2.5 border border-gray-200 dark:border-zinc-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !formData.name}
              className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={selectedProduct?.name || "Produto"}
        size="lg"
      >
        {selectedProduct && (
          <div className="space-y-6">
            {selectedProduct.image && (
              <div className="relative h-64 w-full bg-gray-100 dark:bg-zinc-800">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Descrição</h3>
              <p className="text-black dark:text-white">{selectedProduct.shortDescription || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Categoria</h3>
              <p className="text-black dark:text-white">{selectedProduct.category?.name || "-"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Características</h3>
              <ul className="list-disc list-inside text-black dark:text-white">
                {selectedProduct.features?.map((f, i) => <li key={i}>{f}</li>) || "-"}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Excluir Produto"
        message={`Tem certeza que deseja excluir "${selectedProduct?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        loading={saving}
      />
    </div>
  );
}

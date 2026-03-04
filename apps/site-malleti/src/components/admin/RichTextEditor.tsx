"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { FontFamily } from "@tiptap/extension-font-family";
import { useRef, useState, useCallback } from "react";
import { upload } from "@vercel/blob/client";
import {
  HiOutlineLink,
  HiOutlinePhotograph,
  HiOutlineCode,
  HiOutlineMenuAlt2,
  HiOutlineViewList,
  HiOutlineColorSwatch,
} from "react-icons/hi";
import { 
  RiBold,
  RiItalic,
  RiUnderline, 
  RiStrikethrough, 
  RiH1, 
  RiH2, 
  RiH3,
  RiDoubleQuotesL,
  RiSeparator,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
} from "react-icons/ri";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Escreva seu conteúdo aqui..." }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontOptions = [
    { label: "Padrão", value: "inherit" },
    { label: "Instrument Serif", value: "'Instrument Serif', serif" },
    { label: "Montserrat", value: "'Montserrat', sans-serif" },
    { label: "Playfair Display", value: "'Playfair Display', serif" },
    { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
    { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  ];

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      FontFamily.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL do link:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setUploading(true);
    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop();
      const filename = `blog-content/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

      const blob = await upload(filename, file, {
        access: "public",
        handleUploadUrl: "/api/upload/client",
      });

      editor.chain().focus().setImage({ src: blob.url }).run();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload. Tente novamente.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (!editor) return null;

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false,
    children,
    title,
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded transition-colors ${
        isActive 
          ? "bg-black dark:bg-white text-white dark:text-black" 
          : "hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-400"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-gray-200 dark:bg-zinc-700 mx-1" />
  );

  const ToolbarSelect = ({
    value,
    onChange,
    options,
    title,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    title: string;
  }) => (
    <select
      title={title}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs px-2 py-1 border border-gray-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-xs">
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Negrito (Ctrl+B)"
        >
          <RiBold className="w-4 h-4" />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Itálico (Ctrl+I)"
        >
          <RiItalic className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Sublinhado (Ctrl+U)"
        >
          <RiUnderline className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          title="Riscado"
        >
          <RiStrikethrough className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          title="Título 1"
        >
          <RiH1 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          title="Título 2"
        >
          <RiH2 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          title="Título 3"
        >
          <RiH3 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarSelect
          title="Fonte"
          value={editor.getAttributes("textStyle").fontFamily || "inherit"}
          onChange={(font) => {
            if (font === "inherit") {
              editor.chain().focus().unsetFontFamily().run();
            } else {
              editor.chain().focus().setFontFamily(font).run();
            }
          }}
          options={fontOptions}
        />

        <div className="flex items-center gap-1 pl-2">
          <label className="text-[10px] uppercase text-gray-500">Cor</label>
          <input
            type="color"
            title="Cor do texto"
            aria-label="Cor do texto"
            value={editor.getAttributes("textStyle").color || "#111111"}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            className="w-8 h-8 border border-gray-200 rounded"
          />
          <button
            type="button"
            title="Limpar cor"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="p-1 rounded border border-transparent hover:border-gray-300"
          >
            <HiOutlineColorSwatch className="w-4 h-4" />
          </button>
        </div>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Lista com marcadores"
        >
          <HiOutlineMenuAlt2 className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Lista numerada"
        >
          <HiOutlineViewList className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          title="Alinhar à esquerda"
        >
          <RiAlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          title="Centralizar"
        >
          <RiAlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          title="Alinhar à direita"
        >
          <RiAlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          title="Justificar"
        >
          <RiAlignJustify className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Block elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Citação"
        >
          <RiDoubleQuotesL className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
          title="Bloco de código"
        >
          <HiOutlineCode className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Linha horizontal"
        >
          <RiSeparator className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link and Image */}
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          title="Inserir link"
        >
          <HiOutlineLink className="w-4 h-4" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          title="Inserir imagem"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <HiOutlinePhotograph className="w-4 h-4" />
          )}
        </ToolbarButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} className="bg-white dark:bg-zinc-900" />

      {/* Character count */}
      <div className="flex justify-end px-3 py-2 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
        <span className="text-xs text-gray-500">
          {editor.storage.characterCount?.characters?.() || editor.getText().length} caracteres
        </span>
      </div>
    </div>
  );
}

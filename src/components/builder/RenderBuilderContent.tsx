"use client";

import { Content, type BuilderContent } from "@builder.io/sdk-react";
import { BUILDER_API_KEY } from "@/lib/builder";

interface RenderBuilderContentProps {
  content: BuilderContent | null;
  model: string;
}

export function RenderBuilderContent({ content, model }: RenderBuilderContentProps) {
  if (!content) return null;
  
  return (
    <Content
      content={content}
      model={model}
      apiKey={BUILDER_API_KEY}
    />
  );
}

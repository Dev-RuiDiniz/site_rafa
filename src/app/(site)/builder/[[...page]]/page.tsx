import { fetchOneEntry } from "@builder.io/sdk-react";
import { RenderBuilderContent } from "@/components/builder/RenderBuilderContent";
import { BUILDER_API_KEY } from "@/lib/builder";

interface PageProps {
  params: Promise<{
    page?: string[];
  }>;
}

export default async function BuilderPage({ params }: PageProps) {
  const { page } = await params;
  const urlPath = "/" + (page?.join("/") || "");

  // Fetch the Builder content for this page
  const content = await fetchOneEntry({
    model: "page",
    apiKey: BUILDER_API_KEY,
    userAttributes: {
      urlPath,
    },
  });

  return (
    <>
      {content ? (
        <RenderBuilderContent content={content} model="page" />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
            <p className="text-gray-600">
              Esta página ainda não foi criada no Builder.io
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Generate static params for known pages
export async function generateStaticParams() {
  return [];
}

// Revalidate every 5 seconds for ISR
export const revalidate = 5;

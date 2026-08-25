import { useEffect } from "react";

interface SEOMetadata {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function useSeoMetadata(metadata: SEOMetadata) {
  useEffect(() => {
    document.title = metadata.title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (name.startsWith("og:")) {
          el.setAttribute("property", name);
        } else {
          el.setAttribute("name", name);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (metadata.description) setMeta("description", metadata.description);
    if (metadata.ogTitle) setMeta("og:title", metadata.ogTitle);
    if (metadata.ogDescription) setMeta("og:description", metadata.ogDescription);
    if (metadata.ogImage) setMeta("og:image", metadata.ogImage);

    setMeta("og:title", metadata.ogTitle || metadata.title);
    setMeta("og:description", metadata.ogDescription || metadata.description || "");
    setMeta("og:type", "website");
    setMeta("og:site_name", "CaseVerse 2026");
  }, [metadata.title, metadata.description, metadata.ogTitle, metadata.ogDescription, metadata.ogImage]);
}

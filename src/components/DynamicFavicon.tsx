"use client";

import { useEffect, useState } from "react";

type FaviconType = "shr" | "maletti";

export function DynamicFavicon({ forceFavicon }: { forceFavicon?: FaviconType }) {
  const [favicon, setFavicon] = useState<FaviconType>("shr");

  useEffect(() => {
    if (forceFavicon) {
      setFavicon(forceFavicon);
      return;
    }

    const hostname = window.location.hostname;
    if (hostname.includes("maletti.com.br")) {
      setFavicon("maletti");
    } else {
      setFavicon("shr");
    }
  }, [forceFavicon]);

  const faviconPath = favicon === "maletti" ? "/malleti-fav.png" : "/shr-favicon.png";

  return (
    <>
      <link rel="icon" href={faviconPath} type="image/png" />
      <link rel="apple-touch-icon" href={faviconPath} />
    </>
  );
}

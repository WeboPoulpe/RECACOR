"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from "react";

type AssetEntry = { url: string; type: string; alt: string };
type AssetsMap = Record<string, AssetEntry>;

const AssetsContext = createContext<AssetsMap>({});

export function AssetsProvider({ children }: { children: ReactNode }) {
  const [assets, setAssets] = useState<AssetsMap>({});
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;
    let idleId: number | undefined;
    const load = () => {
      fetch("/api/public/assets", { cache: "force-cache" })
        .then((r) => r.json())
        .then((j) => {
          if (!cancelled) setAssets(j.assets || {});
        })
        .catch(() => {});
    };
    const requestIdle = (window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (requestIdle) {
      idleId = requestIdle(load, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(load, 1500);
    }
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId) {
        const cancelIdle = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        cancelIdle?.(idleId);
      }
    };
  }, []);
  return <AssetsContext.Provider value={assets}>{children}</AssetsContext.Provider>;
}

export function useAssetUrl(key: string, fallback: string): string {
  const map = useContext(AssetsContext);
  return map[key]?.url || fallback;
}

export function useAsset(key: string): AssetEntry | undefined {
  const map = useContext(AssetsContext);
  return map[key];
}

interface DynamicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  assetKey: string;
  fallback: string;
  alt: string;
}

export function DynamicImage({ assetKey, fallback, alt, ...rest }: DynamicImageProps) {
  const url = useAssetUrl(assetKey, fallback);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} {...rest} />;
}

interface DynamicVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  assetKey: string;
  fallback: string;
}

export function DynamicVideo({ assetKey, fallback, ...rest }: DynamicVideoProps) {
  const url = useAssetUrl(assetKey, fallback);
  return (
    <video {...rest} key={url}>
      <source src={url} type="video/mp4" />
    </video>
  );
}

interface DynamicMediaProps {
  assetKey: string;
  fallback: string;
  poster?: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
}

/** Affiche une <img> ou une <video> selon le type d'asset stocké.
 *  Le fallback (servi quand aucun asset n'est uploadé) est traité comme une vidéo. */
export function DynamicMedia({ assetKey, fallback, poster, alt, className, autoPlay }: DynamicMediaProps) {
  const asset = useAsset(assetKey);
  const url = asset?.url || fallback;
  const type = asset?.type || "video";
  if (type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={asset?.alt || alt} className={className} loading="lazy" />;
  }
  return (
    <video
      key={url}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      autoPlay={autoPlay}
      className={className}
    >
      <source src={url} type="video/mp4" />
    </video>
  );
}

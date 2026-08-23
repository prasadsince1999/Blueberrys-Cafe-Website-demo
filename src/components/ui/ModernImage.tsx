import React, { ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface ModernImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  className?: string;
  pictureClassName?: string;
  aspectRatio?: string;
  isTransparent?: boolean;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

const TRANSPARENT_ASSETS = [
  'floral-petal-accent',
  'cherry-blossom',
  'signature-coffee-cup',
  'floral-arch-mirror',
  'flower',
  'cup',
  'accent',
  'mirror',
  'tree'
];

/**
 * ModernImage component that serves cutting-edge AVIF and WebP formats
 * with automatic fallback to high-resolution PNG for legacy devices.
 * Transparent cutouts automatically bypass AVIF to ensure pristine alpha transparency.
 */
export function ModernImage({
  src,
  alt,
  className,
  pictureClassName,
  aspectRatio,
  isTransparent,
  loading = 'lazy',
  decoding = 'async',
  style,
  ...props
}: ModernImageProps) {
  // Normalize src to remove extension (if passed like "/interior.png" or "/interior.webp")
  const baseSrc = src.replace(/\.(png|webp|avif|jpg|jpeg)$/i, '');

  const hasAlpha = isTransparent !== undefined 
    ? isTransparent 
    : TRANSPARENT_ASSETS.some(t => baseSrc.toLowerCase().includes(t));

  const avifSrc = `${baseSrc}.avif`;
  const webpSrc = `${baseSrc}.webp`;
  const pngSrc = `${baseSrc}.png`;

  return (
    <picture className={cn('contents', pictureClassName)} style={{ aspectRatio }}>
      {!hasAlpha && <source srcSet={avifSrc} type="image/avif" />}
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={pngSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={{ ...style, ...(aspectRatio ? { aspectRatio } : {}) }}
        {...props}
      />
    </picture>
  );
}

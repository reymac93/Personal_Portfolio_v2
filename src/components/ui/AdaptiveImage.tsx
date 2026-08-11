import Image from 'next/image'

/**
 * Fills its (positioned) parent with an image.
 *
 * Raster sources go through next/image (resizing, AVIF/WebP, srcset).
 * SVG sources use a plain <img>: the optimizer cannot process SVG, so
 * next/image would run in `unoptimized` mode — all of the inline fill-style
 * machinery, none of the benefit. Swapping a placeholder for a `.jpg`/`.png`
 * switches it to the optimized path with no other change.
 */
export function AdaptiveImage({
  src,
  alt,
  sizes,
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  if (src.endsWith('.svg')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // Layout via classes only — no inline styles to collide with.
        className={`absolute inset-0 size-full ${className}`}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  )
}

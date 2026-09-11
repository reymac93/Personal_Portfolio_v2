import Image from 'next/image'

/**
 * Fills its (positioned) parent with an image.
 *
 * Raster sources go through next/image (resizing, AVIF/WebP, srcset).
 * Layout is class-based (`absolute inset-0 size-full`) rather than the `fill`
 * prop — `fill` injects inline position/height styles that Next 16 serialises
 * differently on the server and the client, which trips hydration.
 *
 * SVG sources use a plain <img>: the optimizer cannot process SVG.
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
  const frame = `absolute inset-0 size-full max-w-none ${className}`

  if (src.endsWith('.svg')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={frame}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      sizes={sizes}
      priority={priority}
      className={frame}
    />
  )
}

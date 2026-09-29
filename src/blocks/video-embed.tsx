import { cn } from "@ziwako/ui/utils"

export interface VideoEmbedProps {
  /** URL de la source (iframe YouTube/Vimeo ou fichier vidéo). */
  src: string
  /** `iframe` (défaut) ou `video` (HTML5 `<video controls>`). */
  type?: "iframe" | "video"
  poster?: string
  title?: string
  aspect?: string
  className?: string
}

/**
 * Lecteur vidéo responsive : iframe (YouTube/Vimeo…) ou HTML5 `<video>`.
 * Ratio par défaut `aspect-video`.
 */
export function VideoEmbed({
  src,
  type = "iframe",
  poster,
  title,
  aspect = "aspect-video",
  className,
}: VideoEmbedProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl bg-muted",
        aspect,
        className
      )}
    >
      {type === "video" ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          className="size-full object-cover"
        />
      ) : (
        <iframe
          src={src}
          title={title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 size-full"
        />
      )}
    </div>
  )
}

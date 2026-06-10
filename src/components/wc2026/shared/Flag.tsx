interface FlagProps {
  src: string;
  size?: number;
  className?: string;
  /** When true, image fills its parent (e.g. inside a circle frame). */
  fitParent?: boolean;
}

function isUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export default function Flag({ src, size = 40, className = "", fitParent = false }: FlagProps) {
  if (isUrl(src)) {
    if (fitParent) {
      return (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className={`wc-flag-fit ${className}`}
        />
      );
    }
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    );
  }

  return (
    <span
      className={className}
      style={{ fontSize: fitParent ? "1em" : size * 0.7, lineHeight: 1, display: "inline-block" }}
      aria-hidden="true"
    >
      {src}
    </span>
  );
}

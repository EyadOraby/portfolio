import type { Shot } from "../content";

/** A screenshot inside a phone or browser frame. */
export function Frame({
  shot,
  url,
  eager = false,
}: {
  shot: Shot;
  url?: string;
  eager?: boolean;
}) {
  const img = (
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.device === "phone" ? 780 : 1280}
      height={shot.device === "phone" ? 1688 : 800}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );

  if (shot.device === "phone") {
    return (
      <div className="frame frame-phone">
        <span className="frame-island" aria-hidden="true" />
        {img}
      </div>
    );
  }

  return (
    <div className="frame frame-browser">
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        {url && <em data-url={url.replace(/^https:\/\//, "")} />}
      </div>
      {img}
    </div>
  );
}

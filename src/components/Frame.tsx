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
  const phone = shot.device === "phone";
  // Each screenshot has a half-width copy for phones and small frames.
  const small = shot.src.replace(/\.webp$/, phone ? "-390.webp" : "-640.webp");
  const img = (
    <img
      src={shot.src}
      srcSet={`${small} ${phone ? 390 : 640}w, ${shot.src} ${phone ? 780 : 1280}w`}
      sizes={
        phone
          ? "(max-width: 760px) 60vw, 300px"
          : "(max-width: 760px) 92vw, 640px"
      }
      alt={shot.alt}
      width={phone ? 780 : 1280}
      height={phone ? 1688 : 800}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
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

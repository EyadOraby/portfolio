import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { Shot } from "../content";
import { wrapIndex } from "../lib";
import { ChevronIcon, CloseIcon } from "./Icons";

/** Full-screen screenshot viewer with arrow keys and Escape. */
export function Lightbox({
  shots,
  index,
  onChange,
  onClose,
}: {
  shots: Shot[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    close.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === "ArrowRight")
        onChange(wrapIndex(index + 1, shots.length));
      else if (e.key === "ArrowLeft")
        onChange(wrapIndex(index - 1, shots.length));
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [index, onChange, onClose, shots.length]);

  if (!shot) return null;

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
    >
      <img
        key={shot.src}
        src={shot.src}
        alt={shot.alt}
        className={shot.device === "phone" ? "lightbox-phone" : undefined}
        onClick={(e) => e.stopPropagation()}
      />
      <p className="lightbox-caption">
        {shot.alt}
        {shots.length > 1 && (
          <span>
            {" "}
            · {index + 1} / {shots.length}
          </span>
        )}
      </p>
      <button
        ref={close}
        type="button"
        className="lightbox-btn lightbox-close"
        aria-label="Close"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      {shots.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.stopPropagation();
              onChange(wrapIndex(index - 1, shots.length));
            }}
          >
            <ChevronIcon flip />
          </button>
          <button
            type="button"
            className="lightbox-btn lightbox-next"
            aria-label="Next screenshot"
            onClick={(e) => {
              e.stopPropagation();
              onChange(wrapIndex(index + 1, shots.length));
            }}
          >
            <ChevronIcon />
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}

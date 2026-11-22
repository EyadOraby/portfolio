import { t } from "../i18n";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { holdProgress } from "../lib";
import { spotlight, useNow } from "./hooks";

const HOLD_MS = 1200;
const RING = 2 * Math.PI * 46;

/**
 * Looks like a clock widget. Pressing and holding it fills a ring and opens
 * the hidden "Off the clock" view. Works with a mouse, touch and keyboard.
 */
export function HoldClock({ onUnlock }: { onUnlock: () => void }) {
  const now = useNow(1000);
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);
  const started = useRef(0);

  const stop = useCallback(() => {
    cancelAnimationFrame(frame.current);
    started.current = 0;
    setProgress(0);
  }, []);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = performance.now();
    const tick = () => {
      const p = holdProgress(performance.now() - started.current, HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        started.current = 0;
        navigator.vibrate?.(12);
        onUnlock();
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [onUnlock]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const onKeyDown = (e: KeyboardEvent) => {
    if ((e.key === " " || e.key === "Enter") && !e.repeat) {
      e.preventDefault();
      start();
    }
  };
  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") stop();
  };

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = now.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <button
      type="button"
      className="widget widget-clock"
      data-holding={progress > 0}
      aria-label={`${time}, ${day}. Press and hold to clock out.`}
      onPointerMove={spotlight}
      onPointerDown={(e) => {
        // Keeps the hold going if the finger drifts off the widget.
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* not every pointer can be captured */
        }
        start();
      }}
      onPointerUp={stop}
      onPointerCancel={stop}
      onLostPointerCapture={stop}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onBlur={stop}
      onContextMenu={(e) => e.preventDefault()}
    >
      <svg className="clock-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" className="clock-track" />
        <circle
          cx="50"
          cy="50"
          r="46"
          className="clock-fill"
          strokeDasharray={RING}
          strokeDashoffset={RING * (1 - progress)}
        />
      </svg>
      <span className="clock-time">{time}</span>
      <span className="clock-day">{day}</span>
      <span className="clock-hint">
        {progress > 0 ? t("Keep holding…") : t("Hold to clock out")}
      </span>
    </button>
  );
}

/** How far the notification shade can be pulled, in pixels. */
export const SHADE_HEIGHT = 320;

/** Pulling past this point opens the shade when released. */
export const OPEN_THRESHOLD = 110;

/** 0 when closed, 1 when fully pulled down. */
export function shadeProgress(pull: number): number {
  return Math.max(0, Math.min(1, pull / SHADE_HEIGHT));
}

export function shouldOpenShade(pull: number): boolean {
  return pull >= OPEN_THRESHOLD;
}

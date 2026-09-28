/** Fired before the nav scrolls, so a viewport-gated section is forced into
 *  existence instead of the scroll landing on an empty placeholder. */
export const REVEAL_EVENT = 'portfolio:reveal';

export function revealSection(id: string) {
  window.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: id }));
}

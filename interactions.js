// Magnetic hover: nudges an element toward the cursor within a small radius.
// Pure vanilla transform on the DOM node — no re-renders, stays smooth at 60fps.
export function magneticMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
}
export function magneticReset(e) {
  e.currentTarget.style.transform = "translate(0, 0)";
}
// Subtler variant for parallax on larger content blocks (hero panel).
export function parallaxMove(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  el.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px)`;
}

/**
 * AuroraBackground
 *
 * Three large blurred gradient orbs — Deep Blue, Plum Wine, Soft White —
 * floating with slow, independent keyframe animations.
 * Rendered with will-change:transform so compositing stays GPU-only.
 * Sits behind all hero content (z-0, pointer-events-none).
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="aurora-root"
    >
      {/* Orb 1 — Deep Blue, top-left drift */}
      <div className="aurora-orb aurora-orb--blue" />

      {/* Orb 2 — Plum Wine, bottom-right drift */}
      <div className="aurora-orb aurora-orb--plum" />

      {/* Orb 3 — Soft White, centre pulse */}
      <div className="aurora-orb aurora-orb--white" />
    </div>
  );
}

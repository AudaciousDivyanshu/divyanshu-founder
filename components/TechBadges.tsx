"use client";

const ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "AI Engineering",
  "Machine Learning",
  "Orion Helix",
  "Startup Building",
  "Leadership",
  "Product Design",
];

/**
 * TechBadges
 *
 * Infinite horizontal scrolling marquee of skill / tech badges.
 * The track is duplicated so the seam is invisible.
 * Pauses on hover. Fully responsive.
 */
export default function TechBadges() {
  // Render the list twice so the loop is seamless
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="w-full py-12 overflow-hidden select-none group">
      <div
        className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]"
      >
        {track.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-panel border border-white/10 whitespace-nowrap text-sm font-semibold tracking-wide text-on-surface-variant hover:text-on-surface hover:border-primary/30 hover:shadow-[0_0_18px_-4px_rgba(94,64,116,0.45)] transition-all duration-300 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

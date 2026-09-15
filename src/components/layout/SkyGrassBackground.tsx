/**
 * Full-viewport sky + grass backdrop. Decorative only — does not capture pointer events.
 */
export function SkyGrassBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* swap to tile/art later */}
      <div
        className="absolute inset-x-0 top-0 h-[62%]"
        style={{
          background:
            'linear-gradient(180deg, var(--color-sky-light) 0%, var(--color-sky) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] bg-[var(--color-grass)]"
      />
      <div
        className="absolute inset-x-0 h-2.5"
        style={{
          top: 'calc(62% - 5px)',
          background:
            'repeating-linear-gradient(90deg, var(--color-grass-dark) 0 5px, transparent 5px 10px)',
        }}
      />
    </div>
  )
}

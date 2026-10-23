// The mark: a folded broadsheet whose columns are struck through by one red
// rule, the single colour the site allows itself.
export function Mark({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 48 48" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <rect x="5" y="5" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M12 14h24M12 20h10M12 26h10M12 32h10M26 20h10M26 26h10M26 32h10" stroke="currentColor" strokeWidth="2.4" />
      <path d="M2 39 46 9" stroke="#c4231a" strokeWidth="3.4" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="brand-word">
      Kabar <i>Jernih</i>
    </span>
  );
}

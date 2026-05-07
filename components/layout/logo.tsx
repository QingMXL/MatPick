export function Logo({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-2 " + (className ?? "")}>
      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-[10px] bg-brand-600 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
          <path
            d="M12 3.2 19 7v10l-7 3.8L5 17V7l7-3.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 10.6c1.4-2 3.6-2 4.6 0 .9 1.7-.4 3.5-2.1 4.6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <div className="leading-tight">
        <div className="text-[15px] font-semibold tracking-wide text-ink-900">
          拾材集
        </div>
        <div className="text-[10px] font-medium tracking-[0.2em] text-ink-400 -mt-0.5">
          MATPICK
        </div>
      </div>
    </div>
  );
}

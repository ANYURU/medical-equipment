import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex items-center">
        {/* Medical Cross Icon */}
        <div className="relative h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </div>
        {/* Text */}
        <div className="ml-3">
          <div className="text-xl font-bold leading-none text-foreground uppercase tracking-wide">
            Gombaland
          </div>
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            Medical Supplies
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.svg"
      alt="Aegis"
      width={22}
      height={22}
      className={className}
    />
  )
}

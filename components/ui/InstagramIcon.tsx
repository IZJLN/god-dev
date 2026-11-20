export default function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-gradient)" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="url(#ig-gradient)" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-gradient)" />
    </svg>
  )
}

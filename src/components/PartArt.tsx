import type { ReactNode } from 'react'

export type ArtVariant = 'main' | 'detail' | 'schema'

interface PartArtProps {
  art: string
  category: string
  title: string
  variant?: ArtVariant
  caption?: boolean
}

function accent(variant: ArtVariant) {
  if (variant === 'detail') return <circle className="fill-accent" cx="78" cy="-62" r="5" />
  if (variant === 'schema') {
    return <path d="M-96 86 h192" strokeDasharray="4 5" opacity="0.55" />
  }
  return null
}

function pads(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <rect x="-86" y="-36" width="70" height="78" rx="10" />
      <rect x="16" y="-36" width="70" height="78" rx="10" />
      <path className="stroke-accent" d="M-68 -8h36M34 -8h36" strokeWidth="4" />
      <path d="M-58 22h20M48 22h20" />
      {accent(variant)}
    </g>
  )
}

function disc(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="0" cy="4" r="78" />
      <circle cx="0" cy="4" r="24" />
      <circle className="stroke-accent" cx="0" cy="4" r="8" />
      <circle cx="0" cy="-36" r="8" />
      <circle cx="38" cy="20" r="8" />
      <circle cx="-38" cy="20" r="8" />
      {accent(variant)}
    </g>
  )
}

function hose(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M-80 40 C-40 40 -40 -40 0 -40 S40 20 80 -10" />
      <path className="stroke-accent" d="M-92 40h20M72 -22h22" strokeWidth="5" />
      <circle cx="-86" cy="40" r="7" />
      <circle cx="88" cy="-16" r="7" />
      {accent(variant)}
    </g>
  )
}

function oilFilter(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M-36 -70h72v18h-72z" />
      <path d="M-46 -52h92v78c0 22-20 36-46 36s-46-14-46-36z" />
      <path className="stroke-accent" d="M-30 -10h60M-30 12h60M-30 34h60" />
      {accent(variant)}
    </g>
  )
}

function cabinFilter(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-78" y="-48" width="156" height="96" rx="8" />
      <path className="stroke-accent" d="M-62 -48v96M-38 -48v96M-14 -48v96M10 -48v96M34 -48v96M58 -48v96" />
      {accent(variant)}
    </g>
  )
}

function fuelFilter(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M-90 0h28" />
      <rect x="-62" y="-36" width="124" height="72" rx="36" />
      <path d="M62 0h28" />
      <path className="stroke-accent" d="M-30 -12h60M-30 12h60" />
      {accent(variant)}
    </g>
  )
}

function timing(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="-40" cy="-10" r="36" />
      <circle cx="46" cy="16" r="26" />
      <path className="stroke-accent" d="M-40 -46c70 -10 110 10 86 52" />
      <path d="M-70 20c20 40 70 50 116 16" />
      {accent(variant)}
    </g>
  )
}

function spark(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-16 -78h32v16h-32z" />
      <path d="M-22 -62h44v14h-44zM-18 -48h36v18l-8 8h-20l-8-8z" />
      <path d="M-10 -22h20v34l-10 10-10-10z" />
      <path className="stroke-accent" d="M-6 28l8 14M6 28l-8 14" />
      {accent(variant)}
    </g>
  )
}

function mount(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-50" y="-28" width="100" height="70" rx="16" />
      <path d="M-16 -70h32v42h-32z" />
      <circle className="stroke-accent" cx="0" cy="8" r="14" />
      <path d="M-70 42h140" />
      {accent(variant)}
    </g>
  )
}

function shock(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M0 -82v24" />
      <circle cx="0" cy="-82" r="7" />
      <rect x="-28" y="-58" width="56" height="92" rx="8" />
      <path className="stroke-accent" d="M-16 -40h32M-16 -22h32M-16 -4h32" />
      <path d="M0 34v40" />
      <path d="M-22 74h44" />
      {accent(variant)}
    </g>
  )
}

function arm(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
      <path d="M-80 40 L0 -50 L80 40 Z" />
      <circle className="stroke-accent" cx="0" cy="-20" r="12" />
      <circle cx="-80" cy="40" r="10" />
      <circle cx="80" cy="40" r="10" />
      {accent(variant)}
    </g>
  )
}

function balljoint(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M-28 -70h56l14 36h-84z" />
      <circle className="stroke-accent" cx="0" cy="8" r="28" />
      <path d="M0 36v40M-18 76h36" />
      {accent(variant)}
    </g>
  )
}

function headlamp(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-80 -20h70c40 0 70 18 86 46H-80z" />
      <path className="stroke-accent" d="M-60 -4h60c24 0 42 10 54 26" />
      <path d="M-80 26h40" />
      {accent(variant)}
    </g>
  )
}

function taillamp(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-70" y="-48" width="140" height="96" rx="18" />
      <path className="stroke-accent" d="M-70 -16h140M-70 16h140" />
      <circle cx="48" cy="32" r="8" />
      {accent(variant)}
    </g>
  )
}

function mirror(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-70 -30h90c28 0 46 16 46 36v8H-40z" />
      <path className="stroke-accent" d="M-50 -8h70" />
      <path d="M-20 14v48M-36 62h32" />
      {accent(variant)}
    </g>
  )
}

function bumper(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-96 -10h192c0 28-10 48-28 62H-68c-18-14-28-34-28-62z" />
      <path className="stroke-accent" d="M-70 16h140" />
      <path d="M-48 40h20M28 40h20" />
      {accent(variant)}
    </g>
  )
}

function battery(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-70" y="-36" width="140" height="90" rx="8" />
      <path d="M-22 -56h16v20h-16zM22 -50h18v14h-18z" />
      <path className="stroke-accent" d="M-28 -8h22M-17 3v-22M22 -8h20" />
      {accent(variant)}
    </g>
  )
}

function starter(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-30" y="-56" width="78" height="112" rx="16" />
      <path d="M-70 -10h40v28h-40z" />
      <circle className="stroke-accent" cx="8" cy="0" r="16" />
      <path d="M48 -20h28M48 20h28" />
      {accent(variant)}
    </g>
  )
}

function alternator(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="0" cy="0" r="58" />
      <circle cx="0" cy="0" r="16" />
      <path className="stroke-accent" d="M0 -42v16M0 26v16M-36 -24l12 8M24 16l12 8M-36 24l12-8M24 -16l12-8" />
      <rect x="52" y="-18" width="28" height="36" rx="4" />
      {accent(variant)}
    </g>
  )
}

function clutch(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="0" cy="0" r="74" />
      <circle cx="0" cy="0" r="18" />
      <circle className="stroke-accent" cx="0" cy="-40" r="8" />
      <circle className="stroke-accent" cx="34" cy="20" r="8" />
      <circle className="stroke-accent" cx="-34" cy="20" r="8" />
      <path d="M0 -18v-14M16 10l12 8M-16 10l-12 8" />
      {accent(variant)}
    </g>
  )
}

function flywheel(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="0" cy="0" r="62" />
      <circle cx="0" cy="0" r="16" />
      <path className="stroke-accent" d="M-4 -78h8l6 12h-20zM-4 66h8l6 12h-20zM-78 -4l12 6v-20zM66 -4l12-6v20zM-58 -58l10 8 4-12zM48 46l10 8-4 12zM-58 46l8-10-12-4zM48 -50l8 10 12-4z" />
      {accent(variant)}
    </g>
  )
}

function muffler(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M-96 -8h36" />
      <rect x="-60" y="-32" width="110" height="64" rx="32" />
      <path d="M50 0h46" />
      <path className="stroke-accent" d="M-28 -10h50M-28 10h50" />
      {accent(variant)}
    </g>
  )
}

function lambda(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <rect x="-22" y="-78" width="44" height="28" rx="6" />
      <path d="M-8 -50h16v24l18 18v62h-52v-62l18-18z" />
      <path className="stroke-accent" d="M-10 20h20M-8 40h16" />
      {accent(variant)}
    </g>
  )
}

function radiator(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-78" y="-58" width="156" height="116" rx="6" />
      <path className="stroke-accent" d="M-62 -58v116M-42 -58v116M-22 -58v116M-2 -58v116M18 -58v116M38 -58v116M58 -58v116" />
      <path d="M-20 -78h16M20 -78h16M-20 58h16v16M4 58h16v16" />
      {accent(variant)}
    </g>
  )
}

function thermostat(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <circle cx="0" cy="-6" r="46" />
      <path d="M-16 28h32l10 40h-52z" />
      <path className="stroke-accent" d="M0 -28v28" />
      <circle cx="0" cy="-6" r="6" className="fill-accent" />
      {accent(variant)}
    </g>
  )
}

function oil(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-28 -78h56v16h-56z" />
      <path d="M-40 -62h80l18 28v78c0 16-14 28-32 28h-52c-18 0-32-12-32-28v-78z" />
      <path className="stroke-accent" d="M-24 -10h48v28h-48z" />
      {accent(variant)}
    </g>
  )
}

function brakeFluid(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M-16 -78h32v14l10 12v18h-52v-18l10-12z" />
      <rect x="-36" y="-34" width="72" height="100" rx="12" />
      <path className="stroke-accent" d="M-20 -4h40v26h-40z" />
      {accent(variant)}
    </g>
  )
}

function coolant(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
      <path d="M-46 -20h70l22 -28h20v18l-16 22v62c0 16-16 28-36 28h-40c-20 0-34-12-34-28v-46z" />
      <path className="stroke-accent" d="M-30 10h52" />
      <path d="M18 -48c10 8 10 18 0 26" />
      {accent(variant)}
    </g>
  )
}

function wiper(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M-90 20c40 -40 90 -50 170 -20" />
      <path className="stroke-accent" d="M-20 8l70 46" />
      <circle cx="-20" cy="8" r="7" />
      {accent(variant)}
    </g>
  )
}

function mat(variant: ArtVariant) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="2.4">
      <rect x="-78" y="-50" width="156" height="100" rx="12" />
      <path className="stroke-accent" d="M-58 -30h116M-58 -10h116M-58 10h116M-58 30h116" />
      {accent(variant)}
    </g>
  )
}

const glyphs: Record<string, (variant: ArtVariant) => ReactNode> = {
  pads,
  disc,
  hose,
  'oil-filter': oilFilter,
  'cabin-filter': cabinFilter,
  'fuel-filter': fuelFilter,
  timing,
  spark,
  mount,
  shock,
  arm,
  balljoint,
  headlamp,
  taillamp,
  mirror,
  bumper,
  battery,
  starter,
  alternator,
  clutch,
  flywheel,
  muffler,
  lambda,
  radiator,
  thermostat,
  oil,
  'brake-fluid': brakeFluid,
  coolant,
  wiper,
  mat,
}

export function PartArt({ art, category, title, variant = 'main', caption = true }: PartArtProps) {
  const draw = glyphs[art] ?? pads
  return (
    <svg className="art" viewBox="0 0 640 480" role="img" aria-label={title} data-cat={category}>
      <g opacity="0.28" stroke="currentColor" strokeWidth="1.2">
        <path d="M28 28h22M28 28v22M612 28h-22M612 28v22M28 452h22M28 452v-22M612 452h-22M612 452v-22" />
      </g>
      <g transform="translate(320 228) scale(2)">{draw(variant)}</g>
      {caption ? (
        <text x="36" y="448" fill="currentColor" fontSize="15" letterSpacing="2.4" opacity="0.72">
          GLT · EXEMPLE
        </text>
      ) : null}
    </svg>
  )
}

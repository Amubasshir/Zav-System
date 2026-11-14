import type { SVGProps } from "react";

/* Inline SVG icons: no icon library, no extra requests. All decorative. */

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function CheckIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.6} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

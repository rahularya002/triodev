import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Outer Triangle */}
      <polygon
        points="256,60 55,395 457,395"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinejoin="round"
      />
      {/* Inner Triangle */}
      <polygon
        points="256,95 88,375 424,375"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      {/* Calligraphy E */}
      <path
        d="M 225,365 L 254,115 M 254,115 C 275,135 290,165 295,195 M 238,245 C 265,245 285,225 290,220 M 225,365 C 255,365 285,362 290,360"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

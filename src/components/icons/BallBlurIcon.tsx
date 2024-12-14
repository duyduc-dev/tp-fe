import { SizeProps } from '@/components/icons/types.ts';

const BallBlurIcon = ({ height = 280, width = 280 }: SizeProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 280 280"
    fill="none"
  >
    <g filter="url(#filter0_f_52_364)">
      <circle cx="140" cy="140" r="125" fill="url(#paint0_linear_52_364)" />
    </g>
    <defs>
      <filter
        id="filter0_f_52_364"
        x="0"
        y="0"
        width="280"
        height="280"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="7.5" result="effect1_foregroundBlur_52_364" />
      </filter>
      <linearGradient
        id="paint0_linear_52_364"
        x1="15"
        y1="66"
        x2="220.5"
        y2="243.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="0.5" stopColor="#EBEBEB" />
        <stop offset="1" stopColor="#D6D6D6" />
      </linearGradient>
    </defs>
  </svg>
);

export default BallBlurIcon;

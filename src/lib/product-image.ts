const PRODUCT_IMAGE_FALLBACK_SVG = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480' role='img' aria-label='Product image placeholder'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#f1f5f9'/>
      <stop offset='100%' stop-color='#cbd5e1'/>
    </linearGradient>
  </defs>
  <rect width='640' height='480' fill='url(#bg)'/>
  <rect x='170' y='110' width='300' height='220' rx='18' fill='none' stroke='#64748b' stroke-width='14'/>
  <circle cx='250' cy='200' r='28' fill='#94a3b8'/>
  <path d='M192 300l86-94 66 76 42-42 62 60' fill='none' stroke='#94a3b8' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/>
  <text x='320' y='390' font-family='Arial, Helvetica, sans-serif' font-size='32' text-anchor='middle' fill='#334155'>No Image</text>
</svg>`;

export const DEFAULT_PRODUCT_IMAGE =
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(PRODUCT_IMAGE_FALLBACK_SVG)}`;

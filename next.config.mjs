// Fully static export: every page is plain HTML on the CDN, so traffic never
// starts a function and never touches a database.
/** @type {import('next').NextConfig} */
export default {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

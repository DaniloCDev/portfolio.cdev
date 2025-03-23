import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["en", "pt"], // Adicione os idiomas suportados
    defaultLocale: "en"
  }
};

export default nextConfig;

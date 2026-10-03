import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Viruj Health",
    short_name: "Viruj",
    description:
      "Find care, request appointments, and manage medical records with Viruj Health.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8b1a1a",
    icons: [
      {
        src: "/brand/logo.png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
    ],
  };
}

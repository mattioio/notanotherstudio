import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Not Another Studio",
    short_name: "NAS",
    description:
      "Web, print & brand design. Fixed prices, fast turnarounds.",
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ef",
    theme_color: "#0d0d0d",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

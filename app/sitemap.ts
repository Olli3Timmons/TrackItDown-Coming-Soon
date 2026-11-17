import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://trackitdown.co.uk" }, { url: "https://trackitdown.co.uk/privacy" }]
}

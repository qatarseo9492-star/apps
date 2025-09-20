export type SoftwareInput = {
  name: string;
  slug?: string;
  shortDesc?: string | null;
  longDesc?: string | null;
  license?: string | null;
  os?: string[];
  categories?: string[]; // keep if you plan to support multi-categories later
  seoTitle?: string | null;
  seoDescription?: string | null;
  vendor?: string | null;

  /** Needed by your current form + API columns */
  vendorSlug?: string | null;
  categorySlug?: string | null;

  version?: string | null;
  fileSizeBytes?: number | null;
  featuredImage?: string | null;
  faqs?: { q: string; a: string }[] | null;
  systemRequirements?: { os: string; min: string; rec?: string }[] | null;
};

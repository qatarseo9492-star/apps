export type SoftwareInput = {
  name: string;
  slug?: string;
  shortDesc?: string | null;
  longDesc?: string | null;
  license?: string | null;
  os?: string[];
  vendorSlug?: string | null;
  categorySlug?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

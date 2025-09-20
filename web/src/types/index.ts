export type FAQ = { q: string; a: string };
export type SysReq = { os: string; min: string; rec?: string };

export type SoftwareInput = {
  slug: string;
  name: string;
  shortDesc?: string | null;
  longDesc?: string | null;
  isFree?: boolean;
  license?: string | null;
  website?: string | null;
  vendorSlug?: string | null;
  categorySlug?: string | null;
  iconUrl?: string | null;
  heroUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  os?: string[] | null;
  meta?: any;
  faqs?: FAQ[] | null;
  sysreq?: SysReq[] | null;
};

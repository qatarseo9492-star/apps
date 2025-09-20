import { pgTable, text, timestamp, boolean, integer, jsonb, primaryKey } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  slug: text('slug').primaryKey(),
  name: text('name').notNull(),
  parentSlug: text('parent_slug'),
  icon: text('icon'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const vendors = pgTable('vendors', {
  slug: text('slug').primaryKey(),
  name: text('name').notNull(),
  website: text('website'),
  verified: boolean('verified').default(false),
});

export const software = pgTable('software', {
  slug: text('slug').primaryKey(),
  name: text('name').notNull(),
  shortDesc: text('short_desc'),
  longDesc: text('long_desc'),
  isFree: boolean('is_free').default(true),
  license: text('license'),
  website: text('website'),
  vendorSlug: text('vendor_slug'),
  categorySlug: text('category_slug'),
  iconUrl: text('icon_url'),
  heroUrl: text('hero_url'),
  ratingsAvg: integer('ratings_avg').default(0),
  ratingsCount: integer('ratings_count').default(0),
  lastUpdatedAt: timestamp('last_updated_at').defaultNow(),
  publishedAt: timestamp('published_at'),
  status: text('status').default('published'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  os: jsonb('os'),       // string[]
  meta: jsonb('meta'),   // any
});

export const versions = pgTable('versions', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  softwareSlug: text('software_slug').notNull(),
  version: text('version').notNull(),
  osLabel: text('os_label'),
  license: text('license'),
  fileSize: integer('file_size'),
  checksumSha256: text('checksum_sha256'),
  archivePassword: text('archive_password'),
  downloadUrl: text('download_url'),
  mirrors: jsonb('mirrors'),       // [{title,url,priority}]
  changelog: text('changelog'),
  releaseDate: timestamp('release_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sysreq = pgTable('system_requirements', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  softwareSlug: text('software_slug').notNull(),
  os: text('os').notNull(),         // Windows/macOS/Linux
  minimum: jsonb('minimum').notNull(),
  recommended: jsonb('recommended'),
});

export const faqs = pgTable('faqs', {
  id: text('id').primaryKey().default('gen_random_uuid()'),
  softwareSlug: text('software_slug').notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').default(0),
});

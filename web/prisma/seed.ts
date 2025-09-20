import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function main() {
  const vendor = await db.vendor.upsert({
    where: { slug: 'acme' },
    update: {},
    create: { slug: 'acme', name: 'ACME Soft', website: 'https://example.com' }
  });

  const cat = await db.category.upsert({
    where: { slug: 'windows-tools' },
    update: {},
    create: { slug: 'windows-tools', name: 'Windows Tools' }
  });

  const sw = await db.software.upsert({
    where: { slug: 'acme-editor' },
    update: {},
    create: {
      slug: 'acme-editor',
      name: 'ACME Editor',
      shortDesc: 'Lightweight code editor for Windows/macOS.',
      longDesc: 'ACME Editor is a fast, extensible code editor with plugin support.',
      isFree: true,
      licenseDefault: 'Free',
      website: 'https://example.com/acme-editor',
      vendorId: vendor.id,
      categoryId: cat.id,
      heroUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      iconUrl: 'https://images.unsplash.com/photo-1589578527966-3f08f2dfe6b6',
      status: 'published',
      publishedAt: new Date()
    }
  });

  const v = await db.softwareVersion.create({
    data: {
      softwareId: sw.id,
      version: '1.2.0',
      os: 'Windows',
      license: 'Free',
      fileSizeBytes: 55 * 1024 * 1024,
      checksumSha256: 'demo-checksum',
      downloadUrl: 'https://cdn.example.com/acme-editor/1.2.0/setup.exe',
      changelog: 'New syntax themes and bug fixes.'
    }
  });

  await db.software.update({ where: { id: sw.id }, data: { currentVersionId: v.id, lastUpdatedAt: new Date() } });

  await db.fAQ.createMany({
    data: [
      { softwareId: sw.id, question: 'Is it free?', answer: 'Yes, ACME Editor is free for personal use.', order: 1 },
      { softwareId: sw.id, question: 'Supported OS?', answer: 'Windows and macOS.', order: 2 }
    ]
  });
}

main().finally(() => db.$disconnect());

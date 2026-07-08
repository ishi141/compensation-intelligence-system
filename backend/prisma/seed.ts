import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.role.createMany({
    data: [
      { title: "Software Engineer" },
      { title: "Backend Engineer" },
      { title: "Frontend Engineer" },
      { title: "Full Stack Engineer" },
      { title: "DevOps Engineer" },
      { title: "Data Engineer" },
      { title: "Machine Learning Engineer" },
      { title: "AI Engineer" },
      { title: "Data Scientist" },
      { title: "Engineering Manager" },
      { title: "Product Manager" },
      { title: "SRE" }
    ],
    skipDuplicates: true,
  });

  await prisma.level.createMany({
    data: [
      { name: "L1", rank: 1 },
      { name: "L2", rank: 2 },
      { name: "L3", rank: 3 },
      { name: "L4", rank: 4 },
      { name: "L5", rank: 5 },
      { name: "L6", rank: 6 },
      { name: "L7", rank: 7 },
      { name: "L8", rank: 8 },
      { name: "E3", rank: 3 },
      { name: "E4", rank: 4 },
      { name: "E5", rank: 5 },
      { name: "IC3", rank: 3 },
      { name: "IC4", rank: 4 },
      { name: "IC5", rank: 5 },
      { name: "IC6", rank: 6 }
    ],
    skipDuplicates: true,
  });

  await prisma.company.createMany({
    data: [
      {
        name: "Google",
        normalizedName: "google",
        website: "https://google.com",
      },
      {
        name: "Microsoft",
        normalizedName: "microsoft",
        website: "https://microsoft.com",
      },
      {
        name: "Amazon",
        normalizedName: "amazon",
        website: "https://amazon.com",
      },
      {
        name: "Meta",
        normalizedName: "meta",
        website: "https://meta.com",
      },
      {
        name: "Apple",
        normalizedName: "apple",
        website: "https://apple.com",
      },
      {
        name: "Netflix",
        normalizedName: "netflix",
        website: "https://netflix.com",
      },
      {
        name: "Adobe",
        normalizedName: "adobe",
        website: "https://adobe.com",
      },
      {
        name: "Uber",
        normalizedName: "uber",
        website: "https://uber.com",
      },
      {
        name: "Atlassian",
        normalizedName: "atlassian",
        website: "https://atlassian.com",
      },
      {
        name: "Flipkart",
        normalizedName: "flipkart",
        website: "https://flipkart.com",
      }
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
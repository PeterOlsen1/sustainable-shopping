import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

function str(arr) {
  return JSON.stringify(arr);
}

async function main() {
  // Step 1: Create sample brands
  const brands = await prisma.$transaction([
    prisma.brand.create({
      data: {
        name: "Patagonia",
        website: "www.patagonia.com",
        description:
          "Patagonia, Inc. is an American retailer of outdoor recreation clothing, equipment, and food.  It was founded by Yvon Chouinard in 1973 and is based in Ventura, California.  Patagonia operates stores in over ten countries, and factories in 16 countries.",
        clothingTypes: str(["Shirt", "Jacket", "T-Shirt"]),
        knownFor: str([
          "Ethical production",
          "Low water usage",
          "Recyclability",
        ]),
        rating: new Prisma.Decimal("4.8"),
      },
    }),
    prisma.brand.create({
      data: {
        name: "Eileen Fisher",
        website: "www.eileenfisher.com",
        description:
          "This brand focuses on timeless designs and durable, natural fabrics.  They also have a strong emphasis on circularity, offering take-back programs for old garments and promoting recycling.",
        clothingTypes: str(["Jeans", "Hoodie", "Sweater"]),
        knownFor: str(["Recyclability", "Youth focus"]),
        rating: new Prisma.Decimal("4.2"),
      },
    }),
    prisma.brand.create({
      data: {
        name: "Everlane",
        website: "www.everlane.com",
        description:
          "This brand is know for its radical transparency sharing details about its supply chain and manufacturing processes.  Thye prioritize ethical production and offer a range of wardrobe staples made with sustainable materials.",
        clothingTypes: str(["Shirt", "Sweater"]),
        knownFor: str(["Recyclability", "Ethical production"]),
        rating: new Prisma.Decimal("4.5"),
      },
    }),
  ]);

  // Step 2: Create clothing items linked to the brands
  const clothingItems = [
    {
      type: "Shirt",
      material: "Organic Cotton",
      price: new Prisma.Decimal("34.99"),
      brandId: brands[0].id, // Patagonia
    },
    {
      type: "Jacket",
      material: "Recycled Polyester",
      price: new Prisma.Decimal("99.99"),
      brandId: brands[0].id, // Patagonia
    },
    {
      type: "Hoodie",
      material: "Fleece",
      price: new Prisma.Decimal("59.99"),
      brandId: brands[1].id, // Eileen Fisher
    },
    {
      type: "Jeans",
      material: "Denim",
      price: new Prisma.Decimal("79.99"),
      brandId: brands[1].id, // Eileen Fisher
    },
    {
      type: "Shirt",
      material: "Denim",
      price: new Prisma.Decimal("79.99"),
      brandId: brands[2].id, // Everlane
    },
    {
      type: "Sweater",
      material: "Denim",
      price: new Prisma.Decimal("179.99"),
      brandId: brands[2].id, // Everlane
    },
  ];

  for (const item of clothingItems) {
    await prisma.clothing.create({ data: item });
    console.log(`Inserted clothing item: ${item.type}`);
  }

  //insert user roles
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    update: {},
    create: {
      name: "user",
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

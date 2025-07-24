"use server"; //mark this file as a server action

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getClothing() {
  const clothes = await prisma?.clothing.findMany();

  const brands = await getBrands();
  return clothes.map((item) => {
    const brand = brands.find((b) => b.id === item.brandId);
    return {
      ...item,
      brand,
    };
  });
}

export async function getBrandPage(brandId: number) {
  const brand: any = await prisma?.brand.findUnique({
    where: { id: brandId },
  });

  brand.knownFor = JSON.parse(brand.knownFor || "[]");
  brand.clothingTypes = JSON.parse(brand.clothingTypes || "[]");

  const clothing = await getClothingByBrand(brandId);
  return {
    ...brand,
    clothing,
  };
}

export async function getClothingByBrand(brandId: number) {
  return await prisma?.clothing.findMany({
    where: { brand: { id: brandId } },
    orderBy: { price: "asc" },
  });
}

export async function getClothingById(id: number) {
  const clothing = await prisma?.clothing.findUnique({
    where: { id },
    include: {
      brand: true,
    },
  });

  if (!clothing) return null;

  return clothing;
}

export async function updateClothingItem(
  id: number,
  data: {
    name: string;
    type: string;
    material: string;
    price: string;
    brandId: string;
    imageURL?: string;
  },
) {
  const updateData: any = {
    name: data.name,
    type: data.type,
    material: data.material,
    price: parseFloat(data.price),
    brandId: parseInt(data.brandId),
    ...(data.imageURL ? { imageURL: data.imageURL } : {}),
  };

  return await prisma?.clothing.update({
    where: { id },
    data: updateData,
  });
}

// This is the main searching function
export async function getClothingByQuery(query: string) {
  const clothes = await prisma?.clothing.findMany({
    where: {
      OR: [
        { material: { contains: query } },
        { type: { contains: query } },
        { name: { contains: query } }
      ],
    },
    orderBy: { price: "asc" },
  });

  const brands = await getBrands();
  return clothes.map((item) => {
    const brand = brands.find((b) => b.id === item.brandId);
    return {
      ...item,
      brand,
    };
  });
}

export async function getBrands() {
  const brands = await prisma?.brand.findMany({
    orderBy: { name: "asc" },
  });
  console.log(brands);

  return brands.map((brand) => ({
    ...brand,
    knownFor: JSON.parse(brand.knownFor || "[]"),
    clothingTypes: JSON.parse(brand.clothingTypes || "[]"),
  }));
}

export async function getBrandById(id: number) {
  const brand = await prisma?.brand.findUnique({
    where: { id },
  });

  if (!brand) return null;

  return {
    ...brand,
    knownFor: JSON.parse(brand.knownFor || "[]"),
    clothingTypes: JSON.parse(brand.clothingTypes || "[]"),
  };
}

export async function getClothingFromBrand(brandId: number) {
  return await prisma?.clothing.findMany({
    where: { brandId },
    orderBy: { price: "asc" },
  });
}

// model Clothing {
//   id          Int      @id @default(autoincrement())
//   type        String
//   material    String
//   price		    Decimal
//   brandId     Int
//   brand       Brand    @relation(fields: [brandId], references: [id])
//   createdAt   DateTime @default(now())
// }
export async function addClothingItem(data: {
  name: string;
  type: string;
  material: string;
  price: number;
  brandId: number;
  imageURL: string;
}) {
  console.log(data);
  return await prisma?.clothing.create({
    data,
  });
}

// model Brand {
//   id             Int      @id @default(autoincrement())
//   name           String
//   website        String
//   description    String
//   clothingTypes  String   // Store as JSON string: '["shirts", "pants", "jackets"]'
//   knownFor       String   // Store as JSON string: '["sustainability", "quality"]'
//   rating         Decimal
//   clothing       Clothing[] // Backrelation to Clothing
//   createdAt      DateTime @default(now())
// }
export async function addBrand(data: any) {
  return await prisma?.brand.create({
    data: {
      ...data,
      knownFor: JSON.stringify(data.knownFor),
      clothingTypes: JSON.stringify(data.clothingTypes),
    },
  });
}

export async function updateBrand(
  id: number,
  data: {
    name: string;
    website: string;
    description: string;
    clothingTypes: string;
    knownFor: string;
    rating: string;
    imageURL?: string; // Optional for now
  },
) {
  // Convert comma-separated strings to JSON arrays
  const clothingTypesArray = data.clothingTypes
    .split(",")
    .map((item) => item.trim());
  const knownForArray = data.knownFor.split(",").map((item) => item.trim());

  const updateData: any = {
    name: data.name,
    website: data.website,
    description: data.description,
    clothingTypes: JSON.stringify(clothingTypesArray),
    knownFor: JSON.stringify(knownForArray),
    rating: parseFloat(data.rating),
    imageURL: data.imageURL || "", // Save imageURL or empty string if not provided
  };

  return await prisma?.brand.update({
    where: { id },
    data: updateData,
  });
}

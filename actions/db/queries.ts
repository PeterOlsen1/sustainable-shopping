"use server"; //mark this file as a server action

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getClothing() {
  const clothes = await prisma?.clothing.findMany({
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

export async function getClothingByBrand(brandId: number) {
  return await prisma?.clothing.findMany({
    where: { brand: { id: brandId } },
    orderBy: { price: "asc" },
  });
}

export async function getClothingById(id: number) {
  return await prisma?.clothing.findUnique({
    where: { id },
  });
}

// This is the main searching function
export async function getClothingByQuery(query: string) {
  return await prisma?.clothing.findMany({
    where: {
      OR: [{ material: { contains: query } }, { type: { contains: query } }],
    },
    orderBy: { price: "asc" },
  });
}

export async function getBrands() {
  return await prisma?.brand.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getClothingFromBrand(brandId: number) {
  return await prisma?.clothing.findMany({
    where: { brandId },
    orderBy: { price: "asc" },
  });
}

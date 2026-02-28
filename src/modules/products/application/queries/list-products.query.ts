import { productSanityRepository } from "../../infrastructure";
import type { Product } from "../../domain/types";

export async function listProductsQuery(): Promise<Product[]> {
  return productSanityRepository.getAll();
}

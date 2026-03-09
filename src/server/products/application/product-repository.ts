import type { ProductEntity } from "../domain/product";

export interface ProductRepository {
  findAll(): ProductEntity[];
  findById(id: string): ProductEntity | null;
}

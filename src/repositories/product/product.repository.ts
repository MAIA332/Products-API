import { Product } from "../../entities/product"

export interface ProductRepository {
    save(product: Product): Promise<void>;
    find(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    update(product: Product): Promise<void>;
}
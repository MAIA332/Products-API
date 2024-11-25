import { PrismaClient } from "../../../../node_modules/.prisma/client/index";
import { Product } from "../../../entities/product";
import { ProductRepository } from "../product.repository";

export class ProductRepositoryPrisma implements ProductRepository {

    private constructor(readonly prisma:PrismaClient) {}

    public static build(prisma: PrismaClient) {
        return new ProductRepositoryPrisma(prisma);
    }
    public async save(product: Product): Promise<void> {

        const data = {
            id:product.id,
            name: product.name,
            price:product.price,
            quantity:product.quantity
        };

        await this.prisma.product.create({
            data

        });
    }

    public async findAll(): Promise<Product[]> {
        const aProducts = await this.prisma.product.findMany();

        const products = aProducts.map((product) => {
            return Product.with(product.id,product.name,product.price,product.quantity);
        });

        return products;
    }

    public async update(product: Product): Promise<void> {
        await this.prisma.product.update({
            where:
                {
                    id:product.id
                },
            data:
                {
                    name:product.name,
                    price:product.price,
                    quantity:product.quantity
                }
            });
    }

    public async find(id: string): Promise<Product | null> {
        const aProduct = await this.prisma.product.findUnique({
            where:{
                id
            }
        });
        if(!aProduct){
            throw new Error(`Product ${id} not found`);
        }

        const product = Product.with(aProduct.id,aProduct.name,aProduct.price,aProduct.quantity);

        return product;
    }
}
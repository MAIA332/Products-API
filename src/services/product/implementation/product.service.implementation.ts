import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import { ListOutputDTO, ProductService, SellOutputDTO, BuyOutputDTO, CreateOutputDtop } from "../product.service";

export class ProductServiceImplementation implements ProductService {

    private constructor(readonly repository: ProductRepository) {}

    public static build(repository: ProductRepository) {
        return new ProductServiceImplementation(repository);
    }
    public async sell(id: string, amount: number): Promise<SellOutputDTO> {
        const aProduct = await this.repository.find(id);

        if(!aProduct){
            throw new Error(`Product ${id} not found`);
        }
        aProduct.sell(amount);

        await this.repository.update(aProduct);

        const output: SellOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }
    public async buy (id: string, amount: number): Promise<BuyOutputDTO> {
        const aProduct = await this.repository.find(id);

        if(!aProduct){
            throw new Error(`Product ${id} not found`);
        }
        aProduct.increaseStock(amount);

        await this.repository.update(aProduct);

        const output: BuyOutputDTO = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }

    public async list(): Promise<ListOutputDTO> {
        const aProduct = await this.repository.findAll();
        
        const products = aProduct.map((product) => {
            return {    
                id:product.id,
                name:product.name,
                price:product.price,
                balance:product.quantity
            } 
        });

        const output: ListOutputDTO = {
            products
        }

        return output;
    }

    public async create(name: string, price: number): Promise<CreateOutputDtop> {
        const aProduct = Product.create(name,price);

        await this.repository.save(aProduct);

        const output: CreateOutputDtop = {
            id: aProduct.id,
            balance: aProduct.quantity
        };

        return output;
    }
}
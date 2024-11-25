import { ProductRepository } from './../../../repositories/product/product.repository';
import { Request, Response } from 'express';
import { ProductRepositoryPrisma } from './../../../repositories/product/prisma/product.repository.prisma';
import { prisma } from '../../../util/prisma.util';
import { ProductServiceImplementation } from '../../../services/product/implementation/product.service.implementation';
export class ProductController {

    private constructor() {}

    public static build() {
        return new ProductController();
    }

    public async create(request: Request, response: Response) {
        const { name, price } = request.body;
        
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductServiceImplementation.build(aRepository);

        const output =  await aService.create(name,price);

        return response.status(200).json(output).send();
    }

    public async list(request: Request, response: Response) {
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductServiceImplementation.build(aRepository);

        const output =  await aService.list();        
        return response.status(200).json(output).send();
    }

    public async buy(request: Request, response: Response) {
        const {id} = request.params;
        const {amount } = request.body;        
        
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductServiceImplementation.build(aRepository);

        const output =  await aService.buy(id,amount);

        return response.status(200).json(output).send();
    }

    public async sell(request: Request, response: Response) {
        const {id} = request.params;
        const {amount} = request.body;
        
        const aRepository = ProductRepositoryPrisma.build(prisma);
        const aService = ProductServiceImplementation.build(aRepository);

        const output =  await aService.sell(id,amount);

        return response.status(200).json(output).send();
    }
}
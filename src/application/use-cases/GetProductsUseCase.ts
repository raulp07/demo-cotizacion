import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';
import { toProductDTO, toProductDTOList, ProductDTO } from '../dto/ProductDTO';

export class GetProductsUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(): Promise<ProductDTO[]> {
        const products = await this.productRepository.getAll();
        return toProductDTOList(products);
    }

    async getByCategory(category: string): Promise<ProductDTO[]> {
        const products = await this.productRepository.getByCategory(category);
        return toProductDTOList(products);
    }

    async search(query: string): Promise<ProductDTO[]> {
        const products = await this.productRepository.search(query);
        return toProductDTOList(products);
    }

    async getById(id: string): Promise<ProductDTO | null> {
        const product = await this.productRepository.getById(id);
        if (!product) return null;
        return toProductDTO(product);
    }
}

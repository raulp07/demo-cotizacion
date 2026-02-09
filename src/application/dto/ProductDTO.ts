import { Product } from '../../domain/entities/Product';

export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    sku: string;
    formattedPrice: string;
}

export function toProductDTO(product: Product): ProductDTO {
    return {
        ...product,
        formattedPrice: new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(product.price),
    };
}

export function toProductDTOList(products: Product[]): ProductDTO[] {
    return products.map(toProductDTO);
}

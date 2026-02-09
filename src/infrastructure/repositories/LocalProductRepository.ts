import { IProductRepository } from '../../domain/interfaces/IProductRepository';
import { Product } from '../../domain/entities/Product';

const products: Product[] = [
    {
        id: '1',
        name: 'Laptop HP Pavilion',
        description: 'Laptop de 15.6" con procesador Intel Core i5, 8GB RAM, 256GB SSD',
        price: 2999.00,
        category: 'Electrónica',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
        stock: 10,
        sku: 'HP-LP-001'
    },
    {
        id: '2',
        name: 'Mouse Inalámbrico Logitech',
        description: 'Mouse inalámbrico con receptor USB, diseño ergonómico',
        price: 89.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
        stock: 50,
        sku: 'LG-MS-001'
    },
    {
        id: '3',
        name: 'Teclado Mecánico RGB',
        description: 'Teclado mecánico con iluminación RGB switches azules',
        price: 249.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&fit=crop',
        stock: 25,
        sku: 'KB-RGB-001'
    },
    {
        id: '4',
        name: 'Monitor Samsung 27"',
        description: 'Monitor LED 27" Full HD con HDMI y VGA',
        price: 1299.00,
        category: 'Electrónica',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
        stock: 8,
        sku: 'SM-MN-001'
    },
    {
        id: '5',
        name: 'Webcam HD 1080p',
        description: 'Cámara web con micrófono integrado, resolución Full HD',
        price: 199.00,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop',
        stock: 30,
        sku: 'WC-HD-001'
    },
    {
        id: '6',
        name: 'Auriculares Sony WH-1000XM4',
        description: 'Auriculares inalámbricos con cancelación de ruido',
        price: 1599.00,
        category: 'Audio',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop',
        stock: 15,
        sku: 'SN-AU-001'
    },
    {
        id: '7',
        name: 'Disco SSD 1TB Samsung',
        description: 'Disco sólido interno 1TB, velocidad de lectura 3500 MB/s',
        price: 699.00,
        category: 'Almacenamiento',
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
        stock: 20,
        sku: 'SS-SM-001'
    },
    {
        id: '8',
        name: 'Router WiFi 6 TP-Link',
        description: 'Router dual band AX3000, velocidad hasta 3000 Mbps',
        price: 449.00,
        category: 'Redes',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
        stock: 12,
        sku: 'TP-RT-001'
    }
];

export class LocalProductRepository implements IProductRepository {
    async getAll(): Promise<Product[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return products;
    }

    async getById(id: string): Promise<Product | null> {
        await new Promise(resolve => setTimeout(resolve, 100));
        return products.find(p => p.id === id) || null;
    }

    async getByCategory(category: string): Promise<Product[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return products.filter(p => p.category === category);
    }

    async search(query: string): Promise<Product[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        const lowerQuery = query.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.sku.toLowerCase().includes(lowerQuery)
        );
    }
}

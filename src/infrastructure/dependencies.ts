import { LocalProductRepository } from './repositories/LocalProductRepository';
import { IProductRepository } from '../domain/interfaces/IProductRepository';
import { GetProductsUseCase } from '../application/use-cases/GetProductsUseCase';
import { WhatsAppService } from './services/WhatsAppService';

// Repositories
const productRepository: IProductRepository = new LocalProductRepository();

// Use Cases
export const getProductsUseCase = new GetProductsUseCase(productRepository);

// Services
export const whatsappService = new WhatsAppService();

import { CartItem } from '../../domain/entities/Product';

export interface CustomerInfo {
    name: string;
    phone: string;
}

export class WhatsAppService {
    private readonly baseUrl = 'https://wa.me';
    private businessPhoneNumber: string;

    constructor(businessPhoneNumber?: string) {
        // Try to get from localStorage first, then use provided number or default
        const storedNumber = localStorage.getItem('whatsapp-business-number');
        this.businessPhoneNumber = storedNumber || businessPhoneNumber || '51999999999';
    }

    setBusinessPhoneNumber(phoneNumber: string): void {
        this.businessPhoneNumber = phoneNumber;
        localStorage.setItem('whatsapp-business-number', phoneNumber);
    }

    getBusinessPhoneNumber(): string {
        return this.businessPhoneNumber;
    }

    generateQuotationMessage(items: CartItem[], customer: CustomerInfo): string {
        const date = new Date().toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let message = `*SOLICITUD DE COTIZACIÓN*\n\n`;
        message += `*Fecha:* ${date}\n`;
        message += `*Cliente:* ${customer.name}\n`;
        message += `*Teléfono:* ${customer.phone}\n\n`;
        message += `*PRODUCTOS SOLICITADOS:*\n`;
        message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

        let subtotal = 0;

        items.forEach((item, index) => {
            const itemTotal = item.product.price * item.quantity;
            subtotal += itemTotal;

            message += `${index + 1}. *${item.product.name}*\n`;
            message += `   Código: ${item.product.sku}\n`;
            message += `   Precio: S/ ${item.product.price.toFixed(2)}\n`;
            message += `   Cantidad: ${item.quantity}\n`;
            message += `   Subtotal: S/ ${itemTotal.toFixed(2)}\n\n`;
        });

        message += `━━━━━━━━━━━━━━━━━━━━\n`;
        message += `*TOTAL ESTIMADO:* S/ ${subtotal.toFixed(2)}\n\n`;
        message += `────────────────────\n`;
        message += `Por favor, confirmar disponibilidad y precio final.\n`;
        message += `Gracias por su preferencia. 🙏`;

        return message;
    }

    generateWhatsAppUrl(items: CartItem[], customer: CustomerInfo): string {
        const message = this.generateQuotationMessage(items, customer);
        const encodedMessage = encodeURIComponent(message);
        return `${this.baseUrl}/${this.businessPhoneNumber}?text=${encodedMessage}`;
    }

    openQuotation(items: CartItem[], customer: CustomerInfo): void {
        const url = this.generateWhatsAppUrl(items, customer);
        window.open(url, '_blank');
    }
}

export const whatsappService = new WhatsAppService();

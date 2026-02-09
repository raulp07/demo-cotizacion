import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, User, Phone as PhoneIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { whatsappService } from '../../infrastructure/dependencies';
import './Layout.css';

export default function CartSidebar() {
    const { items, totalPrice, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const handleQuotation = () => {
        if (items.length === 0) return;

        const name = customerName.trim();
        const phone = customerPhone.trim();

        if (!name) {
            alert('Por favor ingresa tu nombre');
            return;
        }

        if (!phone) {
            alert('Por favor ingresa tu número de teléfono');
            return;
        }

        whatsappService.openQuotation(items, { name, phone });
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />
            <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Carrito de Cotización</h2>
                    <button className="cart-close" onClick={closeCart}>
                        <X size={20} />
                    </button>
                </div>

                <div className="cart-body">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <ShoppingBag size={48} />
                            <p>Tu carrito está vacío</p>
                            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                Agrega productos para solicitar una cotización
                            </p>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {items.map(item => (
                                <div key={item.product.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={item.product.image} alt={item.product.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <span className="cart-item-name">{item.product.name}</span>
                                        <span className="cart-item-price">
                                            {new Intl.NumberFormat('es-PE', {
                                                style: 'currency',
                                                currency: 'PEN',
                                            }).format(item.product.price)}
                                        </span>
                                        <div className="cart-item-actions">
                                            <div className="cart-quantity">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button
                                                className="cart-item-remove"
                                                onClick={() => removeItem(item.product.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                marginBottom: '0.5rem'
                            }}>
                                <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Tu nombre *
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Ingresa tu nombre"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                marginBottom: '0.5rem'
                            }}>
                                <PhoneIcon size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                Tu número de teléfono *
                            </label>
                            <input
                                type="tel"
                                className="input"
                                placeholder="Ej: 999 999 999"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                            />
                        </div>
                        <div className="cart-total">
                            <span>Total Estimado</span>
                            <span>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                }).format(totalPrice)}
                            </span>
                        </div>
                        <button
                            className="btn btn-whatsapp"
                            onClick={handleQuotation}
                            style={{ marginBottom: '0.5rem' }}
                        >
                            Solicitar Cotización por WhatsApp
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={clearCart}
                            style={{ width: '100%' }}
                        >
                            Vaciar Carrito
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2, User, Phone as PhoneIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { whatsappService } from '../../infrastructure/dependencies';
import './Pages.css';

export default function CartPage() {
    const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
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

    if (items.length === 0) {
        return (
            <div className="container">
                <div className="empty-cart">
                    <ShoppingCart size={64} />
                    <h2>Tu carrito está vacío</h2>
                    <p>Agrega productos desde el catálogo para solicitar una cotización</p>
                    <Link to="/" className="btn btn-primary">
                        Ver Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="cart-page-header">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Volver al Catálogo
                </Link>
                <h1>Carrito de Cotización</h1>
            </div>

            <div className="cart-page-content">
                <div className="cart-items-list">
                    {items.map(item => (
                        <div key={item.product.id} className="cart-item-card card">
                            <div className="cart-item-image-lg">
                                <img src={item.product.image} alt={item.product.name} />
                            </div>
                            <div className="cart-item-info">
                                <span className="cart-item-category">{item.product.category}</span>
                                <h3>{item.product.name}</h3>
                                <p className="cart-item-sku">SKU: {item.product.sku}</p>
                                <p className="cart-item-price">
                                    {new Intl.NumberFormat('es-PE', {
                                        style: 'currency',
                                        currency: 'PEN',
                                    }).format(item.product.price)}
                                </p>
                            </div>
                            <div className="cart-item-actions-lg">
                                <div className="quantity-control">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItem(item.product.id)}
                                >
                                    <Trash2 size={18} />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary card">
                    <h2>Resumen de Cotización</h2>

                    <div className="cart-summary-section">
                        <label>
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

                    <div className="cart-summary-section">
                        <label>
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

                    <div className="cart-totals">
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                }).format(totalPrice)}
                            </span>
                        </div>
                        <div className="cart-total-row grand-total">
                            <span>Total Estimado</span>
                            <span>
                                {new Intl.NumberFormat('es-PE', {
                                    style: 'currency',
                                    currency: 'PEN',
                                }).format(totalPrice)}
                            </span>
                        </div>
                    </div>

                    <button
                        className="btn btn-whatsapp btn-lg"
                        onClick={handleQuotation}
                    >
                        Solicitar Cotización por WhatsApp
                    </button>

                    <button
                        className="btn btn-secondary btn-lg"
                        onClick={clearCart}
                    >
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

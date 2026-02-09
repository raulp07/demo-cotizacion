import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import SettingsModal from './SettingsModal';
import './Layout.css';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const { totalItems, toggleCart } = useCart();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="layout">
            <header className="header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        <Package size={28} />
                        <span>Demo Cotización</span>
                    </Link>

                    <nav className="nav">
                        <Link to="/" className="nav-link">Catálogo</Link>
                        <button
                            className="settings-button"
                            onClick={() => setIsSettingsOpen(true)}
                            title="Configurar número de WhatsApp"
                        >
                            <Settings size={20} />
                        </button>
                        <button className="cart-button" onClick={toggleCart}>
                            <ShoppingCart size={24} />
                            {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="main">
                {children}
            </main>

            <footer className="footer">
                <div className="container">
                    <p>© 2026 Demo Cotización - Sistema de Cotización de Productos</p>
                </div>
            </footer>

            <CartSidebar />
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
}

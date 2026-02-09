import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './presentation/context/CartContext';
import Layout from './presentation/components/Layout';
import CatalogPage from './presentation/pages/CatalogPage';
import CartPage from './presentation/pages/CartPage';

function App() {
    return (
        <CartProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<CatalogPage />} />
                    <Route path="/carrito" element={<CartPage />} />
                </Routes>
            </Layout>
        </CartProvider>
    );
}

export default App;

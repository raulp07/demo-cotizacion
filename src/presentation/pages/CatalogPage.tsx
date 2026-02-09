import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { getProductsUseCase } from '../../infrastructure/dependencies';
import { useCart } from '../context/CartContext';
import { ProductDTO } from '../../application/dto/ProductDTO';
import './Pages.css';

export default function CatalogPage() {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { addItem } = useCart();

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [searchQuery, selectedCategory, products]);

    const loadProducts = async () => {
        try {
            const data = await getProductsUseCase.execute();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                p =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.sku.toLowerCase().includes(query)
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        setFilteredProducts(filtered);
    };

    const categories = [...new Set(products.map(p => p.category))];

    const handleAddToCart = (product: ProductDTO) => {
        addItem({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: product.image,
            stock: product.stock,
            sku: product.sku,
        }, 1);
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="catalog-header">
                <h1>Catálogo de Productos</h1>
                <p>Selecciona los productos que deseas cotizar</p>
            </div>

            <div className="catalog-controls">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="category-filter">
                    <Filter size={20} />
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-results">
                    <p>No se encontraron productos</p>
                    <button className="btn btn-secondary" onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                    }}>
                        Limpiar filtros
                    </button>
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card card animate-fade-in">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} loading="lazy" />
                                {product.stock < 10 && (
                                    <span className="badge badge-warning">Stock limitado</span>
                                )}
                            </div>
                            <div className="product-content">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-footer">
                                    <span className="product-price">{product.formattedPrice}</span>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

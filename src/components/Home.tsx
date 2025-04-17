import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { AppDispatch } from './store';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    rating: {
        rate: number;
    };
}

export default function Home(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [category, setCategory] = useState<string>('all');

    const { data: categories } = useQuery<string[]>('actegories', () => 
        fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
    );

    const { data: products, isLoading } = useQuery<Product[]>(['products', category], () => {
        const url = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
        return fetch(url).then(res => res.json());
    });

    if (isLoading) return <div>Loading products...</div>;

    return (
        <div>
            <select onChange={e => setCategory(e.target.value)} value={category} style={{ marginBottom: '16px', padding: '8px' }}>
                <option value='all'>All</option>
                {categories?.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
                {products?.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
                        <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
                        <h2>{product.title}</h2>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>{product.description.slice(0, 100)}...</p>
                        <p>Rating: {product.rating.rate}</p>
                        <button onClick={() => dispatch(addToCart(product))} style={{ marginTop: '8px', backgroundColor: '#0007bff', color: 'white', padding: '8px 16px' }}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
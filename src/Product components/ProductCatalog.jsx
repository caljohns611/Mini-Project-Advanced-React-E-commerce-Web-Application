import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        const fetchCategories = async () => {
            try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            const data = await response.json();
            setCategories(["all", ...data]);
            } catch (error) {
            console.error("Failed to fetch categories:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === "all" || product.category === selectedCategory;
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.price.toString().includes(searchQuery);

        return matchesCategory && matchesSearch;
    });
    }, [products, selectedCategory, searchQuery]);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        alert(`${product.title} added to cart!`);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>
            <div className="flex gap-2 mb-4">
            {categories.map((category) => (
            <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`p-2 rounded ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
                {category}
            </button>
            ))}
        </div>
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search by title or price..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border p-2 rounded"
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
            <div
                key={product.id}
                className="border p-4 rounded shadow-sm hover:shadow-lg"
            >
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-600">{product.category}</p>
                <p className="font-bold text-green-500">${product.price}</p>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                    Add to Cart
                </button>
            </div>
        ))}
        </div>
    </div>
  );
};

export default ProductCatalog;
'use client';

import { fetchListOfProducts } from "@/actions";
import { useEffect } from "react";
import { useState } from "react";

function ClientPageExample() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getListOfProducts() {
        setLoading(true);
        const data = await fetchListOfProducts();
        console.log(data);
        if(data) {
            setProducts(data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getListOfProducts();
    }, []);
    
    if(loading) {
        return <p className="text-center text-2xl text-extrabold">Loading data! Please wait...</p>
    } 

    return (
        <div>
            <h1>Client page server actions example</h1>
            <ul>
            {
                products && products.length > 0 ?
                products.map((product) => {
                    return <li key={product.id} className="mt-2">
                        {product.id} - {product.title}
                    </li>
                }) : ''
            }
        </ul>
        </div>
    );
}

export default ClientPageExample;
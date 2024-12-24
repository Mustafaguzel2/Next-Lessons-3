import { fetchListOfProducts } from "@/actions";

async function ServerActionsExample() {

    const products = await fetchListOfProducts();
    console.log(products);

    return ( 
    <div>
        <h1>Server Actions example - server component</h1>
        <ul>
            {
                products && products.length > 0 ?
                products.map((product) => {
                    return <li key={product.id} className="mt-2">
                        {product.id} - {product.title}
                    </li>
                }) : <p>No products found</p>
            }
        </ul>
    </div>
    );
}

export default ServerActionsExample;
import "./App.css";

import React, { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";

import {myFirebase} from "./models/MyFirebase.js";

export default function App() {
  const [products, setProducts] = useState([
  
  ]);

  const [productsToBuy, setProductsToBuy] = useState([]);

  const onAddProduct = () => {
    setProducts([
      ...products,
      {
        id: products.at(-1).id + 1,
        name: `Product ${products.length + 1}`,
        price: 400,
      },
    ]);
  };

  const onAddProductToBuy = (product) => {
    setProductsToBuy([
      ...productsToBuy, 
      product
    ])
  };

  const onDeleteProduct = async (productToDelete) => {
    // Remove the product from the UI first
    setProductsToBuy(productsToBuy.filter((product) => product !== productToDelete));

    // Then delete it from the Firebase
    await myFirebase.deleteCartProduct(productToDelete.id);
  };

  // Load the data from Firebase once when the component is mounted
  useEffect(() => {
    const getProducts = async () => {
      const products = await myFirebase.getProducts();
      setProducts(products);
    }

    getProducts();

    const getCartProducts = async () => {
      const products = await myFirebase.getCartProducts();
      setProductsToBuy(products);
    }

    getCartProducts();

  }, []); // Empty array means run only once

  return (
    <div>
      <div className="row">
      <h1>Basic Shopping Site</h1>
        <div className="col-8">

          <ProductsList products={products} onAddProductToBuy={onAddProductToBuy}/>

          <CreateProductForm onAddProduct={onAddProduct}/>
        </div>
        {/* col-8 */}

        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart productsToBuy={productsToBuy} onDeleteProduct={onDeleteProduct} />
        </div>


        {/* <button onClick={

          async ()=> {
            const products = await myFirebase.getProducts();
            console.log(products);
          }

        }>Get Documents</button> */}

      </div>
    </div>
  );
}



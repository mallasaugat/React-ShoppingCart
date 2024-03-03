import "./App.css";

import React, { useState, useEffect } from "react";

import ProductsList from "./components/ProductsList.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import CreateProductForm from "./components/CreateProductForm.jsx";

import {myFirebase} from "./models/MyFirebase.js";

export default function App() {

  const [products, setProducts] = useState([]);

  const [productsToBuy, setProductsToBuy] = useState([]);

  const onAddProduct = async (product) => {

    myFirebase.createProducts(product);

    setProducts([
      ...products,
      product
    ]);
  };

  const onAddProductToBuy = async (product) => {
    await myFirebase.addCartProducts(product);
    setProductsToBuy([
      ...productsToBuy, 
      product
    ]);

  };

  // Cart from cart
  const onDeleteProduct = async (productToDelete) => {

    // Delete it from the Firebase
    await myFirebase.deleteCartProduct(productToDelete.id);

    // Remove the product from the UI 
    setProductsToBuy(productsToBuy.filter((product) => product !== productToDelete));
    
  };

  // Delete product
  const onDelete = async (id) => {

    await myFirebase.deleteProduct(id);
    // Remove the product from the UI 
    setProducts(products.filter((product) => product.id !== id));
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

  }, []); 

  return (
    <div>
      <div className="row">
      <h1>Basic Shopping Site</h1>
        <div className="col-8">

          <ProductsList products={products} onAddProductToBuy={onAddProductToBuy} onDelete={onDelete}/>

          <CreateProductForm onAddProduct={onAddProduct} />
        </div>
        {/* col-8 */}

        <div className="col-4">
          <h2>Shopping Cart</h2>
          <ShoppingCart productsToBuy={productsToBuy} onDeleteProduct={onDeleteProduct} />
        </div>


      </div>
    </div>
  );
}



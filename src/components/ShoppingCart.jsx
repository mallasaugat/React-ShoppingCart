import React from "react";
import PropTypes from "prop-types";

export default function ShoppingCart({ productsToBuy, onDeleteProduct }) {
  
  const uniqueProducts = [...new Set(productsToBuy)]; // Get unique products from the cart

  const renderProductToBuy = (product) => (
    <li key={product.id}>
    {product.name} [ {product.count} ]
      <button onClick={() => onDeleteProduct(product)}>Remove</button>
    </li>
  );

  return (
    <div>
      <ul>
        {uniqueProducts.map(renderProductToBuy)}
        Total : $
        {productsToBuy.reduce(
          (prevTotalPrice, product) => prevTotalPrice + product.price * product.count,
          0
        )}
      </ul>
    </div>
  );
}

ShoppingCart.propTypes = {
  productsToBuy: PropTypes.array.isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
};

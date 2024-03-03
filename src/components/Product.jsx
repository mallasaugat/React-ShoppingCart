import React from "react";
import PropTypes from "prop-types";
import { myFirebase } from "../models/MyFirebase";

export default function Product({ product, onAddProductToBuy }) {

  const onAdd = () => {

    console.log("Added to cart", product.name);
    onAddProductToBuy(product);

    myFirebase.addCartProducts(product);

  }

  const onModify = () =>{
    console.log("Modify");
  }

  const onDelete = () => {
    console.log("Deleting product", product.id);
    myFirebase.deleteProduct(product.id);
}

  return (
    <div className="col-4">
      <div className="card ">
        <img src={product.image} alt={product.name} />
        {product.name} ${product.price}
        <button className="btn btn-outline-primary btn-sm" onClick={onAdd}>Add to Cart</button>
        <button className="btn btn-outline-warning btn-sm" onClick={onModify}>Modify Product</button>
        <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>Delete Product</button>
      </div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};



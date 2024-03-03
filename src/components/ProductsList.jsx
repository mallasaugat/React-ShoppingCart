import React, { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";

export default function ProductsList({ products, onAddProductToBuy }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="container mt-4">

      <h2>Products</h2>
      <div className="row">
        {currentProducts.map((p, i) => (
          <Product key={i} product={p} onAddProductToBuy={onAddProductToBuy}></Product>
        ))}
      </div>

      <div className="row justify-content-center">
        <div className="text-center">
          <button className="btn btn-primary mr-2" onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button className="btn btn-primary ml-2" onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddProductToBuy: PropTypes.func.isRequired,
};

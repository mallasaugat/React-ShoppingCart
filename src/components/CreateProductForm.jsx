import React, {useEffect, useRef} from "react"
import PropTypes from "prop-types";
import { myFirebase } from "../models/MyFirebase";

export default function CreateProductForm({onAddProduct}){

    const nameRef = useRef();
    const priceRef = useRef();

    const onAddProductHelper = (e) => {

        e.preventDefault();

        // onAddProduct({
        //     name: nameRef.current.value,
        //     price: +priceRef.current.value,
        //     image: "https://via.placeholder.com/150",
        // })
         myFirebase.createProducts({
            id: Math.floor(Math.random() * 100),
            name: nameRef.current.value,
            price: +priceRef.current.value,
            image: "https://via.placeholder.com/150",
        });
    }
    

    return(
        <>
        <h2>Create Product</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input type="text" className="form-control" id="name" ref={nameRef}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input type="number" className="form-control" id="price" ref={priceRef}/>
            </div>

          <button className="btn btn-primary" onClick={onAddProductHelper} >
            Add Product
          </button>
        </form>
         
        </>
    )

}

// CreateProductForm.propTypes = {
//     onAddProduct: PropTypes.object.isRequired,
// };
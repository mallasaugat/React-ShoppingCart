// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, updateDoc, addDoc, getDocs, deleteDoc } from "firebase/firestore";


function MyFirebase(){

    const firebaseConfig = {
        apiKey: "AIzaSyDloA3Xz27NxQEVU9q1CYw5rWeNuaD9fc4",
        authDomain: "shoppingcart-2f67d.firebaseapp.com",
        projectId: "shoppingcart-2f67d",
        storageBucket: "shoppingcart-2f67d.appspot.com",
        messagingSenderId: "119553561636",
        appId: "1:119553561636:web:37889d7a7533b6994c74b1"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      
      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(app);


      const me = {};

      me.getProducts = async () => {
        // Accessing the products collection
        const productsRef = collection(db, "Products");

        // Get all products
        // return await getDocs(productsRef);
        const querySnapshot = await getDocs(productsRef);
        
        return querySnapshot.docs.map((d) => d.data());
        
      }

      me.createProducts = async (productData) => {
        const productsRef = collection(db, "Products");
        await addDoc(productsRef, productData);
    }

      
    me.deleteProduct = async (id) => {
        console.log("Deleting product with ID:", id);
        const productsRef = collection(db, "Products");
    
        
        // Get all documents in the "Products" collection
        const querySnapshot = await getDocs(productsRef);

        // Iterate through each document
        querySnapshot.forEach(async (doc) => {
            // Check if the document's "id" field matches the specified ID
            const data = doc.data();
            if (data.id === id) {
                // If it matches, delete the document
                await deleteDoc(doc.ref);
                console.log("Product deleted successfully!");
            }
        });
        
    }
    
    // Shopping Cart
    me.getCartProducts = async () => {
        // Accessing the products collection
        const cartRef = collection(db, "Cart");

        // Get all products
        // return await getDocs(productsRef);
        const querySnapshot = await getDocs(cartRef);
        
        return querySnapshot.docs.map((d) => d.data());
        
      }

      me.addCartProducts = async (productData) => {
        const cartRef = collection(db, "Cart");
        const querySnapshot = await getDocs(cartRef);
        let present = false;
    
        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            if (data.name === productData.name) {
                present = true;
                productData.count = data.count + 1; // Increment count
                await updateDoc(doc.ref, { count: productData.count }); // Update count in Firestore
                break; // No need to continue searching if the product is found
            }
        }
    
        if (!present) {
            productData.count = 1; // Set count to 1 for new product
            await addDoc(cartRef, productData);
        }
    
        
    }

    me.deleteCartProduct = async (id) => {
        console.log("Deleting product with ID:", id);
        const cartRef = collection(db, "Cart");
    
    

        // Get all documents in the "Products" collection
        const querySnapshot = await getDocs(cartRef);

        // Iterate through each document
        querySnapshot.forEach(async (doc) => {
            // Check if the document's "id" field matches the specified ID
            const data = doc.data();
            if (data.id === id) {
                // If it matches, delete the document
                await deleteDoc(doc.ref);
                console.log("Product deleted successfully!");
            }
        });
        
    }
      

      return me;

}


export const myFirebase = new MyFirebase();
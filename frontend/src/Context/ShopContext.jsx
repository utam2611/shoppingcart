import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null)
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const getDefaultOrder = () => {
    let order = {};
    for (let index = 0; index < 300 + 1; index++) {
        order[index] = 0;
    }
    return order;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([])

    const [cartItems, setCartItems] = useState(getDefaultCart());

    const [orderItem, setOrderItem] = useState(getDefaultOrder());


    useEffect(() => {
        fetch('http://localhost:3010/allproduct')
            .then((res) => res.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3010/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: ""
            }).then((res) => res.json()).then((data) => setCartItems(data))
        }

    }, [])

    const addToCart = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3010/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))

            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        else {
            alert("Please Login")
        }
    }

    const addorder = (itemId) => {
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3010/addorder', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                setOrderItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

                // for(let i=0;i<=itemId.length;i++){

                //     setOrderItem((prev) => ({ ...prev, [itemId[i]]: prev[itemId[i]] + 1 }));
                // }
        }
        else {
            alert("Please Login")
        }
    }



    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3010/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const getTotalOrderItem = () => {
        let totalItem = 0;
        for (const item in orderItem) {
            if (orderItem[item] > 0) {
                totalItem += orderItem[item];
            }
        }
        return totalItem;
    }

    const getCartId = () => {
        let a = [];
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                a[item] = cartItems[item]
              }
        }
        return a;
    }

    const contexValue = { getTotalCartItems,getTotalOrderItem, getTotalCartAmount, all_product, cartItems,orderItem, addToCart, addorder, removeFromCart ,getCartId };
    return (

        <ShopContext.Provider value={contexValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
import Cookies from "js-cookie";

export const addToCart = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/cart/add-to-cart", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getCartItems = async (userId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/cart/all-cart-items/${userId}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteCartItem = async (productId) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/cart/delete-from-cart/${productId}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

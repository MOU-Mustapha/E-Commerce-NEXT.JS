import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/order/create-order", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrders = async (userId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/order/get-all-orders/${userId}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderDetails = async (id) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/order/order-details/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

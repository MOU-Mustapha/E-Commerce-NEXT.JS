import Cookies from "js-cookie";

export const getAllAdminOrders = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/admin/orders/all-orders`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrder = async (id, formData) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`/api/admin/orders/update-order/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

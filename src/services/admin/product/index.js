import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/admin/add-product", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/admin/all-products", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`/api/admin/update-product/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteProduct = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/admin/delete-product/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

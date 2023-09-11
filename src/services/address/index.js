import Cookies from "js-cookie";

export const addNewAddress = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/address/add-new-address", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllAddresses = async (userId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(
      `/api/address/get-all-addresses/${userId}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteAddress = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    const res = await fetch(`/api/address/delete-address/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const updateAddress = async (id, formData) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(`/api/address/update-address/${id}`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

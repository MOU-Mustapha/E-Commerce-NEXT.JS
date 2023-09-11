import Cookies from "js-cookie";

export const callStripeSession = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/stripe", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

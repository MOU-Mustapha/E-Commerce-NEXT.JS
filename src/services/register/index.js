export const registerNewUser = async (formData) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/register", options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};
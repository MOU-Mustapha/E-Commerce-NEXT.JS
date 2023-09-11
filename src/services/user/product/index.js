export const getAllUserProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user/all-products", {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getUserCategoryProducts = async (prodCat) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/user/product-by-category/${prodCat}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getUserProductById = async (prodId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/user/product-by-id/${prodId}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

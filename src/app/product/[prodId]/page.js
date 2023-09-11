import React from "react";
import { getUserProductById } from "../../../services/user/product";
import CommonDetails from "../../../components/CommonDetails/CommonDetails";

const ProductDetails = async ({ params: { prodId } }) => {
  const productDetails = await getUserProductById(prodId);
  return (
    <div>
      <CommonDetails product={productDetails.data} />
    </div>
  );
};

export default ProductDetails;

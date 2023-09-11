import React from "react";
import CommonListing from "../../../../components/CommonListing/CommonListing";
import { getAllUserProducts } from "../../../../services/user/product";

const AllProducts = async () => {
  const allAdminProducts = await getAllUserProducts();
  return (
    <div>
      <CommonListing data={allAdminProducts?.data} />
    </div>
  );
};

export default AllProducts;

import React from "react";
import CommonListing from "../../../../components/CommonListing/CommonListing";
import { getUserCategoryProducts } from "../../../../services/user/product";

const WomenProducts = async () => {
  const allAdminProducts = await getUserCategoryProducts("women");
  return (
    <div>
      <CommonListing data={allAdminProducts?.data} />
    </div>
  );
};

export default WomenProducts;

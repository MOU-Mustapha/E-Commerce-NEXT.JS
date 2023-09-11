import React from "react";
import CommonListing from "../../../../components/CommonListing/CommonListing";
import { getUserCategoryProducts } from "../../../../services/user/product";

const KidsProducts = async () => {
  const allAdminProducts = await getUserCategoryProducts("kids");
  return (
    <div>
      <CommonListing data={allAdminProducts?.data} />
    </div>
  );
};

export default KidsProducts;

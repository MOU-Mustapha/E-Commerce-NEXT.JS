import React from "react";
import CommonListing from "../../../../components/CommonListing/CommonListing";
import { getUserCategoryProducts } from "../../../../services/user/product";

const MenProducts = async () => {
  const allAdminProducts = await getUserCategoryProducts("men");
  return (
    <div>
      <CommonListing data={allAdminProducts?.data} />
    </div>
  );
};

export default MenProducts;

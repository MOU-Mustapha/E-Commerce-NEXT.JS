import React from "react";
import CommonListing from "../../../components/CommonListing/CommonListing";
import { getAllAdminProducts } from "../../../services/admin/product";

const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts();
  return (
    <div>
      <CommonListing data={allAdminProducts?.data} />
    </div>
  );
};

export default AdminAllProducts;

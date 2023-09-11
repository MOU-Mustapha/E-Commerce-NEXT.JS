"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { GlobalContext } from "../../../context/context";
import { deleteProduct } from "../../../services/admin/product";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../../Loader/ComponentLevel";
import { addToCart } from "../../../services/cart";

const ProductButtons = ({ item }) => {
  const {
    componentLoader,
    setComponentLoader,
    setCurrentUpdatedProduct,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const pathname = usePathname();
  const isAdminView = pathname.includes("/admin-view");
  const router = useRouter();
  const handleDelete = async (id) => {
    setComponentLoader({ loading: true, id: id });
    const res = await deleteProduct(id);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      router.refresh();
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message);
    }
  };
  const handleClick = () => {
    setCurrentUpdatedProduct(item);
    router.push("/admin-view/update-product");
  };
  const handleAddToCart = async (item) => {
    setComponentLoader({ loading: true, id: item._id });
    const res = await addToCart({
      userId: user._id,
      productId: item._id,
    });
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      setShowCartModal(true);
    } else {
      setComponentLoader({ loading: true, id: "" });
      toast.error(res.message);
      setShowCartModal(true);
    }
  };
  return (
    <div>
      {isAdminView ? (
        <div className="flex flex-col">
          <button
            onClick={handleClick}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(item?._id)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            {componentLoader.loading && item._id === componentLoader.id ? (
              <ComponentLevelLoader
                text="Deleting Product"
                loading={componentLoader.loading}
                color="#fff"
              />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => handleAddToCart(item)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            {componentLoader.loading && item._id === componentLoader.id ? (
              <ComponentLevelLoader
                text="Adding To Cart"
                loading={componentLoader.loading}
                color="#fff"
              />
            ) : (
              "Add To Cart"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductButtons;

"use client";
import React, { useContext, useEffect, useState } from "react";
import Tile from "../../../components/FormElements/Tile/Tile";
import {
  AvailableSizes,
  adminAddProductFormControls,
  firebaseConfig,
  firebaseStorageURL,
} from "../../../utils";
import Input from "../../../components/FormElements/Input/Input";
import Select from "../../../components/FormElements/Select/Select";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProduct } from "../../../services/admin/product/index";
import { GlobalContext } from "../../../context/context";
import Notification from "../../../components/Notification";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../../../components/Loader/ComponentLevel";
import { useRouter } from "next/navigation";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const helperForUploadingImageToFirebase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);
  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => {
            resolve(url);
          })
          .catch((err) => reject(err));
      }
    );
  });
};

const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const AdminAddProduct = () => {
  const [formData, setFormData] = useState(initialFormData);
  const {
    componentLoader,
    setComponentLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);
  const handleImage = async (e) => {
    const extractImageUrl = await helperForUploadingImageToFirebase(
      e.target.files[0]
    );
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  };
  useEffect(() => {
    if (currentUpdatedProduct !== null) {
      setFormData(currentUpdatedProduct);
    }
  }, [currentUpdatedProduct]);
  const handleTileClick = (currentItem) => {
    let selectedSizes = [...formData.sizes];
    const index = selectedSizes.findIndex((item) => item.id === currentItem.id);
    if (index === -1) {
      selectedSizes.push(currentItem);
    } else {
      selectedSizes = selectedSizes.filter(
        (item) => item.id !== currentItem.id
      );
    }
    setFormData({
      ...formData,
      sizes: selectedSizes,
    });
  };
  const router = useRouter();
  const handleUpdateProduct = async () => {
    setComponentLoader({ loading: true, id: "" });
    const res = await updateProduct(formData._id, formData);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message);
    }
  };
  return (
    <div className="w-full mt-5 mx-0 mb-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mx-0 mb-0 space-y-8">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
            defaultValue={formData.imageUrl}
          />
          <div className="flex gap-2 flex-col">
            <label>Available Sizes</label>
            <Tile
              selected={formData?.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            />
          </div>
          {adminAddProductFormControls.map((item) =>
            item.componentType === "input" ? (
              <Input
                key={item.id}
                type={item.type}
                placeholder={item.placeholder}
                label={item.label}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [item.id]: e.target.value,
                  });
                }}
                value={formData[item.id]}
              />
            ) : item.componentType === "select" ? (
              <Select
                key={item.id}
                label={item.label}
                options={item.options}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [item.id]: e.target.value,
                  });
                }}
                value={formData[item.id]}
              />
            ) : null
          )}
          <button
            onClick={handleUpdateProduct}
            className="w-full inline-flex items-center justify-center bg-black text-white px-6 py-4 font-medium uppercase tracking-wide"
          >
            {componentLoader.loading ? (
              <ComponentLevelLoader
                text="Updating Product"
                loading={componentLoader.loading}
                color="#fff"
              />
            ) : (
              "Update Product"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default AdminAddProduct;

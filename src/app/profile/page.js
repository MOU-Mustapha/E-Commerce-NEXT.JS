"use client";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context";
import { addNewAddressFormControls } from "../../utils";
import Input from "../../components/FormElements/Input/Input";
import {
  addNewAddress,
  deleteAddress,
  getAllAddresses,
  updateAddress,
} from "../../services/address";
import ComponentLevelLoader from "../../components/Loader/ComponentLevel";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import { PulseLoader } from "react-spinners";
import Link from "next/link";

const ProfilePage = () => {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLoader,
    setComponentLoader,
    pageLoader,
    setPageLoader,
  } = useContext(GlobalContext);
  const [showForm, setShowForm] = useState(false);
  const [currentAddressId, setCurrentAddressID] = useState(null);
  const handleAddOrUpdateAddress = async () => {
    setComponentLoader({ loading: true, id: "" });
    const res = currentAddressId
      ? await updateAddress(currentAddressId, { ...addressFormData })
      : await addNewAddress({ ...addressFormData, userId: user._id });
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      setAddressFormData({
        fullName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
      });
      allAddresses();
      setCurrentAddressID(null);
      setShowForm(false);
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message);
    }
  };
  const allAddresses = async () => {
    setPageLoader(true);
    const res = await getAllAddresses(user._id);
    if (res.success) {
      setAddresses(res.data);
      setPageLoader(false);
    }
  };
  useEffect(() => {
    if (user) {
      allAddresses();
    }
  }, [user]);
  const handleUpdate = async (currentAddress) => {
    setAddressFormData({
      fullName: currentAddress.fullName,
      address: currentAddress.address,
      city: currentAddress.city,
      country: currentAddress.country,
      postalCode: currentAddress.postalCode,
    });
    setCurrentAddressID(currentAddress._id);
    setShowForm(true);
  };
  const handleDelete = async (address) => {
    setComponentLoader({ loading: true, id: address._id });
    const res = await deleteAddress(address._id);
    if (res.success) {
      setComponentLoader({ loading: false, id: "" });
      toast.success(res.message);
      allAddresses();
    } else {
      setComponentLoader({ loading: false, id: "" });
      toast.error(res.message);
    }
  };
  return (
    <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8 w-full min-h-screen">
      <div className="bg-white shadow my-12">
        <div className="p-6 sm:p-12">
          <div className="flex items-center gap-4">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <img
                src="/images/photo.png"
                alt="profile-photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="md:text-left">
                <span className="inline-block w-14">Name: </span>
                <span className="text-lg font-semibold text-center">
                  {user?.name}
                </span>
              </h4>
              <h4 className="md:text-left">
                <span className="inline-block w-14">Email: </span>
                <span className="text-lg font-semibold text-center">
                  {user?.email}
                </span>
              </h4>
              <h4 className="md:text-left">
                <span className="inline-block w-14">Role: </span>
                <span className="text-lg font-semibold text-center">
                  {user?.role}
                </span>
              </h4>
            </div>
          </div>
          <Link
            href="/orders"
            className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
          >
            View Your Orders
          </Link>
          <div className="mt-6">
            <h1 className="font-bold text-lg">Your Addresses:</h1>
            {pageLoader ? (
              <div className="flex justify-center items-center">
                <PulseLoader color="#000" loading={pageLoader} size={10} />
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {addresses && addresses.length ? (
                  addresses.map((address) => (
                    <div className="border p-6" key={address._id}>
                      <p>Name: {address.fullName}</p>
                      <p>City: {address.city}</p>
                      <p>Country: {address.country}</p>
                      <p>Postal Code: {address.postalCode}</p>
                      <p>Address: {address.address}</p>
                      <button
                        onClick={() => handleUpdate(address)}
                        className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(address)}
                        className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
                      >
                        {componentLoader.loading &&
                        componentLoader.id === address._id ? (
                          <ComponentLevelLoader
                            text="Deleting"
                            color="#fff"
                            loading={componentLoader.loading}
                          />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No Addresses Found...! Please Add New Address Below</p>
                )}
              </div>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
            >
              {showForm ? "Hide Address Form" : "Add New Address"}
            </button>
          </div>
          {showForm && (
            <div className="flex flex-col mt-5 justify-center items-center pt-4">
              <div className="w-full mt-6 mx-0 mb-0 space-y-8">
                {addNewAddressFormControls.map((item) => (
                  <Input
                    key={item.id}
                    type={item.type}
                    placeholder={item.placeholder}
                    label={item.label}
                    value={addressFormData[item.id]}
                    onChange={(e) =>
                      setAddressFormData({
                        ...addressFormData,
                        [item.id]: e.target.value,
                      })
                    }
                  />
                ))}
              </div>
              <button
                onClick={handleAddOrUpdateAddress}
                className="mt-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide text-center disabled:opacity-50"
              >
                {componentLoader.loading ? (
                  <ComponentLevelLoader
                    text="Saving"
                    loading={componentLoader.loading}
                    color="#fff"
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default ProfilePage;

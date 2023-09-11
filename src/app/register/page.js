"use client";
import Input from "../../components/FormElements/Input/Input";
import Select from "../../components/FormElements/Select/Select";
import { registerNewUser } from "../../services/register";
import { registrationFormControls } from "../../utils";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/context";
import Notification from "../../components/Notification";
import Link from "next/link";
import ComponentLevelLoader from "../../components/Loader/ComponentLevel/index";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

const RegisterPage = () => {
  const { componentLoader, setComponentLoader, isAuthUser } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const formValidation = () => {
    if (
      formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleRegister = async () => {
    setComponentLoader({ loading: true, id: "" });
    const data = await registerNewUser(formData);
    if (data.success) {
      toast.success(data.message);
      setIsRegistered(true);
      setComponentLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    } else {
      toast.error(data.message);
      setComponentLoader({ loading: false, id: "" });
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (isAuthUser) {
      router.push("/");
    }
  }, [isAuthUser]);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-4 mx-auto xl:px-5">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-10 mx-0 mb-0 realtive max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successful"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-4"
                >
                  Login
                </Link>
              ) : (
                <div className="w-full mt-6 mx-0 mb-0 realtive space-y-8">
                  {registrationFormControls.map((item) =>
                    item.componentType === "input" ? (
                      <Input
                        key={item.id}
                        type={item.type}
                        placeholder={item.placeholder}
                        label={item.label}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [item.id]: e.target.value,
                          })
                        }
                        value={formData[item.id]}
                      />
                    ) : item.componentType === "select" ? (
                      <Select
                        key={item.id}
                        options={item.options}
                        label={item.label}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [item.id]: e.target.value,
                          })
                        }
                        value={formData[item.id]}
                      />
                    ) : null
                  )}
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-4 disabled:opacity-50"
                    disabled={!formValidation()}
                    onClick={handleRegister}
                  >
                    {componentLoader.loading ? (
                      <ComponentLevelLoader
                        text="Registering"
                        loading={componentLoader.loading}
                        color="#fff"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default RegisterPage;

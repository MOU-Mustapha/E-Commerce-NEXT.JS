"use client";
import Input from "../../components/FormElements/Input/Input";
import { loginFormControls } from "../../utils";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { login } from "./../../services/login/index";
import { GlobalContext } from "../../context/context";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../../components/Loader/ComponentLevel";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";

const initialFormData = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const {
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    componentLoader,
    setComponentLoader,
  } = useContext(GlobalContext);
  const [formData, setFormData] = useState(initialFormData);
  const formValidation = () => {
    if (
      formData &&
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
  const handleLogin = async () => {
    setComponentLoader({ loading: true, id: "" });
    const data = await login(formData);
    if (data.success) {
      toast.success(data.message);
      setIsAuthUser(true);
      setUser(data?.data?.user);
      setFormData(initialFormData);
      Cookies.set("token", data?.data?.token);
      localStorage.setItem("user", JSON.stringify(data?.data?.user));
      setComponentLoader({ loading: false, id: "" });
    } else {
      toast.error(data.message);
      setIsAuthUser(false);
      setComponentLoader({ loading: false, id: "" });
    }
  };
  useEffect(() => {
    if (isAuthUser) {
      router.push("/");
    }
  }, [isAuthUser]);
  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between py-0 px-10 mt-4 mx-auto xl:px-5">
        <div className="flex flex-col justify-center items-center w-full px-10 lg:flex-row">
          <div className="w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              <div className="w-full mt-6 mx-0 mb-0 relative space-y-8">
                {loginFormControls.map((item) =>
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
                  ) : null
                )}
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide mt-4 disabled:opacity-50"
                  disabled={!formValidation()}
                  onClick={handleLogin}
                >
                  {componentLoader.loading ? (
                    <ComponentLevelLoader
                      text="Logging in"
                      color="#fff"
                      loading={componentLoader.loading}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-1">
                  <p>New to website?</p>
                  <Link
                    href="/register"
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default LoginPage;

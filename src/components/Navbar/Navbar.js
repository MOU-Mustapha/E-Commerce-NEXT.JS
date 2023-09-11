"use client";
import { GlobalContext } from "../../context/context";
import { adminNavOptions, navOptions } from "../../utils";
import React, { useContext, useEffect } from "react";
import CommonModal from "../CommonModal/CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartModal from "../CartModal/CartModal";

const Navbar = () => {
  const router = useRouter();
  const {
    showNavModal,
    setShowNavModal,
    isAuthUser,
    setIsAuthUser,
    user,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };
  const pathname = usePathname();
  const isAdminView = pathname.includes("/admin-view") ? true : false;
  useEffect(() => {
    if (
      pathname !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathname]);
  return (
    <>
      {" "}
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center cursor-pointer">
            <Link
              href="/"
              className="self-center text-2xl font-semibold whitespace-nowrap"
            >
              <img
                src="/images/H&M-logo.svg.png"
                alt="logo"
                className="w-16 ml-5"
              />
            </Link>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <>
                <Link href="/profile" className="btn">
                  Profile
                </Link>
                <button
                  onClick={() => setShowCartModal(!showCartModal)}
                  className="btn"
                >
                  Cart
                </button>
              </>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <Link href="/" className="btn">
                  Client View
                </Link>
              ) : (
                <Link href="/admin-view" className="btn">
                  Admin View
                </Link>
              )
            ) : null}
            {isAuthUser ? (
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            ) : (
              <Link href="/login" className="btn">
                Login
              </Link>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={<NavItems isModalView={true} />}
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;

const NavItems = ({ isModalView = false, isAdminView }) => {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
        {isAdminView
          ? adminNavOptions.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              >
                {item.label}
              </Link>
            ))
          : navOptions.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
              >
                {item.label}
              </Link>
            ))}
      </ul>
    </div>
  );
};

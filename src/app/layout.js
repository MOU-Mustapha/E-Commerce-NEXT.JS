import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar/Navbar";
import GlobalState from "../context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce",
  description: "Generated by NEXT.JS",
  icons: {
    icon: "/shopping.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex min-h-screen flex-col mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Sidebar from "./module/Sidebar";
import useInvoiceStore from "@/store/invoiceStore";
import CompanyDetails from "./module/CompanyDetails";
import Customer from "./module/Customer";
import ProductDetails from "./module/ProductDetails";
import PaymentDetails from "./module/PaymentDetails";
import DisplayInvoice from "./module/DisplayInvoice";
import { motion } from "framer-motion";

export default function Home() {
  const { activeTab } = useInvoiceStore();

  return (
    <div className="flex fixed overflow-y-auto overflow-x-hidden">
      <div className=" ">
        <Sidebar />
      </div>
      <div className="ml-[6vw] w-[40vw] h-screen  z-[10] border-r border-gray-200 fixed  top-0 ">
        {activeTab === "company-details" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <CompanyDetails />
          </motion.div>
        )}
        {activeTab === "customer" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <Customer />
          </motion.div>
        )}
        {activeTab === "product-details" && <ProductDetails />}
        {activeTab === "payment-details" && <PaymentDetails />}
      </div>
      <div className=" fixed right-0 top-0 min-w-[54vw]  bg-gray-200 ">
        <DisplayInvoice />
      </div>
    </div>
  );
}

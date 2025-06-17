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
      <div className="  z-[50]">
        <Sidebar />
      </div>
      <div className="ml-[6vw] w-[40vw] h-screen  z-[10] border-r border-gray-200 fixed  top-0 ">
        {activeTab === "company-details" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
          >
            <CompanyDetails />
          </motion.div>
        )}
        {activeTab === "customer" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
          >
            <Customer />
          </motion.div>
        )}
        {activeTab === "product-details" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
          >
            <ProductDetails />
          </motion.div>
        )}
        {activeTab === "payment-details" && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
          >
            <PaymentDetails />
          </motion.div>
        )}
      </div>
      <div className=" fixed right-0 top-0 min-w-[54vw]  bg-gray-200 z-[50]">
        <DisplayInvoice />
      </div>
    </div>
  );
}

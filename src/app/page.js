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

export default function Home() {
  const { activeTab, companyDetails } = useInvoiceStore();

  return (
    <div className="flex">
      <Sidebar />
      <div className=" w-[40vw] h-screen   border-r border-gray-200">
        {activeTab === "company-details" && <CompanyDetails />}
        {activeTab === "customer" && <Customer />}
        {activeTab === "product-details" && <ProductDetails />}
        {activeTab === "payment-details" && <PaymentDetails />}
      </div>
      <div className="min-w-[55vw] h-screen bg-red-100">
        <DisplayInvoice />
      </div>
    </div>
  );
}

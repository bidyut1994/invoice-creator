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
    <div className="flex fixed overflow-y-auto overflow-x-hidden">
      <div className=" ">
        <Sidebar />
      </div>
      <div className="ml-[6vw] w-[40vw] h-screen   border-r border-gray-200 fixed  top-0 ">
        {activeTab === "company-details" && <CompanyDetails />}
        {activeTab === "customer" && <Customer />}
        {activeTab === "product-details" && <ProductDetails />}
        {activeTab === "payment-details" && <PaymentDetails />}
      </div>
      <div className=" fixed right-0 top-0 min-w-[54vw]  bg-gray-200 ">
        <DisplayInvoice />
      </div>
    </div>
  );
}

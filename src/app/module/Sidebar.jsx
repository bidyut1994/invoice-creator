"use client";

import React, { useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";
import { FaList } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import useInvoiceStore from "@/store/invoiceStore";
import { MdDone } from "react-icons/md";

const SidebarItems = [
  {
    name: "Company Details",
    icon: <BsBuildings />,
    key: "company-details",
  },
  {
    name: "Customer",
    icon: <FaBuildingUser />,
    key: "customer",
  },
  {
    name: "Product Details",
    icon: <FaList />,
    key: "product-details",
  },
  {
    name: "Payment Details",
    icon: <MdOutlinePayments />,
    key: "payment-details",
  },
];

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    companyDetailsTab,
    customerDetailsTab,
    productDetailsTab,
    paymentDetailsTab,
  } = useInvoiceStore();

  return (
    <div className="w-[6vw] pt-5 z-[100] border-r border-[#38bdf8]  h-screen bg-[#e0f2fe] px-auto py-auto">
      <div className="flex flex-col gap-4 items-center justify-center ">
        <div className="flex flex-col gap-2">
          <img src="/assets/icon.svg" alt="logo" className="w-12 h-12" />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-20 px-2">
        <button
          type="button"
          className={`flex h-[90px] items-center justify-center w-full flex-col gap-2 cursor-pointer relative p-3 ${
            activeTab === "company-details"
              ? "bg-[#7dd3fc]"
              : " hover:bg-[#bae6fd]"
          }  ${
            companyDetailsTab?.completed
              ? "text-green-700 border rounded-md border-green-500 "
              : "text-[#075985]"
          }`}
          onClick={() => setActiveTab("company-details")}
        >
          <div className="text-2xl flex justify-center items-center ">
            <BsBuildings />
          </div>
          <p className="text-center text-xs px-1 capitalize">Company Details</p>
          {companyDetailsTab?.completed && (
            <div className="text-xs text-green-200 p-1 bg-green-500 rounded-full absolute -top-1.5 -right-1.5">
              <MdDone />
            </div>
          )}
        </button>
        <button
          type="button"
          className={`flex h-24 items-center rounded-md justify-center w-full flex-col gap-2 cursor-pointer relative p-3 ${
            activeTab === "customer"
              ? "border border-[#075985]  bg-[#bae6fd]"
              : " hover:bg-[#bae6fd]"
          } ${
            customerDetailsTab?.completed
              ? "text-green-700 border rounded-md border-green-500 "
              : "text-[#075985]"
          }`}
          onClick={() => customerDetailsTab?.active && setActiveTab("customer")}
        >
          <div className="text-2xl flex justify-center items-center  ">
            <FaBuildingUser />
          </div>
          <p className="text-center text-xs px-1 capitalize">Customer</p>{" "}
          {customerDetailsTab?.completed && (
            <div className="text-xs text-green-200 p-1 bg-green-500 rounded-full absolute -top-1.5 -right-1.5">
              <MdDone />
            </div>
          )}
        </button>
        <button
          type="button"
          className={`flex h-24 items-center justify-center rounded-md w-full flex-col gap-2 cursor-pointer relative p-3 ${
            activeTab === "product-details"
              ? "border border-[#075985] rounded-md bg-[#bae6fd]"
              : " hover:bg-[#bae6fd]"
          } ${
            productDetailsTab?.completed
              ? "text-green-700 border rounded-md border-green-500 "
              : "text-[#075985]"
          }`}
          onClick={() =>
            productDetailsTab?.active && setActiveTab("product-details")
          }
        >
          <div className="text-2xl flex justify-center items-center  ">
            <FaList />
          </div>
          <p className="text-center text-xs px-1 capitalize">Product Details</p>{" "}
          {productDetailsTab?.completed && (
            <div className="text-xs text-green-200 p-1 bg-green-500 rounded-full absolute -top-1.5 -right-1.5">
              <MdDone />
            </div>
          )}
        </button>
        <button
          type="button"
          className={`flex h-24 items-center justify-center rounded-md w-full flex-col gap-2 cursor-pointer relative p-3 ${
            activeTab === "payment-details"
              ? "border border-[#075985] rounded-md bg-[#bae6fd]"
              : " hover:bg-[#bae6fd] "
          } ${
            paymentDetailsTab?.completed
              ? "text-green-700 border rounded-md border-green-500 "
              : "text-[#075985]"
          }`}
          onClick={() =>
            paymentDetailsTab?.active && setActiveTab("payment-details")
          }
        >
          <div className="text-2xl flex justify-center items-center  ">
            <MdOutlinePayments />
          </div>
          <p className="text-center text-xs px-1 capitalize">Payment Details</p>{" "}
          {paymentDetailsTab?.completed && (
            <div className="text-xs text-green-200 p-1 bg-green-500 rounded-full absolute -top-1.5 -right-1.5">
              <MdDone />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

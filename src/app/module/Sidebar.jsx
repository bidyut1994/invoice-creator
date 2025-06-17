"use client";

import React, { useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";
import { FaList } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import useInvoiceStore from "@/store/invoiceStore";

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
  const { activeTab, setActiveTab } = useInvoiceStore();

  return (
    <div className="w-[6vw] pt-5 z-[100] border-r border-[#38bdf8]  h-screen bg-[#e0f2fe] px-auto py-auto">
      <div className="flex flex-col gap-4 items-center justify-center ">
        <div className="flex flex-col gap-2">
          <img src="/assets/icon.svg" alt="logo" className="w-12 h-12" />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center justify-center mt-20 px-2">
        {SidebarItems.map((item) => (
          <button
            type="button"
            key={item.key}
            className={`flex h-24 items-center justify-center w-full flex-col gap-2 cursor-pointer p-3 ${
              activeTab === item.key ? "bg-[#7dd3fc]" : " hover:bg-[#bae6fd]"
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            <div className="text-2xl flex justify-center items-center text-[#075985]">
              {item.icon}
            </div>
            <p className="text-center text-xs px-1 capitalize">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

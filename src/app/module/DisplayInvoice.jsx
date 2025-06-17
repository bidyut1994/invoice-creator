"use client";

import React from "react";
import useInvoiceStore from "@/store/invoiceStore";
import Image from "next/image";

export default function DisplayInvoice() {
  const {
    companyDetails,
    customerDetails,
    setActiveTab,
    invoiceDetails,
    items,
  } = useInvoiceStore();

  return (
    <div className="py-6 px-20  h-[100vh] overflow-y-auto overflow-x-hidden">
      {/* invoice details start */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200  min-h-[90vh]  p-10">
        <div className="border-b border-gray-200 pb-5 flex justify-between  ">
          <div>
            <h1 className="text-[32px] font-bold text-gray-500">INVOICE</h1>
            <p className="text-gray-500 text-sm">
              Invoice Date: {invoiceDetails?.issueDate}
            </p>
            <p className="text-gray-500 text-sm">
              Invoice Number: {invoiceDetails?.invoiceNumber}
            </p>
          </div>
          <div className=" ">
            <h1 className="text-2xl font-bold text-gray-900 capitalize text-right mb-1">
              {companyDetails?.name || "Company Name"}
            </h1>

            {companyDetails?.city ? (
              <div className="flex flex-col  text-xs">
                <p className="text-gray-600 text-right capitalize">
                  {companyDetails?.address || "Company Address"}
                </p>
                <p className="text-gray-600 text-right capitalize">
                  {companyDetails?.city || "City"},{" "}
                  {companyDetails?.state || "State"}-
                  {companyDetails?.zip || "Zip"}{" "}
                  {companyDetails?.country || "Country"}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600  text-right capitalize  text-xs">
                  Company Address
                </p>{" "}
                <p className="text-gray-600 text-right capitalize">
                  {companyDetails?.city || "City"},{" "}
                  {companyDetails?.state || "State"}-
                  {companyDetails?.zip || "100000"}{" "}
                  {companyDetails?.country || "Country"}
                </p>
              </div>
            )}
            {companyDetails?.companyEmail && (
              <p className="text-gray-600 text-right  text-xs">
                {companyDetails?.companyEmail}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-gray-500 text-sm pb-2 underline">Bill To : </p>
          <p className="text-gray-700 text-sm font-bold capitalize">
            {customerDetails?.customerName || "Customer Details"}
          </p>
          {customerDetails?.customerAddress ? (
            <div>
              <p className="text-gray-700 text-xs pt-1  not-only: capitalize">
                {customerDetails?.customerAddress || "Customer Address"}{" "}
                {customerDetails?.customerCity && customerDetails?.customerCity}
                ,{" "}
                {customerDetails?.customerState &&
                  customerDetails?.customerState}
                -{customerDetails?.customerZip && customerDetails?.customerZip}{" "}
                {customerDetails?.customerCountry &&
                  customerDetails?.customerCountry}
              </p>
              {customerDetails?.customerEmail && (
                <p className="text-gray-700 text-xs    ">
                  {customerDetails?.customerEmail}
                </p>
              )}
            </div>
          ) : (
            <div className="text-gray-700 text-xs  not-only: capitalize">
              <p className="text-gray-700 text-xs  not-only: capitalize">
                Address City, State , Zip, Country
              </p>
              {customerDetails?.customerEmail && (
                <p className="text-gray-700 text-sm    ">
                  {customerDetails?.customerEmail}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="bg-white  my-8 overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 bg-gray-100 z-10 text-xs">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">
                  Product Name
                </th>
                <th className="text-right px-4 py-2 font-semibold">Quantity</th>
                <th className="text-right px-4 py-2 font-semibold">Price</th>
                <th className="text-right px-4 py-2 font-semibold">Total</th>
              </tr>
            </thead>

            <tbody>
              {items?.map((item, index) => {
                const price = Number(item?.price || 0);
                const quantity = Number(item?.quantity || 0);
                const total = price * quantity;

                return (
                  <tr
                    key={index}
                    className="bg-gray-50 border-b border-gray-200 text-xs"
                  >
                    <td className="capitalize py-2 pl-4">{item?.name}</td>
                    <td className="text-right px-4 py-2">{quantity}</td>
                    <td className="text-right px-4 py-2">
                      {price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="text-right px-4 py-2 rounded-r-lg">
                      {total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="text-center py-10 text-xs w-full bg-gray-50">
              No items added
            </div>
          )}{" "}
        </div>
      </div>{" "}
      {/* invoice details end*/}
    </div>
  );
}

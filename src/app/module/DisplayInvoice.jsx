"use client";

import React from "react";
import useInvoiceStore from "@/store/invoiceStore";
import Image from "next/image";

export default function DisplayInvoice() {
  const { companyDetails, setActiveTab, invoiceDetails } = useInvoiceStore();

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
              <div className="flex flex-col  ">
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
                <p className="text-gray-600  text-right capitalize">
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
              <p className="text-gray-600 text-right">
                {companyDetails?.companyEmail}
              </p>
            )}
          </div>
        </div>
      </div>{" "}
      {/* invoice details end*/}
    </div>
  );
}

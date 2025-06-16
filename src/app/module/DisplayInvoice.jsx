"use client";

import React from "react";
import useInvoiceStore from "@/store/invoiceStore";
import Image from "next/image";

export default function DisplayInvoice() {
  const { companyDetails } = useInvoiceStore();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Company Header with Logo */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {companyDetails?.name}
            </h1>
            <p className="text-gray-600">{companyDetails?.address}</p>
            <p className="text-gray-600">
              {companyDetails?.city}, {companyDetails?.state}{" "}
              {companyDetails?.zip}
            </p>
            <p className="text-gray-600">{companyDetails?.country}</p>
          </div>
          {companyDetails?.companyLogoUrl && (
            <div className="relative w-32 h-32">
              <Image
                src={companyDetails?.companyLogoUrl}
                alt="Company Logo"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-900">{companyDetails?.companyEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-gray-900">{companyDetails?.companyPhone}</p>
            </div>
            {companyDetails?.companyWebsite && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Website</p>
                <a
                  href={companyDetails?.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {companyDetails?.companyWebsite}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-sm text-gray-500">
          <p>This information will be displayed on your invoices.</p>
        </div>
      </div>
    </div>
  );
}

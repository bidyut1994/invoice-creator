"use client";

import React, { useMemo, useRef } from "react";
import useInvoiceStore from "@/store/invoiceStore";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DisplayInvoice() {
  const {
    companyDetails,
    customerDetails,
    setActiveTab,
    invoiceDetails,
    items,
    discountRate,
    taxRate,
    subtotal,
    total,
  } = useInvoiceStore();
  console.log("items--from display-invoice ", items);

  const computedTotal = useMemo(() => {
    const tax = (subtotal * (Number(taxRate) || 0)) / 100;
    const discount = (subtotal * (Number(discountRate) || 0)) / 100;
    return subtotal + tax - discount;
  }, [subtotal, taxRate, discountRate]);

  const invoiceRef = useRef();

  const handleDownloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;
    const a4Width = 595.28; // pt
    const a4Height = 841.89; // pt
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    let position = 0;
    // If content is longer than one page, add pages
    if (imgHeight < a4Height) {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= a4Height;
        position -= a4Height;
        if (heightLeft > 0) pdf.addPage();
      }
    }
    pdf.save("invoice.pdf");
  };

  return (
    <div className="py-6 px-20  h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <button
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-blue-600 cursor-pointer  text-white rounded hover:bg-blue-700 absolute top-0 right-0 z-10"
      >
        Download PDF
      </button>
      {/* invoice details start */}
      <div
        ref={invoiceRef}
        className="bg-white rounded-lg shadow-lg border border-gray-200  min-h-[90vh]  p-10"
      >
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
          )}

          {/* Summary Section */}
          <div className="grid grid-cols-2 gap-y-2 mt-16 pr-4 w-full max-w-md ml-auto">
            <div className="text-sm font-semibold text-right">Subtotal:</div>
            <div className="text-sm text-right">
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
            <div className="text-sm font-semibold text-right">Tax Rate:</div>
            <div className="text-sm text-right">{taxRate}%</div>
            <div className="text-sm font-semibold text-right">
              Discount Rate:
            </div>
            <div className="text-sm text-right">{discountRate}%</div>
            <div className="col-span-2 border-t pt-2 mt-2"></div>
            <div className="text-lg font-bold text-right">Total:</div>
            <div className="text-xl font-bold text-right">
              {computedTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* invoice details end*/}
    </div>
  );
}

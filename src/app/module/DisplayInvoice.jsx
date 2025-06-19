"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import useInvoiceStore from "@/store/invoiceStore";
import { RiFileDownloadLine } from "react-icons/ri";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function generateInvoiceNumber() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function DisplayInvoice() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-[#e5e7eb] animate-spin dark:text-[#4b5563] fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      ) : (
        <ViewInvoice />
      )}
    </div>
  );
}

function ViewInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
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
    productDetailsTab,
  } = useInvoiceStore();
  console.log("items--from display-invoice ", items);

  useEffect(() => {
    const invoiceNumber = generateInvoiceNumber();

    setInvoiceNumber(`IN${invoiceNumber}`);
  }, []);
  const computedTotal = useMemo(() => {
    const tax = (subtotal * (Number(taxRate) || 0)) / 100;
    const discount = (subtotal * (Number(discountRate) || 0)) / 100;
    return subtotal + tax - discount;
  }, [subtotal, taxRate, discountRate]);

  const invoiceRef = useRef();

  const handleDownloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;
    const a4Width = 595.28;
    const a4Height = 841.89;
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
    pdf.save(`${invoiceNumber}.pdf`);
  };

  return (
    <div>
      <div className=" md:px-20 h-[100vh] overflow-y-auto overflow-x-hidden bg-[#f3f4f6]">
        {productDetailsTab?.completed && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: "10px 20px",
              }}
              className=" flex items-center gap-2  bg-[#2563eb] cursor-pointer  text-white rounded hover:bg-[#1d4ed8]   z-10"
            >
              <p className="text-sm font-semibold"> Download Invoice</p>
              <RiFileDownloadLine />
            </button>
          </div>
        )}
        <div className=" rounded-sm shadow-md border border-[#e0e0e0] relative -top-16  scale-80">
          <div
            ref={invoiceRef}
            className="bg-[#fff] min-h-[850px] p-16 relative"
          >
            <div className="border-b border-[#e0e0e0] flex justify-between bg-[#fff] pb-[12px]">
              <div>
                <p className="text-[32px] font-bold text-[#6b7280] mb-1">
                  INVOICE
                </p>
                <p className="text-[#6b7280] text-[12px] mb-0">
                  Invoice Date: {invoiceDetails?.issueDate}
                </p>
                <p className="text-[#6b7280] text-[12px]  ">
                  Invoice Number: {invoiceNumber}
                </p>
              </div>
              <div className=" ">
                <h1 className="text-[20px] font-bold text-[#111827] capitalize text-right mt-1 mb-1 bg-[#fff]">
                  {companyDetails?.name || "Company Name"}
                </h1>

                {companyDetails?.city ? (
                  <div className="flex flex-col  text-[12px]">
                    <p className="text-[#4b5563] text-right capitalize mb-0">
                      {companyDetails?.address || "Company Address"}
                    </p>
                    <p className="text-[#4b5563] text-right capitalize mb-0">
                      {companyDetails?.city || "City"},{" "}
                      {companyDetails?.state || "State"}-
                      {companyDetails?.zip || "Zip"}{" "}
                      {companyDetails?.country || "Country"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#4b5563]  text-right capitalize  text-[12px] mb-0">
                      Company Address
                    </p>{" "}
                    <p className="text-[#4b5563] text-right text-[12px] capitalize">
                      {companyDetails?.city || "City"},{" "}
                      {companyDetails?.state || "State"}-
                      {companyDetails?.zip || "100000"}{" "}
                      {companyDetails?.country || "Country"}
                    </p>
                  </div>
                )}

                {companyDetails?.companyEmail && (
                  <p className="text-[#4b5563] text-right  text-[12px] mb-0">
                    {companyDetails?.companyEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-[16px]">
              <p className="text-[#6b7280] text-[12px]  mb-[5px]  ">
                Bill To :{" "}
              </p>
              <p className="text-[#111827] text-[12px] font-bold capitalize mb-0">
                {customerDetails?.customerName || "Customer Details"}
              </p>
              {customerDetails?.customerAddress ? (
                <div>
                  <p className="text-[#111827] text-[12px] pt-1  not-only: capitalize mb-0">
                    {customerDetails?.customerAddress || "Customer Address"}{" "}
                    {customerDetails?.customerCity &&
                      customerDetails?.customerCity}
                    ,{" "}
                    {customerDetails?.customerState &&
                      customerDetails?.customerState}
                    -
                    {customerDetails?.customerZip &&
                      customerDetails?.customerZip}{" "}
                    {customerDetails?.customerCountry &&
                      customerDetails?.customerCountry}
                  </p>
                  {customerDetails?.customerEmail && (
                    <p className="text-[#111827] text-[12px] mb-[10px]">
                      {customerDetails?.customerEmail}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-[#111827] text-[12px]  not-only: capitalize">
                  <p className="text-[#111827] text-[12px]  not-only: capitalize mb-0">
                    Address City, State , Zip, Country
                  </p>
                  {customerDetails?.customerEmail && (
                    <p className="text-[#111827] text-[12px] mb-[10px]">
                      {customerDetails?.customerEmail}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-[#fff]   pt-[20px]  overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="  bg-[#f5f5f5] z-10 text-[12px] text-[#111827]">
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                      className="  px-[10px]   font-semibold bg-[#f5f5f5] text-[#111827]"
                    >
                      <p> Product Name</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                      className="  px-[10px] font-semibold bg-[#f5f5f5]"
                    >
                      <p> Quantity</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                      className="  px-[10px]  font-semibold bg-[#f5f5f5]"
                    >
                      <p> Price</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                      className="  px-[10px] font-semibold bg-[#f5f5f5]"
                    >
                      <p> Total</p>
                    </th>
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
                        className="bg-[#fafafa]   text-[12px]  "
                        style={{
                          paddingBottom: "5px",
                        }}
                      >
                        <td
                          className="capitalize   pl-[10px]"
                          style={{
                            textAlign: "left",
                            paddingTop: "8px",
                            paddingBottom: "6px",
                          }}
                        >
                          {item?.name}
                        </td>
                        <td
                          className="text-right px-[10px]  "
                          style={{
                            textAlign: "right",
                            paddingTop: "8px",
                            paddingBottom: "6px",
                          }}
                        >
                          {quantity}
                        </td>
                        <td
                          className="text-right px-[10px]  "
                          style={{
                            textAlign: "right",
                            paddingTop: "8px",
                            paddingBottom: "6px",
                          }}
                        >
                          {price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          className="text-right px-[10px]   "
                          style={{
                            textAlign: "right",
                            paddingTop: "8px",
                            paddingBottom: "6px",
                          }}
                        >
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
              {items?.length === 0 && (
                <div className="text-center py-[10px] text-[12px] w-full bg-[#f9fafb]">
                  No items added
                </div>
              )}

              <div className="grid grid-cols-2 gap-y-2 pr-4 w-full max-w-md ml-auto absolute bottom-[40px] right-16 ">
                <div className="text-[12px] font-semibold text-right">
                  Subtotal:
                </div>
                <div className="text-[12px] text-right">
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div className="text-[12px] font-semibold text-right">
                  Tax Rate:
                </div>
                <div className="text-[12px] text-right">{taxRate}%</div>
                <div className="text-[12px] font-semibold text-right">
                  Discount Rate:
                </div>
                <div className="text-[12px] text-right">{discountRate}%</div>
                <div className="col-span-2 border-t pt-2 mt-2"></div>
                <div className="text-[12px] font-bold text-right mb-[10px]">
                  Total:
                </div>
                <div className="text-[12px] font-bold text-right  mb-[10px]">
                  {computedTotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
              </div>
            </div>
            <div style={{ height: 40 }} /> {/* 40px of space at the bottom */}
          </div>
        </div>
      </div>
    </div>
  );
}

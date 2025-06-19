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
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      <div
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          background: "#f3f4f6",
        }}
      >
        {productDetailsTab?.completed && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              zIndex: 1000,
            }}
          >
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: "10px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#2563eb",
                color: "white",
                borderRadius: 6,
                cursor: "pointer",
                border: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow: "0 2px 8px rgba(37,99,235,0.08)",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>
                {" "}
                Download Invoice
              </p>
              <RiFileDownloadLine />
            </button>
          </div>
        )}
        <div
          style={{
            borderRadius: 4,
            boxShadow: "0 2px 8px #e0e0e0",
            border: "1px solid #e0e0e0",
            position: "relative",
            top: -64,
            transform: "scale(0.8)",
          }}
        >
          <div
            ref={invoiceRef}
            style={{
              background: "#fff",
              minHeight: 850,
              padding: 64,
              position: "relative",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                background: "#fff",
                paddingBottom: 12,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    color: "#6b7280",
                    marginBottom: 4,
                  }}
                >
                  INVOICE
                </p>
                <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 0 }}>
                  Invoice Date: {invoiceDetails?.issueDate}
                </p>
                <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 0 }}>
                  Invoice Number: {invoiceNumber}
                </p>
              </div>
              <div>
                <h1
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#111827",
                    textTransform: "capitalize",
                    textAlign: "right",
                    marginTop: 4,
                    marginBottom: 4,
                    background: "#fff",
                  }}
                >
                  {companyDetails?.name || "Company Name"}
                </h1>
                {companyDetails?.city ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 12,
                    }}
                  >
                    <p
                      style={{
                        color: "#4b5563",
                        textAlign: "right",
                        textTransform: "capitalize",
                        marginBottom: 0,
                      }}
                    >
                      {companyDetails?.address || "Company Address"}
                    </p>
                    <p
                      style={{
                        color: "#4b5563",
                        textAlign: "right",
                        textTransform: "capitalize",
                        marginBottom: 0,
                      }}
                    >
                      {companyDetails?.city || "City"},{" "}
                      {companyDetails?.state || "State"}-
                      {companyDetails?.zip || "Zip"}{" "}
                      {companyDetails?.country || "Country"}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p
                      style={{
                        color: "#4b5563",
                        textAlign: "right",
                        textTransform: "capitalize",
                        fontSize: 12,
                        marginBottom: 0,
                      }}
                    >
                      Company Address
                    </p>
                    <p
                      style={{
                        color: "#4b5563",
                        textAlign: "right",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {companyDetails?.city || "City"},{" "}
                      {companyDetails?.state || "State"}-
                      {companyDetails?.zip || "100000"}{" "}
                      {companyDetails?.country || "Country"}
                    </p>
                  </div>
                )}
                {companyDetails?.companyEmail && (
                  <p
                    style={{
                      color: "#4b5563",
                      textAlign: "right",
                      fontSize: 12,
                      marginBottom: 0,
                    }}
                  >
                    {companyDetails?.companyEmail}
                  </p>
                )}
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 5 }}>
                Bill To :
              </p>
              <p
                style={{
                  color: "#374151",
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  marginBottom: 0,
                }}
              >
                {customerDetails?.customerName || "Customer Details"}
              </p>
              {customerDetails?.customerAddress ? (
                <div>
                  <p
                    style={{
                      color: "#374151",
                      fontSize: 12,
                      paddingTop: 4,
                      textTransform: "capitalize",
                      marginBottom: 0,
                    }}
                  >
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
                    <p
                      style={{
                        color: "#374151",
                        fontSize: 12,
                        marginBottom: 10,
                      }}
                    >
                      {customerDetails?.customerEmail}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    color: "#374151",
                    fontSize: 12,
                    textTransform: "capitalize",
                  }}
                >
                  <p
                    style={{
                      color: "#374151",
                      fontSize: 12,
                      textTransform: "capitalize",
                      marginBottom: 0,
                    }}
                  >
                    Address City, State , Zip, Country
                  </p>
                  {customerDetails?.customerEmail && (
                    <p
                      style={{
                        color: "#374151",
                        fontSize: 12,
                        marginBottom: 10,
                      }}
                    >
                      {customerDetails?.customerEmail}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div
              style={{ background: "#fff", paddingTop: 20, overflowX: "auto" }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <thead
                  style={{ background: "#f5f5f5", zIndex: 10, fontSize: 12 }}
                >
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 10,
                        fontWeight: 600,
                        background: "#f5f5f5",
                      }}
                    >
                      <p> Product Name</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 10,
                        fontWeight: 600,
                        background: "#f5f5f5",
                      }}
                    >
                      <p> Quantity</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 10,
                        fontWeight: 600,
                        background: "#f5f5f5",
                      }}
                    >
                      <p> Price</p>
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 10,
                        fontWeight: 600,
                        background: "#f5f5f5",
                      }}
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
                        style={{
                          background: "#fafafa",
                          fontSize: 12,
                          paddingBottom: 5,
                        }}
                      >
                        <td
                          style={{
                            textTransform: "capitalize",
                            paddingLeft: 10,
                            textAlign: "left",
                            paddingTop: 8,
                            paddingBottom: 8,
                          }}
                        >
                          {item?.name}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            paddingLeft: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
                          }}
                        >
                          {quantity}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            paddingLeft: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
                          }}
                        >
                          {price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            paddingLeft: 10,
                            paddingTop: 8,
                            paddingBottom: 8,
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
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px 0",
                    fontSize: 12,
                    width: "100%",
                    background: "#f9fafb",
                  }}
                >
                  No items added
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px 0",
                  paddingRight: 16,
                  width: "100%",
                  maxWidth: 400,
                  marginLeft: "auto",
                  position: "absolute",
                  bottom: 40,
                  right: 64,
                }}
              >
                <div
                  style={{ fontSize: 12, fontWeight: 600, textAlign: "right" }}
                >
                  Subtotal:
                </div>
                <div style={{ fontSize: 12, textAlign: "right" }}>
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </div>
                <div
                  style={{ fontSize: 12, fontWeight: 600, textAlign: "right" }}
                >
                  Tax Rate:
                </div>
                <div style={{ fontSize: 12, textAlign: "right" }}>
                  {taxRate}%
                </div>
                <div
                  style={{ fontSize: 12, fontWeight: 600, textAlign: "right" }}
                >
                  Discount Rate:
                </div>
                <div style={{ fontSize: 12, textAlign: "right" }}>
                  {discountRate}%
                </div>
                <div
                  style={{
                    gridColumn: "span 2",
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: 8,
                    marginTop: 8,
                  }}
                ></div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    textAlign: "right",
                    marginBottom: 10,
                  }}
                >
                  Total:
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    textAlign: "right",
                    marginBottom: 10,
                  }}
                >
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

"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import useInvoiceStore from "@/store/invoiceStore";

import { MdOutlinePayments } from "react-icons/md";

export default function PaymentDetails() {
  const {
    setActiveTab,
    setInvoiceDetails,
    setItems,
    subtotal,
    setSubtotal,
    taxRate,
    setTaxRate,
    discountRate,
    setDiscountRate,
    setProductDetailsTab,
    setCompanyDetailsTab,
    setCustomerDetailsTab,
    setPaymentDetailsTab,
    customerDetails,
    setCustomerDetails,
  } = useInvoiceStore();

  // Calculate total with tax and discount
  const total = useMemo(() => {
    const tax = (subtotal * (Number(taxRate) || 0)) / 100;
    const discount = (subtotal * (Number(discountRate) || 0)) / 100;
    return subtotal + tax - discount;
  }, [subtotal, taxRate, discountRate]);

  // Handlers
  const handleTaxRateChange = useCallback(
    (e) => {
      setTaxRate(Number(e.target.value));
    },
    [setTaxRate]
  );

  const handleDiscountRateChange = useCallback(
    (e) => {
      setDiscountRate(Number(e.target.value));
    },
    [setDiscountRate]
  );

  const handleCreateNewInvoice = () => {
    setCustomerDetails({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      customerCity: "",
      customerState: "",
      customerZip: "",
      customerCountry: "",
    });
    setInvoiceDetails({});
    setItems([]);
    setSubtotal(0);
    setTaxRate(0);
    setDiscountRate(0);

    setCompanyDetailsTab({ completed: true, active: true });
    setCustomerDetailsTab({ completed: false, active: true });
    setProductDetailsTab({ completed: false, active: false });
    setPaymentDetailsTab({ completed: false, active: false });
    console.log("customerDetails---", customerDetails);

    setActiveTab("customer");
  };

  return (
    <div className="relative h-[100vh]  ">
      <div className="text-2xl sticky top-0 left-0 bg-white z-[50] py-5 px-12 flex items-center gap-4 border-b">
        <MdOutlinePayments className="text-2xl text-[#0369a1]" />
        <p className="font-bold">Enter Payment Details</p>
      </div>
      <div className="  mt-12 p-8">
        <div className="grid grid-cols-2 gap-y-4 items-center">
          <div className="font-medium text-right">Subtotal:</div>
          <div className="text-right text-lg">
            {subtotal.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
          <div className="font-medium text-right">Tax Rate (%):</div>
          <div className="text-right">
            <input
              type="number"
              min={0}
              max={100}
              value={taxRate || ""}
              onChange={handleTaxRateChange}
              className="border rounded-md p-2 w-24 text-right"
            />
          </div>
          <div className="font-medium text-right">Discount Rate (%):</div>
          <div className="text-right">
            <input
              type="number"
              min={0}
              max={100}
              value={discountRate || ""}
              onChange={handleDiscountRateChange}
              className="border rounded-md p-2 w-24 text-right"
            />
          </div>
          <div className="col-span-2 border-t pt-4 mt-2"></div>
          <div className="font-bold text-lg text-right">Total:</div>
          <div className="text-xl font-bold text-green-700 text-right">
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </div>
      </div>
      <div className=" absolute bottom-10 right-10 w-full flex justify-end">
        <button
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => handleCreateNewInvoice()}
        >
          <p className="text-sm font-semibold"> Create new Invoice</p>
        </button>
      </div>
    </div>
  );
}

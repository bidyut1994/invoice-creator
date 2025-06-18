"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/store/invoiceStore";
import { useEffect, useCallback, useRef } from "react";
import { FaList, FaPlus, FaTrash } from "react-icons/fa6";
import * as z from "zod";

const productSchema = z.object({
  products: z.array(
    z.object({
      name: z.string().min(1, "Product name is required"),
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      price: z.coerce.number().min(1, "Price must be at least 1"),
    })
  ),
});

export default function ProductDetails() {
  const {
    items,
    setItems,
    setActiveTab,
    setSubtotal,
    setProductDetailsTab,
    setPaymentDetailsTab,
  } = useInvoiceStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    values,
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      products: [{ name: "", quantity: 1, price: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = watch("products");

  const onSubmit = (data) => {
    setItems(data.products);
    if (data.products.length > 0) {
      setActiveTab("payment-details");
      setProductDetailsTab({ completed: true, active: true });
      setPaymentDetailsTab({ completed: false, active: true });
    }
  };

  const handleBack = useCallback(() => {
    setActiveTab("customer");
  }, [setActiveTab]);

  useEffect(() => {
    setValue("products", items);
  }, [values]);

  useEffect(() => {
    if (items.length === 0) {
      append({ name: "", quantity: 1, price: 1 });
    }
  }, []);

  const grandTotal =
    products?.reduce((total, product) => {
      const quantity = Number(product.quantity) || 0;
      const price = Number(product.price) || 0;
      return total + quantity * price;
    }, 0) || 0;

  const handleUpdateItems = useCallback(() => {
    setItems(products);
    setSubtotal(grandTotal);
  }, [products, setItems, grandTotal, setSubtotal]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateItems();
    }, 1000);
    return () => clearInterval(interval);
  }, [handleUpdateItems]);

  return (
    <div className="relative h-[100vh]">
      <div className="text-2xl sticky top-0 left-0 bg-white z-[50] py-5 px-12 flex items-center gap-4 border-b">
        <FaList className="text-2xl text-[#0369a1]" />
        <p className="font-bold">Enter Product Details</p>
      </div>
      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div className="px-12 pt-8 space-y-4 overflow-y-auto overflow-x-hidden h-[80vh]">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="relative border rounded-md p-4 mb-4"
              >
                <div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Product Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      {...register(`products.${idx}.name`)}
                      className="w-full p-2 border rounded-md"
                      placeholder="Product name"
                    />
                    {errors.products?.[idx]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.products[idx].name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Quantity<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      {...register(`products.${idx}.quantity`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded-md"
                    />

                    {errors.products?.[idx]?.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.products[idx].quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Price<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={0.01}
                      {...register(`products.${idx}.price`, {
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.products?.[idx]?.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.products[idx].price.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Total
                    </label>
                    <div className="w-full p-2 border rounded-md bg-gray-100">
                      {products[idx].quantity * products[idx].price || 0}
                    </div>
                  </div>
                </div>
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-red-500 rounded-md cursor-pointer bg-red-200 hover:text-red-700 p-1.5 absolute -top-3 -right-3"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={() => append({ name: "", quantity: 1, price: 1 })}
              className=" flex items-center gap-2 mb-64"
              disabled={items?.length >= 8}
            >
              <FaPlus /> Add Product
            </Button>
          </div>
          <div className="flex justify-between gap-3 sticky bottom-0 bg-white w-full left-0 py-5 border-t px-10">
            <div className="flex items-center gap-2 text-xl font-bold">
              <span>Subtotal:</span>
              <span className="text-green-700">
                {grandTotal > 0 ? `$${grandTotal?.toFixed(2)}` : "$0.00"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="text-red-600 border-red-600"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button type="submit">
                Save and Continue
                <FaArrowRightLong />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

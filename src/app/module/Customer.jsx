"use client";
import { BsBuildings } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRightLong } from "react-icons/fa6";
import { customerSchema } from "@/lib/validations/invoice";
import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/store/invoiceStore";
import { useEffect, useCallback } from "react";

import { FaBuildingUser } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { countries } from "countries-list";

const RequiredLabel = ({ children }) => (
  <label className="block text-sm font-medium mb-1">
    {children}
    <span className="text-red-500 ml-1">*</span>
  </label>
);

const OptionalLabel = ({ children }) => (
  <label className="block text-sm font-medium mb-1 text-muted-foreground">
    {children}
  </label>
);

export default function Customer() {
  const { setActiveTab, customerDetails, setCustomerDetails } =
    useInvoiceStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: customerDetails,
  });

  const formValues = watch();

  const debouncedUpdate = useCallback(
    (values) => {
      const timeoutId = setTimeout(() => {
        setCustomerDetails(values);
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [setCustomerDetails]
  );

  useEffect(() => {
    debouncedUpdate(formValues);
  }, [formValues, debouncedUpdate]);

  const countriesList = Object.entries(countries)
    .map(([code, country]) => ({
      code,
      name: country.name,
      emoji: country.emoji,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onSubmit = (data) => {
    setCustomerDetails(data);
    if (
      data.name &&
      data.email &&
      data.address &&
      data.city &&
      data.state &&
      data.zip &&
      data.country
    ) {
      setActiveTab("invoice");
    }
  };

  return (
    <div className="relative h-[100vh]">
      <div className="text-2xl sticky top-0 left-0 bg-white z-[50] py-5 px-16 flex items-center gap-4 border-b">
        <FaBuildingUser className="text-2xl text-[#0369a1]" />
        <p className="font-bold">Enter Customer Details</p>
      </div>

      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div className="px-16 pt-8 space-y-4 overflow-y-auto overflow-x-hidden h-[90vh]">
            <div>
              <RequiredLabel>Customer Name</RequiredLabel>
              <input
                {...register("name")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter customer name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <RequiredLabel>Address</RequiredLabel>
              <textarea
                rows={3}
                {...register("address")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <RequiredLabel>City</RequiredLabel>
                <input
                  {...register("city")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel>State</RequiredLabel>
                <input
                  {...register("state")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <RequiredLabel>ZIP Code</RequiredLabel>
                <input
                  {...register("zip")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter ZIP code"
                />
                {errors.zip && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.zip.message}
                  </p>
                )}
              </div>

              <div>
                <RequiredLabel>Country</RequiredLabel>
                <Select
                  onValueChange={(value) => setValue("country", value)}
                  defaultValue={customerDetails.country}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto w-[280px]">
                    {countriesList.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        <div className="flex items-center gap-2 cursor-pointer w-full">
                          <span className="text-lg">{country.emoji}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <RequiredLabel>Email</RequiredLabel>
              <input
                {...register("email")}
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <OptionalLabel>Phone</OptionalLabel>
              <input
                {...register("phone")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 sticky bottom-0 bg-white w-full left-0 py-5 border-t px-10">
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-600"
              onClick={() => setActiveTab("company-details")}
            >
              Back
            </Button>
            <Button type="submit" disabled={!formValues.name}>
              Save and Continue
              <FaArrowRightLong />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

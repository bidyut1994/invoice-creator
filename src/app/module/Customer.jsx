"use client";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRightLong } from "react-icons/fa6";
import { customerSchema } from "@/lib/validations/invoice";
import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/store/invoiceStore";
import { useEffect, useCallback, useMemo } from "react";
import { FaBuildingUser } from "react-icons/fa6";
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
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: customerDetails,
  });

  // useWatch for form values
  const formValues = useWatch({ control });

  // Memoize countries list
  const countriesList = useMemo(() => {
    return Object.entries(countries)
      .map(([code, country]) => ({
        code,
        name: country.name,
        emoji: country.emoji,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Debounced update
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
    const cleanup = debouncedUpdate(formValues);
    return cleanup;
  }, [formValues, debouncedUpdate]);

  const onSubmit = useCallback(
    (data) => {
      setCustomerDetails(data);
      if (
        data.customerName &&
        data.customerEmail &&
        data.customerAddress &&
        data.customerCity &&
        data.customerState &&
        data.customerZip &&
        data.customerCountry
      ) {
        setActiveTab("product-details");
      }
    },
    [setCustomerDetails, setActiveTab]
  );

  const handleBack = useCallback(() => {
    setActiveTab("company-details");
  }, [setActiveTab]);

  const handleCountryChange = useCallback(
    (value) => {
      setValue("customerCountry", value);
    },
    [setValue]
  );

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
              {console.log("customer-errors", errors)}
              <RequiredLabel>Customer Name</RequiredLabel>
              <input
                {...register("customerName")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter customer name"
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerName.message}
                </p>
              )}
            </div>
            <div>
              <RequiredLabel>Address</RequiredLabel>
              <textarea
                rows={3}
                {...register("customerAddress")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter address"
              />
              {errors.customerAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerAddress.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <RequiredLabel>City</RequiredLabel>
                <input
                  {...register("customerCity")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter city"
                />
                {errors.customerCity && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerCity.message}
                  </p>
                )}
              </div>
              <div>
                <RequiredLabel>State</RequiredLabel>
                <input
                  {...register("customerState")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter state"
                />
                {errors.customerState && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerState.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <RequiredLabel>ZIP Code</RequiredLabel>
                <input
                  {...register("customerZip")}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter ZIP code"
                />
                {errors.customerZip && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerZip.message}
                  </p>
                )}
              </div>
              <div>
                <RequiredLabel>Country</RequiredLabel>
                <Select
                  onValueChange={handleCountryChange}
                  defaultValue={customerDetails.customerCountry}
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
                {errors.customerCountry && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.customerCountry.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <RequiredLabel>Email</RequiredLabel>
              <input
                {...register("customerEmail")}
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerEmail.message}
                </p>
              )}
            </div>
            <div className="pb-64">
              <OptionalLabel>Phone</OptionalLabel>
              <input
                {...register("customerPhone")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter phone number"
              />
              {errors.customerPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerPhone.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 sticky bottom-0 bg-white w-full left-0 py-5 border-t px-10">
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-600"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button type="submit" disabled={!formValues.customerName}>
              Save and Continue
              <FaArrowRightLong />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

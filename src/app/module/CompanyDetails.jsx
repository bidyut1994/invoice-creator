"use client";
import { BsBuildings } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailsSchema } from "@/lib/validations/invoice";
import { Button } from "@/components/ui/button";
import useInvoiceStore from "@/store/invoiceStore";
import { useEffect, useCallback, useState } from "react";
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

export default function CompanyDetails() {
  const { setActiveTab, companyDetails, setCompanyDetails } = useInvoiceStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: companyDetails,
  });

  const formValues = watch();

  const debouncedUpdate = useCallback(
    (values) => {
      const timeoutId = setTimeout(() => {
        setCompanyDetails(values);
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [setCompanyDetails]
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
    setCompanyDetails(data);
    if (
      data.name &&
      data.address &&
      data.city &&
      data.state &&
      data.zip &&
      data.country &&
      data.companyEmail &&
      data.companyPhone
    ) {
      setActiveTab("customer");
    }
  };

  return (
    <div className="relative h-[100vh] overflow-y-auto overflow-x-hidden">
      <div className="text-2xl sticky top-0 left-0 bg-white z-[50] py-5 px-8 flex items-center gap-2 border-b">
        <BsBuildings className="text-2xl text-[#0369a1]" />
        <p className="font-bold">Enter Company Details</p>
      </div>

      <div className="relative pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <div className="px-10 space-y-4">
            <div>
              <RequiredLabel>Company Name</RequiredLabel>
              <input
                {...register("name")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter company name"
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
                  defaultValue={companyDetails.country}
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
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
                {...register("companyEmail")}
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter email"
              />
              {errors.companyEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyEmail.message}
                </p>
              )}
            </div>

            <div>
              <RequiredLabel>Phone</RequiredLabel>
              <input
                {...register("companyPhone")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter phone number"
              />
              {errors.companyPhone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyPhone.message}
                </p>
              )}
            </div>

            <div>
              <OptionalLabel>Website (Optional)</OptionalLabel>
              <input
                {...register("companyWebsite")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter website URL"
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyWebsite.message}
                </p>
              )}
            </div>

            <div className="pb-48">
              <OptionalLabel>Logo URL (Optional)</OptionalLabel>
              <input
                {...register("companyLogoUrl")}
                className="w-full p-2 border rounded-md"
                placeholder="Enter logo URL"
              />
              {errors.companyLogoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyLogoUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 sticky bottom-0 bg-white w-full left-0 py-5 border-t px-10">
            <Button
              type="button"
              variant="outline"
              className="text-red-600 border-red-600"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={!formValues.name}>
              Save and Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

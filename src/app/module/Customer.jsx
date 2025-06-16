"use client";
import { BsBuildings } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaArrowRightLong } from "react-icons/fa6";
import { customerSchema } from "@/lib/validations/invoice";
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
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const itemVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

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

  // Convert countries object to array and sort by name
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
    <motion.div
      className="relative h-[100vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="text-2xl sticky top-0 left-0 bg-white z-[50] py-5 px-16 flex items-center gap-4 border-b"
        variants={itemVariants}
      >
        <BsBuildings className="text-2xl text-[#0369a1]" />
        <p className="font-bold">Enter Customer Details</p>
      </motion.div>

      <div className="relative">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <motion.div
            className="px-16 pt-8 space-y-4 overflow-y-auto overflow-x-hidden h-[90vh]"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
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
            </motion.div>

            <motion.div variants={itemVariants}>
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
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
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
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={itemVariants}
            >
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
            </motion.div>

            <motion.div variants={itemVariants}>
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
            </motion.div>

            <motion.div variants={itemVariants}>
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
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-end gap-3 sticky bottom-0 bg-white w-full left-0 py-5 border-t px-10"
            variants={itemVariants}
          >
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
              <FaArrowRightLong />
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

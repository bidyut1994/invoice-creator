import { z } from "zod";

export const companyDetailsSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().regex(/^\d{6}(-\d{4})?$/, "Invalid ZIP code format"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  companyEmail: z.string().email("Invalid email format"),
  companyPhone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number format")
    .optional()
    .nullable(),
  companyLogoUrl: z.string().optional().nullable(),
  companyWebsite: z.string().optional().nullable(),
});

export const customerSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters"),
  customerEmail: z.string().email("Invalid email format"),
  customerPhone: z
    .string()
    .regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number format"),
  customerAddress: z.string().min(5, "Address must be at least 5 characters"),
  customerCity: z.string().min(2, "City must be at least 2 characters"),
  customerState: z.string().min(2, "State must be at least 2 characters"),
  customerZip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
  customerCountry: z.string().min(2, "Country must be at least 2 characters"),
});

export const productDetailsSchema = z.object({
  items: z
    .array(
      z.object({
        description: z
          .string()
          .min(2, "Description must be at least 2 characters"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        rate: z.number().min(0, "Rate must be a positive number"),
        amount: z.number().min(0, "Amount must be a positive number"),
      })
    )
    .min(1, "At least one item is required"),
  subtotal: z.number().min(0, "Subtotal must be a positive number"),
  tax: z.number().min(0, "Tax must be a positive number"),
  total: z.number().min(0, "Total must be a positive number"),
});

export const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(["bank_transfer", "credit_card", "paypal", "cash"]),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  paypalEmail: z.string().email("Invalid PayPal email").optional(),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Invalid card number")
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date")
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "Invalid CVV")
    .optional(),
});

export const invoiceSchema = z.object({
  companyDetails: companyDetailsSchema,
  customer: customerSchema,
  productDetails: productDetailsSchema,
  paymentDetails: paymentDetailsSchema,
});

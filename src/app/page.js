"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFileInvoiceDollar,
  FaDownload,
  FaEdit,
  FaClock,
  FaShieldAlt,
  FaGlobe,
  FaMobile,
  FaCheck,
  FaStar,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { MdEmail } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-50">
        {/* Header */}
        <header className="  backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/icon.svg"
                  alt="InvoiceFree"
                  width={36}
                  height={36}
                />
                <span className="text-2xl ml-3 font-bold text-gray-900">
                  InvoiceFree
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/create-invoice">
                  <button className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-md text-md font-semibold hover:bg-blue-700 transition-colors">
                    Create Invoice
                  </button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 lg:py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  <HiSparkles className="text-lg" />
                  <span>100% Free Forever</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                Create Professional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {" "}
                  Invoices
                </span>
                <br />
                in Minutes
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Generate, customize, and send beautiful invoices instantly. No
                signup required, completely free, and works on any device.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/create-invoice">
                  <button className="bg-blue-600 flex justify-center items-center gap-2 cursor-pointer text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    <FaEdit className="inline mr-2" />
                    Create Invoice Now
                  </button>
                </Link>
              </div>
              <div className="mt-4 flex justify-center items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  No Registration
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Instant Download
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  Professional Templates
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-16">
              <Image
                src="/assets/screen.png"
                alt="InvoiceFree"
                width={1200}
                height={1200}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Create Perfect Invoices
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features that make invoice creation simple, fast, and
                professional
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaClock className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600">
                  Create professional invoices in under 2 minutes. No complex
                  forms or lengthy processes.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-all">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaDownload className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instant Download
                </h3>
                <p className="text-gray-600">
                  Download your invoice as PDF instantly. High-quality,
                  print-ready documents every time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl border border-teal-100 hover:shadow-lg transition-all">
                <div className="bg-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  Your data stays private. We don't store your information or
                  require any personal details.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands of Businesses
              </h2>
              <p className="text-xl text-gray-600">
                See what our users say about InvoiceFree
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "InvoiceFree saved me hours every week. The templates are
                  beautiful and the process is so simple!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-600 text-sm">Freelance Designer</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Perfect for my small business. Professional invoices without
                  the complexity of expensive software."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Mike Chen</p>
                    <p className="text-gray-600 text-sm">
                      Small Business Owner
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The customization options are amazing. I can match my brand
                  perfectly and it looks so professional."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">
                      Anna Rodriguez
                    </p>
                    <p className="text-gray-600 text-sm">
                      Marketing Consultant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your First Invoice?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses who trust InvoiceFree for their
              invoicing needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/create-invoice">
                <button className="bg-white cursor-pointer text-blue-600 px-8 py-4 rounded-md flex justify-center items-center gap-2 text-md font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  <FaEdit className="inline mr-2" />
                  Start Creating Now
                </button>
              </Link>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              No credit card required • Always free • No hidden fees
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="  text-center text-gray-400">
              <p>&copy; 2024 InvoiceFree. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

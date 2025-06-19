# Invoice Generator

A modern, responsive invoice generation application built with Next.js 15, React, and Tailwind CSS. Create professional invoices with a beautiful UI and export them as PDFs.

## ✨ Features

- **📝 Dynamic Invoice Creation**: Create invoices with company details, customer information, and product items
- **🎨 Modern UI**: Clean, professional interface built with Tailwind CSS
- **📊 Real-time Calculations**: Automatic calculation of subtotals, taxes, and discounts
- **📄 PDF Export**: Download invoices as PDF files using html2pdf.js
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🔄 State Management**: Built with Zustand for efficient state management
- **✅ Form Validation**: Comprehensive form validation using React Hook Form and Zod
- **🎯 Multi-step Process**: Organized workflow with progress tracking

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod validation
- **PDF Generation**: html2pdf.js (with dynamic imports for SSR compatibility)
- **UI Components**: Shadcn + Custom components
- **Icons**: React Icons + Lucide React 

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd invoice
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
 

## 🎯 Key Features Explained

### Invoice Creation Process

1. **Company Details**: Enter your business information
2. **Customer Information**: Add client details
3. **Product Details**: Add items, quantities, and prices
4. **Payment Details**: Configure tax and discount rates
5. **Preview & Download**: Review and export as PDF
 

## 🔧 Recent Updates

### v1.1.0 - Grid Layout & SSR Fixes

- ✅ **Converted table view to grid layout** for better responsiveness
- ✅ **Fixed SSR compatibility** with dynamic imports for html2pdf.js
- ✅ **Improved build process** and deployment readiness
- ✅ **Enhanced UI styling** with better spacing and modern design

### v1.0.0 - Initial Release

- ✅ Complete invoice creation workflow
- ✅ PDF export functionality
- ✅ Form validation and error handling
- ✅ Responsive design implementation

## 🚀 Deployment
 

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
 
 

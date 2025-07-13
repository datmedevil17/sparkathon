import { Product } from "@/data/products"
import jsPDF from "jspdf"
import * as XLSX from "xlsx"

export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products
  
  const term = searchTerm.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term) ||
    product.id.toLowerCase().includes(term) ||
    product.sku?.toLowerCase().includes(term) ||
    product.supplier?.toLowerCase().includes(term)
  )
}

export const exportToExcel = (products: Product[], filename: string = "inventory_report") => {
  const exportData = products.map(product => ({
    "Product ID": product.id,
    "Name": product.name,
    "Category": product.category,
    "Stock": product.stock,
    "Sold": product.sold,
    "Revenue": product.revenue,
    "Margin": product.margin,
    "Trend": product.trend,
    "Status": product.stockStatus,
    "Supplier": product.supplier || "N/A",
    "SKU": product.sku || "N/A",
    "Price": product.price || "N/A"
  }))

  const ws = XLSX.utils.json_to_sheet(exportData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Inventory")
  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export const exportToPDF = (products: Product[], filename: string = "inventory_report") => {
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(20)
  doc.text("Inventory Report", 20, 30)
  
  // Add generation date
  doc.setFontSize(12)
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45)
  
  // Add summary
  doc.setFontSize(14)
  doc.text("Summary:", 20, 65)
  doc.setFontSize(11)
  doc.text(`Total Products: ${products.length}`, 20, 80)
  doc.text(`Products with Upward Trend: ${products.filter(p => p.trend === 'up').length}`, 20, 90)
  doc.text(`Products with Downward Trend: ${products.filter(p => p.trend === 'down').length}`, 20, 100)
  doc.text(`Low Stock Items: ${products.filter(p => p.stockStatus === 'low-stock').length}`, 20, 110)
  
  // Add table headers
  let yPosition = 130
  doc.setFontSize(10)
  doc.text("ID", 20, yPosition)
  doc.text("Name", 40, yPosition)
  doc.text("Category", 90, yPosition)
  doc.text("Stock", 120, yPosition)
  doc.text("Trend", 140, yPosition)
  doc.text("Revenue", 160, yPosition)
  
  // Add products
  yPosition += 10
  products.forEach((product, index) => {
    if (yPosition > 270) {
      doc.addPage()
      yPosition = 30
    }
    
    doc.text(product.id, 20, yPosition)
    doc.text(product.name.substring(0, 20), 40, yPosition)
    doc.text(product.category, 90, yPosition)
    doc.text(product.stock.toString(), 120, yPosition)
    doc.text(product.trend, 140, yPosition)
    doc.text(product.revenue, 160, yPosition)
    yPosition += 8
  })
  
  doc.save(`${filename}.pdf`)
}
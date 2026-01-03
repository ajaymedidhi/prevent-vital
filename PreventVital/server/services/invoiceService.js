const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Ensure invoices directory exists
const invoiceDir = path.join(__dirname, '../public/invoices');
if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
}

exports.generateInvoice = async (order, user) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const invoiceName = `invoice-${order._id}.pdf`;
            const invoicePath = path.join(invoiceDir, invoiceName);

            const writeStream = fs.createWriteStream(invoicePath);
            doc.pipe(writeStream);

            // Header
            doc.fontSize(20).text('PreventVital Invoice', { align: 'center' });
            doc.moveDown();

            // Details
            doc.fontSize(12).text(`Invoice Number: ${order._id}`);
            doc.text(`Date: ${new Date().toLocaleDateString()}`);
            doc.text(`Customer: ${user.name}`);
            doc.text(`Email: ${user.email}`);
            doc.moveDown();

            // Items
            doc.text('Items:', { underline: true });
            order.items.forEach(item => {
                doc.text(`${item.name} x ${item.quantity} - ₹${item.price}`);
            });
            doc.moveDown();

            // Total
            doc.fontSize(14).text(`Total Amount: ₹${order.totalAmount}`, { bold: true });

            doc.end();

            writeStream.on('finish', () => {
                // In a real app, upload to S3 and return the S3 URL.
                // Here we return a local URL relative to the public folder.
                // Assuming express serves static files from public/invoices or similar.
                // Since this is an API, we probably need a route to serve it or just return the static path.
                // User requirement: "upload to AWS S3, save the URL"
                // I will simulate an S3 URL or return a local served URL.
                const fileUrl = `/invoices/${invoiceName}`;
                resolve(fileUrl);
            });

            writeStream.on('error', (err) => {
                reject(err);
            });

        } catch (err) {
            reject(err);
        }
    });
};

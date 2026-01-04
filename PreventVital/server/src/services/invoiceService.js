const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.generateInvoice = async (order, user) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const fileName = `invoice-${order.orderId}.pdf`;
            const filePath = path.join(__dirname, '../../public/invoices', fileName);

            // Ensure directory exists
            if (!fs.existsSync(path.join(__dirname, '../../public/invoices'))) {
                fs.mkdirSync(path.join(__dirname, '../../public/invoices'), { recursive: true });
            }

            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Add content
            doc.fontSize(25).text('PreventVital Invoice', 100, 50);
            doc.fontSize(12).text(`Order ID: ${order.orderId}`, 100, 100);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 100, 120);
            doc.text(`Customer: ${user.profile?.firstName} ${user.profile?.lastName}`, 100, 140);
            doc.text(`Total: ₹${order.pricing?.total || 0}`, 100, 160);

            doc.text('Items:', 100, 200);
            let y = 220;
            if (order.items) {
                order.items.forEach(item => {
                    doc.text(`${item.productName} x ${item.quantity} - ₹${item.price}`, 100, y);
                    y += 20;
                });
            }

            doc.end();

            stream.on('finish', () => {
                // Return relative URL
                resolve(`/invoices/${fileName}`);
            });

            stream.on('error', (err) => {
                reject(err);
            });

        } catch (err) {
            reject(err);
        }
    });
};

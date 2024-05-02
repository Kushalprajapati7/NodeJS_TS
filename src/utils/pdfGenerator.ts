import PDFDocument from 'pdfkit';
import fs from 'fs';
import { Request, Response } from 'express';
import { ICart } from '../models/cart.model';

export function generatePDF(cart: ICart, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(path);
    doc.pipe(stream);

    doc.fontSize(25).text('Cart Summary', { align: 'center' });
    doc.fontSize(15).moveDown();

    doc.text(`User ID: ${cart.userId}`);
    doc.text(`Profile ID: ${cart.profileId}`);
    doc.moveDown();

    doc.text('Items:', { underline: true });
    cart.items.forEach(item => {
      doc.moveDown().fontSize(12);
      doc.text(`Name: ${item.name}`);
      doc.text(`Description: ${item.description}`);
      doc.text(`Quantity: ${item.quantity}`);
      doc.text(`Price: $${item.price}`);
    });

    doc.moveDown();
    doc.fontSize(20).text(`Total: $${cart.total}`, { align: 'right' });

    doc.end();
    stream.on('finish', () => resolve(path));
    stream.on('error', reject);
  });
}

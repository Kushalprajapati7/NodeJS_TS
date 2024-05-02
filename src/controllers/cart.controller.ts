import { Request, Response } from 'express';
import Cart, { ICart } from '../models/cart.model';
import Product from '../models/product.model';
import session from 'express-session';
import { generatePDF } from '../utils/pdfGenerator';
import fs from 'fs';

export const createCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req.session as any).userId;
        const { profileId, items } = req.body;
        let total = 0;


        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            total += product.price * item.quantity;

            item.name = product.name;
            item.description = product.description;
            item.price = product.price;
        }

        const newCart: ICart = new Cart({ userId, profileId, items, total });
        const savedCart = await newCart.save();

        res.status(201).json(savedCart);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart: ICart | null = await Cart.findByIdAndDelete(id);
        if (!cart) {
            res.status(404).json({ message: "Cart Not Found" })
        }
        res.status(200).json({ message: "Cart Deleted Succesfully " });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const { id } = req.params;
        const { items } = req.body;
        let total = 0;
        // console.log(id);

        let sessionUserId = (req.session as any).userId;
        const cart = await Cart.findById(id);
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        if (sessionUserId === cart.userId.toString()) {
            cart.items = [];

            for (const item of items) {
                const product = await Product.findById(item.productId);
                if (!product) {
                    res.status(404).json({ message: `Product with ID ${item.productId} not found` });
                    return;
                }

                cart.items.push({
                    productId: product._id,
                    quantity: item.quantity,
                    price: product.price,
                    name: product.name,
                    description: product.description
                });

                total += product.price * item.quantity;
            }
            cart.total = total;
            await cart.save();
            res.status(200).json(cart);
        }
        else {
            res.status(500).json({ message: "No Cart find For logged User" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const showCartById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    // console.log(id);
    // console.log((req.session as any).userId);
    let sessionUserId = (req.session as any).userId;
    console.log(sessionUserId);


    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart: ICart | null = await Cart.findById(id);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }

        if (sessionUserId === cart.userId.toString()) {
            res.status(200).json(cart);
        }
        else {

            res.status(500).json({ message: "No Cart find For logged User" });
        }

        console.log(`UserID of the cart: ${cart.userId}`);
        // res.status(200).json({ userId: cart.userId, cart });


    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const showCart = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const userId = (req.session as any).userId;
        const cart: ICart[] = await Cart.find({ userId });
        res.status(200).json(cart)

    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const downloadCartPDF = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!(req.session as any).userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            res.status(404).send('Cart not found');
            return;
        }
        let sessionUserId = (req.session as any).userId;
        if (sessionUserId === cart.userId.toString()) {


            const outputDir = './output';
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            const pdfPath = `${outputDir}/Cart-${cart._id}.pdf`;
            await generatePDF(cart, pdfPath);

            res.download(pdfPath, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        }
        else{
            res.status(500).json({ message: "No Cart find For logged User" });
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
};

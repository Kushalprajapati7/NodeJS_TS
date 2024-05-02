import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/product.model';

export const getAllproducta = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: IProduct[] = await Product.find();
        res.status(200).json(product)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const newproduct: IProduct = new Product(req.body);
        await newproduct.save();
        res.status(201).json(newproduct);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product: IProduct | null = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product: IProduct | null = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json({message: "Product Deleted Succesfully "});
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
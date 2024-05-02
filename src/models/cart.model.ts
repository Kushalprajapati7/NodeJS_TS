import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICart extends Document {

    userId: string;
    profileId: string;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
        name: string;
        description: string;
    }>;
    total: number;
}

const cartSchema: Schema = new Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true }
    }],
    total: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;

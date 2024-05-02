import mongoose,{Document,Schema} from "mongoose";

export interface IProduct extends Document{
    name:string,
    description:string,
    price:number,
    stock:number,
}

const ProductSchema: Schema = new Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"]
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter price"]
    },
    stock:{
        type:Number,
        required:[true,"please enter Stick"]
    }   
})

const Product = mongoose.model<IProduct>('Product',ProductSchema);
export default Product;
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string,
    password: string
};

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

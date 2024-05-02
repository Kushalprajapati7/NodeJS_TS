import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from './user.model';

export interface IProfile extends Document {
    UserId: IUser['_id'],
    name: string,
    age: number
}

const profileSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: [true, 'Please enter name'] },
    age: { type: Number, required: [true, 'Please enter your age'] }
}, {
    timestamps: true
});

const Profile = mongoose.model<IProfile>('Profile', profileSchema)
export default Profile;
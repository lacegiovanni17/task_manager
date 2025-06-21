import { Model, Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import { UserRoles, UserStatus } from './user.enum';

const userSchema = new Schema<IUser>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true, // Automatically generate ObjectId
    },
    first_name: {
        type: String,
        required: true,
        select: true,
    },
    last_name: {
        type: String,
        required: true,
        select: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        trim: true,
    },
    user_role: {
        type: String,
        enum: Object.values(UserRoles),
        default: UserRoles.USER,
    },
    user_status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.INACTIVE,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const User = model<IUser>("User", userSchema);
export default User;
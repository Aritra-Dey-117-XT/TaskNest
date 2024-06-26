import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a Username'],
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Please provide an Email'],
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: [true, 'Please provide a Password'],
        minlength: 8
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyOTP: {
        type: String,
        length: 6
    },
    verifyOTPExpiry: Date,
    forgotPasswordOTP: {
        type: String,
        length: 6
    },
    forgotPasswordOTPExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
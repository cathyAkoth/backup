const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    candidateVerificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CandidateVerification",
    },
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('cart', CartSchema);
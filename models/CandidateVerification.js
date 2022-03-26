const mongoose  = require('mongoose');

const candidateVerificationSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
    },
    age: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    numberOfKids: {
        type: Number,
    },
    nationality: {
        type: String,
    },
    countryOfResidence: {
        type: String,
    },
    district: {
        type : String,
    },
    religion: {
        type : String,
    },
    educationLevel: {
        type : String,
    },
    email: {
        type : String,
    },
    phoneNumber: {
        type : String,
    },
    whatsAppNo : {
        type : String,
    },
    passport : {
        type : String,
    },
    workExperience: {
        type : String,
    },
    availabilty: {
        type : String,
    },
    description : {
        type :String,
    },
    salary : {
        type : String,
    },
    jobLocation: {
        type : String,
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const CandidateVerification  = mongoose.model('CandidateVerification', candidateVerificationSchema , 'candidateVerifications')

module.exports = CandidateVerification;
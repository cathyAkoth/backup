const mongoose  = require('mongoose');

const employerVerificationIndividualSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String
    },
    nin: {
        type: String
    },
    district: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const employerVerifactionIndividual  = mongoose.model('EmployerVerificationIndividual', employerVerificationIndividualSchema , 'employerVerificationIndividuals')

module.exports = employerVerifactionIndividual;
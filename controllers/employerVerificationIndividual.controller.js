const EmployerVerificationIndividual = require('../models/EmployerVerificationIndividual')


class   EmployerVerificationIndividualController {
    static async addEmployerVerificationIndividual (data) {
        
        let employerVerificationIndividual = new EmployerVerificationIndividual(data);

        await employerVerificationIndividual.save()
        let employerVerificationIndividuals = await EmployerVerificationIndividual.find();
        return employerVerificationIndividuals;
    }
    static async fetchEmployerVerificationIndividuals () {
        return await EmployerVerificationIndividual.find();
    }

    static async getEmployerVerificationIndividual(id) {
        return await EmployerVerificationIndividual.findById(id)
    }

    static async deleteEmployerVerificationIndividual(id) {
        let employerVerificationIndividual = await this.getEmployerVerificationIndividual(id);

        if(!employerVerificationIndividual) {
            return "Verification not found"
        } 

        return await EmployerVerificationIndividual.findOneAndRemove({_id: employerVerificationIndividual._id});
    }

   
 }

module.exports = EmployerVerificationIndividualController;

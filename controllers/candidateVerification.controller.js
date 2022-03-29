const CandidateVerification = require('../models/CandidateVerification')


class   CandidateVerificationController {
    static async addCandidateVerification (data) {
        
        let candidateVerification = new CandidateVerification(data);
        // let data = req.body;
    
   
    
    candidateVerification.image = req.file.path;
    candidateVerification.fil = req.file.path;
    
    await candidateVerification.save()

        await candidateVerification.save()
        let candidateVerifications = await CandidateVerification.find();
        return candidateVerifications;
    }
    static async fetchCandidateVerifications () {
        return await CandidateVerification.find();
    }

    static async getCandidateVerification(id) {
        return await CandidateVerification.findById(id)
    }

    static async deleteCandidateVerification(id) {
        let candidateVerification = await this.getCandidateVerification(id);

        if(!candidateVerification) {
            return "Verification not found"
        } 

        return await CandidateVerification.findOneAndRemove({_id: candidateVerification._id});
    }

   
 }

module.exports = CandidateVerificationController;

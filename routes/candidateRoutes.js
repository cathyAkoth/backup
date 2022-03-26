const router  = require('express').Router()
const CandidateVerificationController = require('../controllers/candidateVerification.controller')


router.get('', async(req, res) => {
    let candidateVerifications = await CandidateVerificationController.fetchCandidateVerifications();
    res.json({
        data: candidateVerifications
    })
})

router.post('/add', async (req, res) => {
    let data = req.body;
    let candidateVerification = await CandidateVerificationController.addCandidateVerification(data)
    
    return res.status(201).json({
        message: candidateVerification
    })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await CandidateVerificationController.getCandidateVerification(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})

router.put('/:id/update', async(req, res) => {
    
    let {id} = req.params
    let candidateVerification = await CandidateVerificationController.getCandidateVerification(id);
    if(!candidateVerification) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await CandidateVerificationController(id);
    return res.json({
        message: "candidate verification  updated successfully"
    })
})

router.delete('/:id/delete', async (req, res)=> {
    let { id } = req.params;

    let data = await CandidateVerificationController.deleteCandidateVerification(id);
    return res.json({
        data
    })
})



module.exports = router;
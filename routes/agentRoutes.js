const router  = require('express').Router()
const AgentVerificationController = require('../controllers/agentVerification.controller')


router.get('', async(req, res) => {
    let agentVerifications = await AgentVerificationController.fetchAgentVerifications();
    res.json({
        data: agentVerifications
    })
})

router.post('/add', async (req, res) => {
    let data = req.body;
    let agentVerification = await AgentVerificationController.addAgentVerification(data)
    
    return res.status(201).json({
        message: agentVerification
    })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await AgentVerificationController.getAgentVerification(id);

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
    let agentVerification = await AgentVerificationController.getAgentVerification(id);
    if(!agentVerification) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await AgentVerificationController(id);
    return res.json({
        message: "agent verification  updated successfully"
    })
})

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let agentDetails = await AgentVerificationController.deleteAgentVerification(id);
    return res.json({
        agentDetails
    })
})



module.exports = router;
const router  = require('express').Router()
const EmployerIndividualController = require('../controllers/employerIndividual.controller')


router.get('', async(req, res) => {
    let employerIndividuals = await EmployerIndividualController.fetchEmployerIndividuals();
    res.json({
        data: employerIndividuals
    })
})

router.post('/add', async (req, res) => {
    let data = req.body;
    let employerIndividual = await EmployerIndividualController.addEmployerIndividual(data)
    
    return res.status(201).json({
        message: employerIndividual
    })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await EmployerVerificationController.getEmployerIndividual(id);

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
    let employerIndividual = await EmployerIndividualController.getEmployerIndividual(id);
    if(!employerIndividual) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await EmployerIndividualController(id);
    return res.json({
        message: "employer verification  updated successfully"
    })
})

router.delete('/:id/delete', async (req, res)=> {
    let { id } = req.params;

    let data = await EmployerIndividualController.deleteEmployerIndividual(id);
    return res.json({
        data
    })
})



module.exports = router;
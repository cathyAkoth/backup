const router  = require('express').Router()
const EmployerCompanyController = require('../controllers/employerCompany.controller')


router.get('', async(req, res) => {
    let employerCompanys = await EmployerCompanyController.fetchEmployerCompanys();
    res.json({
        data: employerCompanys
    })
})

router.post('/add', async (req, res) => {
    let data = req.body;
    let employerCompany = await EmployerCompanyController.addEmployerCompany(data)
    
    return res.status(201).json({
        message: employerCompany
    })
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;

    let data =  await EmployerCompanyController.getEmployerCompany(id);

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
    let employerCompany = await EmployerCompanyController.getEmployerCompany(id);
    if(!employerCompany) {
        return res.status(404).json({
            message: "verification not found"
        }) 
    }
    await EmployerCompanyController(id);
    return res.json({
        message: "employer verification  updated successfully"
    })
})

router.delete('/:id/delete', async (req, res)=> {
    let { id } = req.params;

    let data = await EmployerCompanyController.deleteEmployerCompany(id);
    return res.json({
        data
    })
})



module.exports = router;
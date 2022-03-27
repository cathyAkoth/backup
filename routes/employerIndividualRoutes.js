const router  = require('express').Router()
const EmployerIndividualController = require('../controllers/employerIndividual.controller');
const EmployerIndividual = require('../models/EmployerIndividual');


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

    let data =  await EmployerIndividualController.getEmployerIndividual(id);

    if(!data) {
        return res.status(404).json({
            message: "details not found"
        })
    }
    return res.json({
        data
    })
})

// router.put('/update/:id', async(req, res) => {
    
//     let {id} = req.params
//     let employerIndividual = await EmployerIndividualController.getEmployerIndividual(id);
//     if(!employerIndividual) {
//         return res.status(404).json({
//             message: "verification not found"
//         }) 
//     }
//     await  EmployerIndividualController(id);
//     return res.json({
//         message: "employer verification  updated successfully"
//     })
// })


router.get('/update/:id', async (req, res) => {
    try {
        const updateEmp = await EmployerIndividual.findOne({ _id: req.params.id })
        res.render('updateEmp', { user: updateEmp })
    } catch (err) {
        res.status(400).send("Unable to find item in the database");
    }
  })


// Route to save the updated data.
router.post('/update', async (req, res) => {
  try {
      await EmployerIndividual.findOneAndUpdate({_id:req.query.id}, req.body)
     res.redirect('/employer');
  } catch (err) {
      res.status(404).send("Unable to update item in the database");
  }
})

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await EmployerIndividualController.deleteEmployerIndividual(id);
    return res.json({
        data
    })
})



module.exports = router;
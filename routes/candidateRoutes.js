const router  = require('express').Router()
const multer = require('multer');
const CandidateVerificationController = require('../controllers/candidateVerification.controller');
const CandidateVerification = require('../models/CandidateVerification');


router.get('', async(req, res) => {
    let candidateVerifications = await CandidateVerificationController.fetchCandidateVerifications();
    res.json({
        data: candidateVerifications
    })
})

// Image upload.
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
    });
    var upload = multer({ storage: storage })

    

    
    // Save data 
// router.post('/add', upload.single('image'), async (req, res) => {
//     if (req.session) {
//     try {
//         const candidateVerification = new CandidateVerification(req.body);
//         candidateVerification.image = req.file.path;
//         await candidateVerification.save()
//         // res.redirect('/')
//     } catch (err) {
//         console.log(err);
//         res.send('Sorry! Something went wrong.');
//     }
// }
// })

router.post('/add',upload.single('image'), async (req, res) => {
    let data = req.body;
    
   
    let candidateVerification = new CandidateVerification(data)
    candidateVerification.image = req.file.path;
    
    await candidateVerification.save()

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

// get data from database to UI
router.get('/', async (req, res) => {
    try {
        // Find all the data in the candidate verification
        let candidateVerificationDetails = await CandidateVerification.find();
        if (req.query.role) {
            candidateVerificationDetails = await CandidateVerification.find({ role: req.query.role })
          }
        res.render( { users: candidateVerificationDetails })
    } catch (err) {
        res.send('Failed to retrive candidate verification details');
    }
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

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await CandidateVerificationController.deleteCandidateVerification(id);
    return res.json({
        data
    })
})



module.exports = router;
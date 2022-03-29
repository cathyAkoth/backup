const router  = require('express').Router()
const multer = require('multer');
const CandidateVerificationController = require('../controllers/candidateVerification.controller');
const CandidateVerification = require('../models/CandidateVerification');
const path = require('path')

/**
 * @swagger
 * components:
 *   schemas:
 *     candidateVerification:
 *       type: object
 *       
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id 
 *         image:
 *           type: string
 *         firstName:
 *           type: string
 *           
 *         lastName:
 *           type: string
 *         age:
 *           type: number
 *         dob:
 *           type: Date
 *         
 *         phone:
 *           type: string
 *         numberOfKids:
 *           type: number
 *         nationality:
 *           type: string
 * 
 *         countryOfResidence::
 *            type: string
 *         district: 
 *             type: string
 * 
 *         religion: 
 *             type : string
 *         educationLevel:
 *             type : string
 *         email:
 *             type : string
 *         whatsAppNo : 
              
    
 */

 /**
  * @swagger
  * tags:
  *   name: CandidateVerification
  *   
  */

/**
 * @swagger
 * /candidateVerification:
 *   get:
 *     summary: Returns the list of allcandidates verified
 *     tags: [CandidateVerification]
 *     responses:
 *       200:
 *         description: The list of the candidates verified
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/candidateVerification'
 */

 
 /**
  * @swagger
  * tags:
  *   name: CandidateVerification
  *   
  */

/**
 * @swagger
 * /candidateVerification:
 *   get:
 *     summary: Returns the list of all candidates Verified
 *     tags: [CandidateVerification]
 *     responses:
 *       200:
 *         description: The list of all candidates verified
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/candidateVerification'
 */


router.get('', async(req, res) => {
    let candidateVerifications = await CandidateVerificationController.fetchCandidateVerifications();
    res.json({
        data: candidateVerifications
    })
})

// Image upload.
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
//     });

      
    
 /**
 * @swagger
 * /candidateVerification/add:
 *   post:
 *     summary: creates a new verification
 *     tags: [CandidateVerification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/candidateVerification'
 *     responses:
 *       200:
 *         description: The candidate was successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/candidateVerification'
 *       500:
 *         description: Some server error
 */
  

// router.post('/add',upload.single('image'), async (req, res) => {
//     let data = req.body;
    

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  var upload = multer({ storage: storage });
  
  var candidateVerification = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'fil', maxCount: 1 }])

  router.post('/add',candidateVerification, function (req, res, next){
    if(req.files){
        console.log(req.files)

        console.log("files uploaded")
    }
    
    //  let data = req.body;
    //  let candidateVerification = await CandidateVerification.addCandidateVerification(data);
    //  return res.status(201).json({
    //     message: candidateVerification
    // })
    
     

    
    
})

/**
 * @swagger
 * /candidateVerification/{id}:
 *   get:
 *     summary: Get the candidateverification by id
 *     tags: [CandidateVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The candidateVerification id
 *     responses:
 *       200:
 *         description: The candidateVerification description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/candidateVerification'
 *       404:
 *         description: The CandidateVerification was not found
 */


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

/**
 * @swagger
 * /candidateVerification/update/{id}:
 *  put:
 *    summary: Update the candidateVerification by the id
 *    tags: [CandidateVerification]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The candidateVerification id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/candidateVerification'
 *    responses:
 *      200:
 *        description: The CandidateVerification was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/candidateVerification'
 *      404:
 *        description: The CandidateVerification was not found
 *      500:
 *        description: Some error happened
 */


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


/**
 * @swagger
 * /candidateVerification/delete/{id}:
 *   delete:
 *     summary: Remove the candidateVerification by id
 *     tags: [CandidateVerification]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The CandidateVerified id
 * 
 *     responses:
 *       200:
 *         description: The candidateVerification was deleted
 *       404:
 *         description: The candidateVerification was not found
 */

router.delete('/delete/:id', async (req, res)=> {
    let { id } = req.params;

    let data = await CandidateVerificationController.deleteCandidateVerification(id);
    return res.json({
        data
    })
})



module.exports = router;
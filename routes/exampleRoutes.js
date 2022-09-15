import express from 'express';
import expressValidator from 'express-validator';

const {body, validationResult} = expressValidator;

const router = express.Router();

router.get('/',(req, res) => {
    return res.status(200).send("welcome to the example routes");
});

router.post('/validateuser', body('email').isEmail(),body('password').isLength({min:5}),(req, res) => {

    const errors = validationResult(req);
    console.log("the errors object is", errors)
    //if there are errors (errors is not empty)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //information we receive from http body 
    const {email, password} = req.body;

    const user = {
        email, 
        password
    }

    return res.status(200).json({message:'User was added', userObject:user});

});

router.post('/sanitizeuser', body('email').isEmail().normalizeEmail(),(req, res) => {

    const errors = validationResult(req);
    console.log("the errors object is", errors)
    //if there are errors (errors is not empty)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //information we receive from http body 
    const {email, password} = req.body;

    const user = {
        email, 
        password
    }

    return res.status(200).json({message:'User was added', userObject:user});

});

//trim removes whitespaces around the value
//try with your phone
router.post('/checkmobilephone',body('phonenumber').trim().isMobilePhone(['de-DE']),(req, res) => {
    const errors = validationResult(req);
    //if there are errors (errors is not empty)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //information we receive from http body
    const {phonenumber} = req.body;

    return res.status(200).json(phonenumber)
})

router.post('/statement',body('statement').escape(),(req, res) => {
    const errors = validationResult(req);
    //if there are errors (errors is not empty)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //information we receive from http body
    const {statement} = req.body;

    return res.status(200).json({message:'This is our statement', statementObject:statement})
})


export default router;
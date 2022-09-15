import expressValidator from 'express-validator';
import { capitalizeFirstLetter } from '../helpers/sanitizationHelper.js';


const {body, validationResult} = expressValidator;

export const validateUser = [
    body('firstname')
    .exists()
    .trim()
    .isAlpha('de-DE','en-US').withMessage("firstname should contain only letters")
    .isLength({min:1, max:50}).withMessage('Firstname should not be empty, and be more than one and less than 50 characters'),
    function(req, res, next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:'Validation errors firstname', error:errors});
        }

        next();
    }, 
    body('lastname')
    .exists()
    .trim()
    .isAlpha('de-DE','en-US').withMessage("lastname should contain only letters")
    .isLength({min:1, max:50}).withMessage('Lastname should not be empty, and be more than one and less than 50 characters'),
    function(req, res, next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:'Validation errors lastname', error:errors});
        }

        next();
    }, 
    body('email')
    .exists()
    .trim()
    .isEmail().withMessage("This is not a valid email"),
    function(req, res, next){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({message:'Validation errors email', error:errors})
        }

        next();
    }
]

export const sanitizeUser = [
    body('email').normalizeEmail(),
    (req, res, next) => {
        req.body.firstname = capitalizeFirstLetter(req.body.firstname);
        req.body.lastname = capitalizeFirstLetter(req.body.lastname);
        next();
    }
]
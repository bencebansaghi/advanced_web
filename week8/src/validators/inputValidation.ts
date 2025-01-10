import { body, ValidationChain } from "express-validator";

const validateUserLogin: ValidationChain[] = [
    body('email').trim().escape().isEmail().withMessage('Please enter a valid email address'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[#!&?@$%^&*]/).withMessage('Password must contain at least one special character')
];

const validateUserRegister: ValidationChain[] = [
    body('username').trim().escape().isLength({min:3, max: 25}).withMessage("Username must be between 3 and 25 characters."),
    ...validateUserLogin
];

export { validateUserRegister, validateUserLogin };
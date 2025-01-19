import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() });
    } else{
        next();
    }
};

export { handleValidationErrors }
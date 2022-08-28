import {Request, Response, NextFunction} from 'express';

const validate = (schema) => (req: Request, res: Response, next:NextFunction) => {
    try{
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }catch(e){
        return res.status(400).send(e.errors)
    }
}

export default validate;
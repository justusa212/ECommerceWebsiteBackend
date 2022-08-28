import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request<{},{}, CreateUserInput['body']>, res: Response){
    try{
        const user = await createUser(req.body);
        return res.status(200).send(user);
    }
    catch(e: any){
        console.log(e);
        return res.status(409).send(e.message);
    }
}

export async function getCurrentUser(req: Request,res: Response) {
    return res.send(res.locals.user)
} 
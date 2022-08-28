import { Express, Request, Response} from "express"
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler, googleOauthHandler } from "./controller/session.controller";
import {createUserHandler, getCurrentUser} from "./controller/user.controller"
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validate"
import { createSessionSchema } from "./schema/session.schema";
import {createUserSchema} from "./schema/user.schema"
import {createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema} from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
 
function routes(app: Express){
    app.get('/healthcheck', (req: Request,res: Response) => res.sendStatus(200));

    app.post('/api/users', validate(createUserSchema), createUserHandler);

    app.get('/api/me', requireUser, getCurrentUser)

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions',requireUser, getUserSessionsHandler);

    app.delete('/api/sessions',requireUser, deleteSessionHandler);

    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler)

    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler)

    app.get('/api/products/:productId', validate(getProductSchema), getProductHandler)

    app.delete('/api/products/:productId', validate(deleteProductSchema), deleteProductHandler)

    app.get('/api/sessions/oauth/google', googleOauthHandler)
}
 
export default routes 
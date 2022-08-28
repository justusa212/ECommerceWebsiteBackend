import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Name is required"
        }).min(6, "Password is too short, should be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "passwordConfirmation is required"
        }),
        email: string({
            required_error: "email is required"
        }).email("not a valid email") 

    }).refine((data) => data.password === data.passwordConfirmation,{
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    })

})

export type CreateUserInput = TypeOf<typeof createUserSchema>
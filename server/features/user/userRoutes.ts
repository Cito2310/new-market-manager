import { Router } from "express";
import { check, param } from "express-validator";

import { createUser, updateUser, getUser, deleteUser, loginUser, updateUserByAdmin } from "./controllers";

import { checkFields } from '../../middlewares/checkFields';
import { validateJWT } from '../../middlewares/validateJWT';
import { hasRole } from '../../middlewares/hasRole';
import * as validation from "../../helpers/validation";

export const routeUser = Router();


routeUser.post("/register",[
    check("displayName", "displayName is required").trim().notEmpty(),
    check("displayName", "displayName not is string").trim().isString(),
    check("displayName", "displayName length can only be greater than 2 and less than 60 characters").trim().isLength({min: 2, max: 60}),

    check("password", "password is required").trim().notEmpty(),
    check("password", "password invalid").trim().isString(),
    check("password", "password length can only be greater than 8 and less than 32 characters").trim().isLength({min: 8, max: 32}),

    check("username", "username is required").trim().notEmpty(),
    check("username", "username not is string").trim().isString(),
    check("username", "username length can only be greater than 6 and less than 32 characters").trim().isLength({min: 6, max: 32}),
    check("username", "username invalid, it already exists").trim().custom(validation.usernameExist),

    checkFields
], createUser);


routeUser.put("/",[
    validateJWT,

    check("displayName", "displayName not is string").optional().trim().isString(),
    check("displayName", "displayName length can only be greater than 2 and less than 60 characters").optional().trim().isLength({min: 2, max: 60}),

    check("password", "password invalid").optional().trim().isString(),
    check("password", "password length can only be greater than 8 and less than 32 characters").optional().trim().isLength({min: 8, max: 32}),
    check("password", "password invalid, equal password").optional().trim().custom(validation.passwordEqual),

    check("username", "username not is string").optional().trim().isString(),
    check("username", "username length can only be greater than 6 and less than 32 characters").optional().trim().isLength({min: 6, max: 32}),
    check("username", "username invalid, it already exists").optional().trim().custom(validation.usernameExist),
    check("username", "username invalid, equal username").optional().trim().custom(validation.usernameEqual),

    checkFields
], updateUser);


routeUser.patch("/:id",[
    validateJWT,
    hasRole("admin"),

    param("id", "invalid user id").isMongoId(),

    check("role", "role must be cashier, admin or visit").optional().isIn(["cashier", "admin", "visit"]),
    check("active", "active must be a boolean").optional().isBoolean(),

    checkFields
], updateUserByAdmin);


routeUser.get("/",[ validateJWT, hasRole("admin", "cashier") ], getUser);


routeUser.delete("/",[ validateJWT, hasRole("admin", "cashier") ], deleteUser);


routeUser.post("/login",[
    check("password", "password invalid").trim().isString(),
    check("password", "password invalid").trim().isLength({max: 100}),

    check("username", "username invalid").trim().isString(),
    check("username", "username invalid").trim().isLength({max: 100}),
    checkFields
], loginUser);
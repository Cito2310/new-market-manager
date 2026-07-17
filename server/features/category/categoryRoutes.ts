import { Router } from "express";
import { check, param } from "express-validator";

import { createCategory, getCategories, updateCategory, deleteCategory } from "./controllers";
import { categoryExists, categoryUpdatable } from "./categoryValidators";

import { checkFields } from "../../middlewares/checkFields";
import { validateJWT } from "../../middlewares/validateJWT";
import { hasRole } from "../../middlewares/hasRole";

import { SECTIONS } from "../../../shared/types";

export const routeCategory = Router();


routeCategory.post("/", [
    validateJWT,
    hasRole("admin", "cashier"),

    check("section", "section is required").notEmpty(),
    check("section", "section invalid").isIn([...SECTIONS]),

    check("name", "name is required").trim().notEmpty(),
    check("name", "name length can only be between 2 and 60 characters").trim().isLength({ min: 2, max: 60 }),

    check("subcategories", "subcategories must be an array").optional().isArray(),
    check("subcategories.*", "each subcategory must be a string").isString(),
    check("brands", "brands must be an array").optional().isArray(),
    check("brands.*", "each brand must be a string").isString(),

    check("name").custom(categoryExists),

    checkFields
], createCategory);


routeCategory.get("/", [ validateJWT, hasRole("admin", "cashier", "visit") ], getCategories);


routeCategory.patch("/:id", [
    validateJWT,
    hasRole("admin", "cashier"),

    param("id", "invalid category id").isMongoId().bail().custom(categoryUpdatable),

    check("section", "section invalid").optional().isIn([...SECTIONS]),

    check("name", "name length can only be between 2 and 60 characters").optional().trim().isLength({ min: 2, max: 60 }),

    check("subcategories", "subcategories must be an array").optional().isArray(),
    check("subcategories.*", "each subcategory must be a string").isString(),
    check("brands", "brands must be an array").optional().isArray(),
    check("brands.*", "each brand must be a string").isString(),

    checkFields
], updateCategory);


routeCategory.delete("/:id", [
    validateJWT,
    hasRole("admin", "cashier"),

    param("id", "invalid category id").isMongoId(),

    checkFields
], deleteCategory);

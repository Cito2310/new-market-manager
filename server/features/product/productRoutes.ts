import { Router } from "express";
import { check, param } from "express-validator";

import { createProduct, getProducts, updateProduct, deleteProduct } from "./controllers";
import { barcodesAvailable } from "./productValidators";

import { checkFields } from "../../middlewares/checkFields";
import { validateJWT } from "../../middlewares/validateJWT";
import { hasRole } from "../../middlewares/hasRole";

import { SIZE_UNITS } from "../../../shared/types";

export const routeProduct = Router();


routeProduct.post("/", [
    validateJWT,
    hasRole("admin", "cashier"),

    check("details.name", "details.name is required").trim().notEmpty(),
    check("details.brand", "details.brand is required").trim().notEmpty(),
    check("details.category", "details.category is required").trim().notEmpty(),
    check("details.subcategory", "details.subcategory is required").trim().notEmpty(),
    check("details.size", "details.size must be a positive number").isFloat({ gt: 0 }),
    check("details.sizeUnit", "details.sizeUnit invalid").isIn([...SIZE_UNITS]),
    check("details.barcodes", "details.barcodes must be an array").optional().isArray(),
    check("details.barcodes.*", "each barcode must be a string").isString(),
    check("details.barcodes").custom(barcodesAvailable),
    check("details.tags", "details.tags must be an array").optional().isArray(),
    check("details.tags.*", "each tag must be a string").isString(),

    check("sell.cost", "sell.cost must be a number >= 0").isFloat({ min: 0 }),
    check("sell.salePrice", "sell.salePrice must be a number >= 0").isFloat({ min: 0 }),
    check("sell.weighable", "sell.weighable must be a boolean").optional().isBoolean(),
    check("sell.promotions", "sell.promotions must be an array").optional().isArray(),
    check("sell.promotions.*.minQuantity", "promotion.minQuantity must be a positive integer").isInt({ gt: 0 }),
    check("sell.promotions.*.pricePerUnit", "promotion.pricePerUnit must be a number >= 0").isFloat({ min: 0 }),

    check("stock.quantity", "stock.quantity must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.enabled", "stock.alerts.enabled must be a boolean").optional().isBoolean(),
    check("stock.alerts.warning", "stock.alerts.warning must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.low", "stock.alerts.low must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.critical", "stock.alerts.critical must be a number >= 0").optional().isFloat({ min: 0 }),

    check("expiry.batches", "expiry.batches must be an array").optional().isArray(),
    check("expiry.batches.*.quantity", "batch.quantity must be a positive number").isFloat({ gt: 0 }),
    check("expiry.batches.*.expirationDate", "batch.expirationDate must be a valid date").isISO8601(),

    checkFields
], createProduct);


routeProduct.get("/", [ validateJWT, hasRole("admin", "cashier", "visit") ], getProducts);


routeProduct.patch("/:id", [
    validateJWT,
    hasRole("admin", "cashier"),

    param("id", "invalid product id").isMongoId(),

    check("details.name", "details.name is required").optional().trim().notEmpty(),
    check("details.brand", "details.brand is required").optional().trim().notEmpty(),
    check("details.category", "details.category is required").optional().trim().notEmpty(),
    check("details.subcategory", "details.subcategory is required").optional().trim().notEmpty(),
    check("details.size", "details.size must be a positive number").optional().isFloat({ gt: 0 }),
    check("details.sizeUnit", "details.sizeUnit invalid").optional().isIn([...SIZE_UNITS]),
    check("details.barcodes", "details.barcodes must be an array").optional().isArray(),
    check("details.barcodes.*", "each barcode must be a string").isString(),
    check("details.barcodes").optional().custom(barcodesAvailable),
    check("details.tags", "details.tags must be an array").optional().isArray(),
    check("details.tags.*", "each tag must be a string").isString(),

    check("sell.cost", "sell.cost must be a number >= 0").optional().isFloat({ min: 0 }),
    check("sell.salePrice", "sell.salePrice must be a number >= 0").optional().isFloat({ min: 0 }),
    check("sell.weighable", "sell.weighable must be a boolean").optional().isBoolean(),
    check("sell.promotions", "sell.promotions must be an array").optional().isArray(),
    check("sell.promotions.*.minQuantity", "promotion.minQuantity must be a positive integer").isInt({ gt: 0 }),
    check("sell.promotions.*.pricePerUnit", "promotion.pricePerUnit must be a number >= 0").isFloat({ min: 0 }),

    check("stock.quantity", "stock.quantity must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.enabled", "stock.alerts.enabled must be a boolean").optional().isBoolean(),
    check("stock.alerts.warning", "stock.alerts.warning must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.low", "stock.alerts.low must be a number >= 0").optional().isFloat({ min: 0 }),
    check("stock.alerts.critical", "stock.alerts.critical must be a number >= 0").optional().isFloat({ min: 0 }),

    check("expiry.batches", "expiry.batches must be an array").optional().isArray(),
    check("expiry.batches.*.quantity", "batch.quantity must be a positive number").isFloat({ gt: 0 }),
    check("expiry.batches.*.expirationDate", "batch.expirationDate must be a valid date").isISO8601(),

    checkFields
], updateProduct);


routeProduct.delete("/:id", [
    validateJWT,
    hasRole("admin", "cashier"),

    param("id", "invalid product id").isMongoId(),

    checkFields
], deleteProduct);

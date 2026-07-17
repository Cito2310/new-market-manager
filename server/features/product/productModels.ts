import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

import { SIZE_UNITS } from "../../../shared/types";

const promotionSchema = new Schema(
    {
        minQuantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
    },
    { _id: false }
);

const detailsSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        brand: { type: String, required: true, trim: true },
        category: { type: String, required: true },
        subcategory: { type: String, required: true },
        barcodes: { type: [String], default: [] },
        size: { type: Number, required: true },
        sizeUnit: { type: String, enum: [...SIZE_UNITS], required: true },
        tags: { type: [String], default: [] },
    },
    { _id: false }
);

const sellSchema = new Schema(
    {
        cost: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        promotions: { type: [promotionSchema], default: [] },
        weighable: { type: Boolean, default: false },
    },
    { _id: false }
);

const stockSchema = new Schema(
    {
        quantity: { type: Number, required: true, default: 0 },
        alerts: {
            enabled: { type: Boolean, default: false },
            warning: { type: Number, default: 0 },
            low: { type: Number, default: 0 },
            critical: { type: Number, default: 0 },
        },
    },
    { _id: false }
);

// Batch keeps its own _id (referenced individually)
const batchSchema = new Schema({
    quantity: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    receivedAt: { type: Date, default: Date.now },
});

const expirySchema = new Schema(
    {
        batches: { type: [batchSchema], default: [] },
    },
    { _id: false }
);

const productSchema = new Schema(
    {
        details: { type: detailsSchema, required: true },
        sell: { type: sellSchema, required: true },
        stock: { type: stockSchema },
        expiry: { type: expirySchema },
        createdBy: { type: String, required: true },
        updatedBy: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// a barcode identifies a single active product (freed up on soft delete)
productSchema.index(
    { "details.barcodes": 1 },
    { unique: true, partialFilterExpression: { active: true } }
);

export type ProductDocument = HydratedDocument<InferSchemaType<typeof productSchema>>;
export const ProductModel = model("Product", productSchema);

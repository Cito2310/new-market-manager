import { useState } from "react";
import axios from "axios";
import type {
    CreateProductBody,
    UpdateProductBody,
    Product,
    SizeUnit,
} from "../../../../../shared/types";
import { useAppDispatch } from "../../../app/store/hooks";
import { createProduct, updateProduct } from "../productApi";
import { upsertProduct } from "../productSlice";
import { useCategoryCascade } from "./useCategoryCascade";

// A promotion row while editing: numbers are kept as strings until submit.
export type PromotionDraft = {
    minQuantity: string;
    pricePerUnit: string;
};

// A batch row while editing: numbers/dates are kept as strings until submit.
export type BatchDraft = {
    quantity: string;
    expirationDate: string;
    receivedAt: string;
};

// Turns a persisted date into the "YYYY-MM-DD" a <input type="date"> expects.
const toDateInput = (value: Date | string) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

// Owns the whole product form: field state, the category cascade, the optional
// stock/expiry blocks, client-side guards and the create/update request.
// Passing `product` switches the form to edit mode (prefilled + PATCH); omitting
// it keeps the create mode (POST). `onClose` runs after a successful save.
export const useProductForm = (onClose: () => void, product?: Product) => {
    const dispatch = useAppDispatch();

    const cascade = useCategoryCascade(
        product && {
            category: product.details.category,
            subcategory: product.details.subcategory,
            brand: product.details.brand,
        },
    );

    // details
    const [name, setName] = useState(product?.details.name ?? "");
    const [size, setSize] = useState(product ? String(product.details.size) : "");
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>(product?.details.sizeUnit ?? "unit");
    const [barcodes, setBarcodes] = useState<string[]>(
        product?.details.barcodes.length ? product.details.barcodes : [""],
    );
    const [tags, setTags] = useState<string[]>(
        product?.details.tags.length ? product.details.tags : [""],
    );

    // sell
    const [cost, setCost] = useState(product ? String(product.sell.cost) : "");
    const [salePrice, setSalePrice] = useState(product ? String(product.sell.salePrice) : "");
    const [weighable, setWeighable] = useState(product?.sell.weighable ?? false);
    const [promotions, setPromotions] = useState<PromotionDraft[]>(
        product?.sell.promotions.map((p) => ({
            minQuantity: String(p.minQuantity),
            pricePerUnit: String(p.pricePerUnit),
        })) ?? [],
    );

    // stock (optional block)
    const [stockOpen, setStockOpen] = useState(!!product?.stock);
    const [stockQuantity, setStockQuantity] = useState(
        product?.stock ? String(product.stock.quantity) : "",
    );
    const [alertsEnabled, setAlertsEnabled] = useState(product?.stock?.alerts.enabled ?? false);
    const [warning, setWarning] = useState(
        product?.stock ? String(product.stock.alerts.warning) : "",
    );
    const [low, setLow] = useState(product?.stock ? String(product.stock.alerts.low) : "");
    const [critical, setCritical] = useState(
        product?.stock ? String(product.stock.alerts.critical) : "",
    );

    // expiry (optional block, a growable list of batches — prefilled from all of them)
    const [expiryOpen, setExpiryOpen] = useState(!!product?.expiry?.batches.length);
    const [batches, setBatches] = useState<BatchDraft[]>(
        product?.expiry?.batches.map((b) => ({
            quantity: String(b.quantity),
            expirationDate: toDateInput(b.expirationDate),
            receivedAt: toDateInput(b.receivedAt),
        })) ?? [],
    );

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Trims each entry and drops the empty rows left by the growable inputs.
    const clean = (values: string[]) =>
        values.map((v) => v.trim()).filter(Boolean);

    // Minimal guard for the fields the backend requires; the rest is validated
    // server-side and surfaced through `error`.
    const validate = () => {
        if (!name.trim()) return "El nombre es obligatorio.";
        if (!cascade.category || !cascade.subcategory || !cascade.brand)
            return "Elegí categoría, subcategoría y marca.";
        if (!size || Number(size) <= 0) return "El tamaño debe ser mayor a 0.";
        if (cost === "" || salePrice === "")
            return "Completá el costo y el precio de venta.";
        return null;
    };

    const buildBody = (): CreateProductBody => {
        const body: CreateProductBody = {
            details: {
                name: name.trim(),
                brand: cascade.brand,
                category: cascade.category,
                subcategory: cascade.subcategory,
                barcodes: clean(barcodes),
                size: Number(size),
                sizeUnit,
                tags: clean(tags),
            },
            sell: {
                cost: Number(cost),
                salePrice: Number(salePrice),
                weighable,
                promotions: promotions.map((p) => ({
                    minQuantity: Number(p.minQuantity),
                    pricePerUnit: Number(p.pricePerUnit),
                })),
            },
        };

        if (stockOpen) {
            body.stock = {
                quantity: Number(stockQuantity),
                alerts: {
                    enabled: alertsEnabled,
                    warning: Number(warning),
                    low: Number(low),
                    critical: Number(critical),
                },
            };
        }

        if (expiryOpen) {
            body.expiry = {
                batches: batches.map((b) => ({
                    quantity: Number(b.quantity),
                    expirationDate: new Date(b.expirationDate),
                    receivedAt: new Date(b.receivedAt),
                })),
            };
        }

        return body;
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        const invalid = validate();
        if (invalid) {
            setError(invalid);
            return;
        }

        setError(null);
        setIsLoading(true);
        try {
            let saved: Product;
            if (product) {
                const body: UpdateProductBody = buildBody();
                // A closed block that the product used to have is cleared (null).
                if (!stockOpen && product.stock) body.stock = null;
                if (!expiryOpen && product.expiry) body.expiry = null;
                saved = await updateProduct(product._id, body);
            } else {
                saved = await createProduct(buildBody());
            }
            dispatch(upsertProduct(saved));
            onClose();
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.msg ?? err.message)
                : product
                    ? "No se pudo actualizar el producto"
                    : "No se pudo crear el producto";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isEditing: !!product,
        cascade,
        details: { name, setName, size, setSize, sizeUnit, setSizeUnit, barcodes, setBarcodes, tags, setTags },
        sell: { cost, setCost, salePrice, setSalePrice, weighable, setWeighable, promotions, setPromotions },
        stock: {
            open: stockOpen,
            toggle: () => setStockOpen((v) => !v),
            quantity: stockQuantity,
            setQuantity: setStockQuantity,
            alertsEnabled,
            setAlertsEnabled,
            warning,
            setWarning,
            low,
            setLow,
            critical,
            setCritical,
        },
        expiry: {
            open: expiryOpen,
            toggle: () => setExpiryOpen((v) => !v),
            batches,
            setBatches,
        },
        error,
        isLoading,
        submit,
    };
};

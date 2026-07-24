import { useState } from "react";
import axios from "axios";
import type { CreateProductBody, SizeUnit } from "../../../../../shared/types";
import { createProduct } from "../productApi";
import { useCategoryCascade } from "./useCategoryCascade";

// A promotion row while editing: numbers are kept as strings until submit.
export type PromotionDraft = {
    minQuantity: string;
    pricePerUnit: string;
};

// Owns the whole "add product" form: field state, the category cascade, the
// optional stock/expiry blocks, client-side guards and the create request.
// `onClose` is called after a successful save so the modal can dismiss itself.
export const useAddProduct = (onClose: () => void) => {
    const cascade = useCategoryCascade();

    // details
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("unit");
    const [barcodes, setBarcodes] = useState<string[]>([""]);
    const [tags, setTags] = useState<string[]>([""]);

    // sell
    const [cost, setCost] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [weighable, setWeighable] = useState(false);
    const [promotions, setPromotions] = useState<PromotionDraft[]>([]);

    // stock (optional block)
    const [stockOpen, setStockOpen] = useState(false);
    const [stockQuantity, setStockQuantity] = useState("");
    const [alertsEnabled, setAlertsEnabled] = useState(false);
    const [warning, setWarning] = useState("");
    const [low, setLow] = useState("");
    const [critical, setCritical] = useState("");

    // expiry (optional block, a single batch)
    const [expiryOpen, setExpiryOpen] = useState(false);
    const [batchQuantity, setBatchQuantity] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [receivedAt, setReceivedAt] = useState("");

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
                batches: [
                    {
                        quantity: Number(batchQuantity),
                        expirationDate: new Date(expirationDate),
                        receivedAt: new Date(receivedAt),
                    },
                ],
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
            await createProduct(buildBody());
            onClose();
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? (err.response?.data?.msg ?? err.message)
                : "No se pudo crear el producto";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
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
            batchQuantity,
            setBatchQuantity,
            expirationDate,
            setExpirationDate,
            receivedAt,
            setReceivedAt,
        },
        error,
        isLoading,
        submit,
    };
};

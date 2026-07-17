import { Auditable } from "./Auditable";

export type Section = "almacén" | "limpieza" | "perfumería" | "lácteos" | "bebidas" | "congelados" | "bazar" | "pollería" | "fiambrería";


export interface Category extends Auditable {
    _id: string;
    section: Section;
    name: string;
    subcategories: string[];
    brands: string[];
}
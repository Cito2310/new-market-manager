import { Auditable } from "./Auditable";

export const SECTIONS = [
    "almacén",
    "limpieza",
    "perfumería",
    "lácteos",
    "bebidas",
    "congelados",
    "bazar",
    "pollería",
    "fiambrería",
] as const;

export type Section = (typeof SECTIONS)[number];


export interface Category extends Auditable {
    _id: string;
    section: Section;
    name: string;
    subcategories: string[];
    brands: string[];
    active: boolean;
}

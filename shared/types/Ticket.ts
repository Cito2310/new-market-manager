export interface TicketLine {
    _id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Ticket {
    _id: string;
    timestamp: number;
    displayDate: string;
    products: TicketLine[];
    total: number;
}
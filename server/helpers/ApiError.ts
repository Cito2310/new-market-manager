// Error carrying an HTTP status. Formatted centrally by the errorHandler.
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
    }
}

interface FormErrorProps {
    message?: string | null;
    className?: string;
}

// CHECKED
export const FormError = ({ message, className = "" }: FormErrorProps) => {
    if (!message) return null;
    return <p className={`ml-1 text-sm text-red-500 ${className}`}>{message}</p>;
};

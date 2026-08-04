// Money as shown on screen: "$17.100". Capped at two decimals for weighable items.
export const formatMoney = (amount: number) =>
    `$${amount.toLocaleString("es-AR", { maximumFractionDigits: 2 })}`;

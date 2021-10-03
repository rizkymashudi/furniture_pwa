export const numberFormat = function numFormat(price){
    const currency = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });
    return currency.format(price)
}

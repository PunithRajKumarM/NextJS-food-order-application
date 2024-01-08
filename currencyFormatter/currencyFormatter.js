export function currencyFormatter(value) {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);

  return currency;
}

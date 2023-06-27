export default function formatNumber(number) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      maximumSignificantDigits: 3,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }
  ).format(number);
}

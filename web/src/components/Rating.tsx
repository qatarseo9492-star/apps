export function Rating({ value }: { value: number }) {
  return <span className="inline-flex items-center">{value.toFixed(1)}★</span>;
}

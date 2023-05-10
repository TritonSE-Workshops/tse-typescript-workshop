function format(value: string | string[] | number | null): string {
  if (value === null) {
    return "";
  }
  if (typeof value === "number") {
    return "page " + value;
  }
  if (Array.isArray(value)) {
    return value.join("\n");
  }
  return value;
}

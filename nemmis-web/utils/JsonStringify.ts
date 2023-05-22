export default function JsonStringify(obj: any): string {
  const replacer = (key: string, value: any) => {
    if (typeof value === "bigint") {
      return value.toString();
    } else {
      return value;
    }
  };
  return JSON.stringify(obj, replacer, 2);
}

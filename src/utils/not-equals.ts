import { pipe, equals, not } from "ramda";

export const notEquals: (x: any) => (x: any) => boolean = (x) =>
  pipe(equals(x), not);

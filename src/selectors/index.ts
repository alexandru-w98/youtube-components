import { pathOr } from "ramda";

export const selectCurrentWidth = pathOr(NaN, ["current", "clientWidth"]);

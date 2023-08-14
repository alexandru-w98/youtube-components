import React from "react";
import { createRoot } from "react-dom/client";
import { SwippableList } from "../src";

const items = [
  "All",
  "Mixes",
  "Mixesasdasdasdad",
  "Mixes",
  "Mixesasdasd",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
  "Mixes",
];

const root = createRoot(document.getElementById("app-root")!);
root.render(<SwippableList items={items} selectedIndex={0} />);

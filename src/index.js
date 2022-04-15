import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Mystery } from "./Mystery";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Mystery />
    {/* <App /> */}
  </StrictMode>
);

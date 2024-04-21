import { createGlobalStyle } from "styled-components";

const LightMode = createGlobalStyle`
:root {
  --background-color: #fffffe;
  --headline-color: #0d0d0d;
  --subheadline-color: #2a2a2a;
  --card-background-color: #eff0f3;
  --card-heading-color: #0d0d0d;
  --card-paragraph-color: #2a2a2a;
  --icons-stroke-color: #0d0d0d;
  --main-color: #eff0f3;
  --highlight-color: #ff8e3c;
  --secondary-color: #fffffe;
  --tertiary-color: #d9376e;
}
`;

export default LightMode;

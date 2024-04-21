import { createGlobalStyle } from "styled-components";

const DarkMode = createGlobalStyle`
:root {
    --background-color: #232946;
    --headline-color: #fffffe;
    --paragraph-color: #b8c1ec;
    --button-color: #eebbc3;
    --button-text-color: #232946;
    --illustration-stroke-color: #121629;
    --main-color: #b8c1ec;
    --highlight-color: #eebbc3;
    --secondary-color: #fffffe;
    --tertiary-color: #eebbc3;
  }
  
`;

export default DarkMode;

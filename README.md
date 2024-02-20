# Adding a new Flow Block
To add a new Flow Block to the avaiable flow blocks list, import the file and export it in the `FlowBlocks.ts` file

```ts
import { MyNewBlock } from "./MyNewBlock";

export const FlowBlocks = [
   /** Other blocks... */
   MyNewBlock
];
```

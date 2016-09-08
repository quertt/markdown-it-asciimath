# markdown-it-asciimath
Markdown-it plugin to include ascii-math. Still under Development.

Example input:
```md
    ```math
    1+1=2
    varphi = int_0^10 x^2 dx
    ```
```

Output:

![math output](https://cloud.githubusercontent.com/assets/18582541/18347144/3c7e5aaa-75c4-11e6-888f-c8e6f406fdc7.png)

## Usage
The ASCII-math needs to be converted to TeX, so the following file needs to be included:

```html
<script src="./node_modules/markdown-it-asciimath/ASCIIMathTeXImg.js"></script>
```

The plugin uses KaTeX to render TeX-math, so you need to include `katex.min.js`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css">
```

To use the plugin:

```javascript
var md = require('markdown-it')();

md.use(require("./node_modules/markdown-it-asciimath/index.js"));
```

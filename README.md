# markdown-it-asciimath
Markdown-it plugin to include ascii-math. Still under Development.

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

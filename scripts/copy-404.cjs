// scripts/copy-404.cjs
const fs = require("fs");
fs.copyFileSync("dist/index.html", "dist/404.html");
console.log("copied dist/index.html -> dist/404.html");

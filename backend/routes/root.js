import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();
// get allows regex in express
// this will only match if the requested route is only a slash OR /index with optional .html
router.get('^/$|/index(.html)?', (req, res) => {
    // sends the index.html located in views folder as response
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
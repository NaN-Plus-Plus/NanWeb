const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const pub = path.join(__dirname, "public");
const PORT = Number(process.env.PORT) || 8788;

const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".wav": "audio/wav", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".md": "text/plain; charset=utf-8",
};

const isFile = (f) => fs.existsSync(f) && fs.statSync(f).isFile();

function resolve(urlPath) {
  let p;
  try { p = decodeURIComponent(urlPath); } catch { return null; }
  const base = path.join(pub, p);
  if (base !== pub && !base.startsWith(pub + path.sep)) return null; 

  const candidates = [base, base + ".html", path.join(base, "index.html")];
  return candidates.find(isFile) || null;
}

http.createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let file = resolve(url.pathname);
    let status = 200;

    if (!file) {
      status = 404;
      const nf = path.join(pub, "404.html");
      file = isFile(nf) ? nf : null;
    }

    console.log(`${status} ${req.method} ${url.pathname}`);

    if (!file) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      return res.end("404 not found");
    }

    res.writeHead(status, {
      "content-type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("internal error (see terminal)");
  }
}).listen(PORT, () => console.log(`preview running: http://localhost:${PORT}  (ctrl+c to stop)`));
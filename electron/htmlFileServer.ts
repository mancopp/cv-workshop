import type { IncomingMessage, ServerResponse, Server } from "http";
import http from "http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let httpServer: Server | null = null;

export const serveFile = (html: Buffer<ArrayBufferLike>) => {
  let htmlContent = html.toString();
  const cssLink = `<link rel="stylesheet" href="http://localhost:8000/styles.css">`;
  htmlContent = htmlContent.replace("</head>", `${cssLink}</head>`);

  if (httpServer) {
    httpServer.close(() => {
      httpServer = null;
      createHttpServer(htmlContent);
    });
  } else {
    createHttpServer(htmlContent); // Ensure the server is created if it doesn't exist
  }
};

const createHttpServer = (htmlContent: string) => {
  httpServer = http.createServer(createServerRequestListener(htmlContent)).listen(8000);
}

const createServerRequestListener = (htmlContent: string) => {
  return (request: IncomingMessage, res: ServerResponse) => {
    if (request.url === "/styles.css") {
      fs.readFile(
        path.join(__dirname, "/../assets/css/overlay.css"),
        (err, css) => {
          if (err) {
            res.writeHead(500);
            res.end("Error loading CSS file");
          } else {
            res.setHeader("Content-Type", "text/css");
            res.end(css);
          }
        }
      );
    } else {
      res.setHeader("Content-Type", "text/html");

      // Doesn't fix the iframe cors error
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");

      res.write(htmlContent);
      res.end();
    }
  };
};

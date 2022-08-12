import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const port = 8080;

localStorage.clear();

const handler = async (req: Request): Promise<Response> => {
  let colores: string[] = [];
  if (localStorage.getItem("colores")) {
    colores = JSON.parse(localStorage.getItem("colores") || "");
  }
  if (req.method === "POST") {
    const { color } = await req.json();
    colores.push(color);
  }
  localStorage.setItem("colores", JSON.stringify(colores));
  return new Response(JSON.stringify(colores));
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);

await serve(handler, { port });

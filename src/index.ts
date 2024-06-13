import { Elysia } from "elysia";
import { parseWeb } from "./utils";

const v1 = new Elysia({ prefix: "/api/v1" })
v1.get("/", () => "Hello Elysia")
v1.get("/euro2024", async () => await parseWeb())
v1.get("/live-score", async ({query}) => await parseWeb(query?.url))

const app: Elysia = new Elysia()
app.use(v1)
app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { getEURO2024Data, parseWeb } from "./utils";

const v1 = new Elysia({ prefix: "/api/v1" })
v1.get("/euro2024", async () => await getEURO2024Data())
v1.get("/live-score", async ({query}) => await parseWeb(query?.url))
v1.post("/euro2024", async () => await parseWeb())

const app: Elysia = new Elysia()
app.use(swagger())
app.get("/", () => "Hello Live Score API! use [GET] /api/v1/euro2024 or /api/v1/live-score?url=.... to get the live score. | see more at /swagger")
app.use(v1)
app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

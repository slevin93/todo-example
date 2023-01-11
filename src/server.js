import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const port = 8080;
const router = new Router();

const todoItems = [];
const contentType = "BodyJson";

router.get("/todos", async (context) => {
  context.response.body = JSON.stringify(todoItems);
});

router.post("/todos", async (context) => {
  const todoItem = await context.request.body(contentType).value;
  todoItems.push(todoItem);
  context.response.body = todoItem;
});

router.put("/todos", async (context) => {
  const todoItem = await context.request.body(contentType).value;
  const index = todoItems.findIndex((x) => x.item === todoItem.item);

  todoItems[index] = todoItem;

  context.response.body = todoItems[index];
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/`,
    index: "public/index.html",
  });
});

console.log("Listening at http://localhost:" + port);
await app.listen({ port });

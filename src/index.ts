import "dotenv/config";
import { server } from "./core/http/server";

server.listen(3333, () => {
  console.log("👍 - Servidor rodando em ::3333");
});

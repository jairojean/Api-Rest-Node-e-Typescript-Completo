import { server } from "./server/server";

server.listen(process.env.PORT || 3333, ()=>{
  console.log(`API rodando na porta: ´${process.env.PORT}.`);
});
 
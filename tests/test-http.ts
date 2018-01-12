import {Application} from "@barlus/http/server/application";
import {process} from "@barlus/node/process";
import {projects} from "@barlus/http/handlers/projects";

let app = new Application();

app.use(projects({
    root:process.cwd(),
    project:'@qustomerz/crm'
}));

app.listen(10001);

console.info("Hello Server");
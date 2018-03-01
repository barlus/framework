import {Path} from "../../node/path";
import {Project, Service, ServiceOptions} from '../../compiler';
import {process} from "../../node/process";
import {Buffer} from "../../node/buffer";
import {HttpStatus} from "../contsants";
import {Resource, route, RouteHandler} from './router';

function contentType(ext) {
    switch (ext) {
        case '.js':
        case '.mjs':
        case '.ts':
            return "application/javascript; charset=utf-8"
        case '.json':
        case '.js.map':
            return "application/json; charset=utf-8"
        case '.xml':
            return "application/xml; charset=utf-8"
        case '.html':
            return "text/html; charset=utf-8"
        case '.css':
            return "text/css; charset=utf-8"
        case '.svg':
            return "image/svg; charset=utf-8"
        case '.png':
            return "image/png;"
    }
}

declare const ts;
let project: Project;
interface ProjectsOptions extends ServiceOptions {
    project?: string;
    root?: string;
    base?: string;
}
export class ProjectRoute extends RouteHandler {
    protected options: ProjectsOptions;
    constructor(options: ProjectsOptions) {
        super("/projects", [FilesRoute]);
        Service.service.init(Object.assign({
            root: process.cwd(),
            base: '/'
        }, options));
        if (options.project) {
            project = Service.service.projects.get(options.project);
        }
    }
}

@route('/')
export class FilesRoute extends Resource {
    protected options: ProjectsOptions;

    protected get request() {
        return this.context.request
    }
    protected get response() {
        return this.context.response
    }

    @route.get('/(.*)')
    async files(filename) {
        console.info(filename);
        try {
            let path = this.normalizePath('/' + filename);
            //let content = this.tryGetOutput(path);

            //Try Output
            let content: string | Buffer = Service.service.output.get(path);
            if (!content && project) {
                if (Service.service.output.has(`/${project.name}${path}`)) {
                    this.response.setStatus(HttpStatus.PERMANENT_REDIRECT);
                    this.response.headers.set('Location', `/${project.name}${path}`);
                    return;
                }
            }
            //
            if (!content) {
                content = this.tryGetResource(path);
            }
            if (!content) {
                this.response.setStatus(HttpStatus.NOT_FOUND);
                return 'Not Found'
            } else {
                this.response.headers.set("Content-Type", contentType(Path.extname(path)));
                return content.toString();
            }
        } catch (e) {
            this.response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return e.stack || e
        }
    }

    private normalizePath(path: string) {
        if (path.endsWith('/')) {
            path = `${path}/index.html`;
        }
        path = Path.normalize(path);
        if (Path.extname(path) == '') {
            path = `${path}.mjs`;
        }
        return path;
    }

    private tryGetOutput(path: string): string | Buffer {
        let result = Service.service.output.get(path);
        if (!result && project) {
            result = Service.service.output.get(`/${project.name}${path}`)
        }
        return result;
    }

    private tryGetResource(path: string): string | Buffer {
        for (let f of Service.service.files.values()) {
            if (path == f.uri) {
                return f.content;
            } else if (project && `/${project.name}${path}` == f.uri) {
                return f.content;
            }
        }
    }
}
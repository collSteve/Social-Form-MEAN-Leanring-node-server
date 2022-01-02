import Server from "./server/server";

export class App {
    public initServer(port: number) {
        const server = new Server(port);
        server.start();
    }
}

const app = new App();
app.initServer(4000);
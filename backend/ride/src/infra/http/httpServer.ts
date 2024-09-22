import express from "express";
import cors from "cors";
import { BaseException } from "../../exceptions/base.exception";

export default interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (e: any) {
        if (e instanceof BaseException) {
          res.status(422).json(e.toJSON());
        } else {
          res.status(422).json({ message: e.message });
        }
      }
    });
  }

  listen(port: number): void {
    return this.app.listen(port);
  }
}

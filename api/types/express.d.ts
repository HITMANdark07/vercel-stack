// Type augmentation for Express 5 types compatibility
import 'express';

declare module 'express-serve-static-core' {
  interface Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>> {
    json(body?: ResBody): this;
    status(code: number): this;
  }
  
  interface Request<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any,
    Locals extends Record<string, any> = Record<string, any>
  > {
    body: ReqBody;
  }
}

import { NextRequest, NextResponse } from 'next/server';

type RouteHandler = (req: NextRequest, params?: Record<string, string>) => Promise<NextResponse> | NextResponse;

type Route = {
  method: string;
  path: string;
  handler: RouteHandler;
  pattern: RegExp;
  paramNames: string[];
};

class Router {
  routes: Route[] = [];

  get(path: string, handler: RouteHandler) {
    this.addRoute('GET', path, handler);
  }

  post(path: string, handler: RouteHandler) {
    this.addRoute('POST', path, handler);
  }

  put(path: string, handler: RouteHandler) {
    this.addRoute('PUT', path, handler);
  }

  delete(path: string, handler: RouteHandler) {
    this.addRoute('DELETE', path, handler);
  }

  patch(path: string, handler: RouteHandler) {
    this.addRoute('PATCH', path, handler);
  }

  // Merge routes from another router instance
  use(router: Router) {
    router.routes.forEach((route) => {
      this.routes.push(route);
    });
  }

  private addRoute(method: string, path: string, handler: RouteHandler) {
    // Convert Express-style path to regex pattern
    // e.g., /users/:id -> /users/([^/]+)
    const paramNames: string[] = [];
    const patternString = path
      .replace(/\//g, '\\/')
      .replace(/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });

    const pattern = new RegExp(`^${patternString}$`);

    this.routes.push({
      method,
      path,
      handler,
      pattern,
      paramNames,
    });
  }

  async handle(req: NextRequest, pathname: string): Promise<NextResponse | null> {
    const method = req.method;

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = pathname.match(route.pattern);
      if (match) {
        // Extract params from match groups
        const params: Record<string, string> = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });

        try {
          const response = await route.handler(req, params);
          return response;
        } catch (error: any) {
          console.error(`Error in route handler ${route.method} ${route.path}:`, error);
          return NextResponse.json(
            { error: 'Internal Server Error', message: error?.message },
            { status: 500 }
          );
        }
      }
    }

    return null;
  }
}

export default Router;


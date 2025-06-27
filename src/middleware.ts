import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

const publicRoutes = [
  { path: "/login", whenAuth: "redirect" },
  { path: "/register", whenAuth: "redirect" },
  { path: "/", whenAuth: "allow" },
] as const;

const redirect_when_not_auth = "/login";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = redirect_when_not_auth;

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && publicRoute && publicRoute.whenAuth === "redirect") {
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/tasklist";

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
    try {
      // check JWT token expired
      const decode = jwtDecode<JwtPayload>(authToken.value);

      if (decode.exp && decode.exp < Date.now() / 1000) {
        const redirectUrl = request.nextUrl.clone();

        redirectUrl.pathname = redirect_when_not_auth;

        return NextResponse.redirect(redirectUrl);
      }

      return NextResponse.next();
    } catch (error) {
      // token inválido → manda login
      const redirectUrl = request.nextUrl.clone();
      console.log(error);
      redirectUrl.pathname = redirect_when_not_auth;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

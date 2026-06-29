import { NextRequest, NextResponse } from "next/server";

type DecodedToken = {
  role?: string;
  exp?: number;
};

const AUTH_ROUTE_PREFIX = "/auth";
const DASHBOARD_ROUTE_PREFIX = "/dashboard";

const decodeToken = (token: string): DecodedToken | null => {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "=",
    );
    const decodedPayload = JSON.parse(atob(paddedPayload)) as DecodedToken;

    return decodedPayload;
  } catch {
    return null;
  }
};

const isTokenExpired = (exp?: number) => {
  if (!exp) return true;

  return exp * 1000 <= Date.now();
};

const isAdminRole = (role?: string) => role?.toLowerCase() === "admin";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken ? decodeToken(accessToken) : null;
  const isAuthenticated =
    !!accessToken && !!decodedToken && !isTokenExpired(decodedToken.exp);
  const isAdmin = isAuthenticated && isAdminRole(decodedToken?.role);
  const loginUrl = new URL("/auth/login", request.url);

  if (pathname === "/") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith(AUTH_ROUTE_PREFIX)) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith(DASHBOARD_ROUTE_PREFIX)) {
    if (!isAuthenticated) {
      loginUrl.searchParams.set("redirect", `${pathname}${search}`);
      return NextResponse.redirect(loginUrl);
    }

    if (!isAdmin) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};

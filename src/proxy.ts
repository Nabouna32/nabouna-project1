import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "./lib/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const cookieLocale = request.cookies.get("utiluna-locale")?.value;
  const browserLocale = request.headers.get("accept-language")?.split(",")[0]?.split("-")[0];
  const locale = isLocale(cookieLocale ?? "")
    ? cookieLocale
    : isLocale(browserLocale ?? "")
      ? browserLocale
      : defaultLocale;
  url.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

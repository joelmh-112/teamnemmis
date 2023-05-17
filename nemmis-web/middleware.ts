import { getSession } from "next-auth/react";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequest) {
    const handleI18nRouting = createIntlMiddleware({
      locales: ["es", "ca", "en"],

      // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
      defaultLocale: "es",
    });

    const response = await handleI18nRouting(req);

    return response;
  },
  {
    callbacks: {
      authorized: async ({ req, token }: { req: NextRequest; token: any }) => {
        if (req.nextUrl.pathname.startsWith("/backend")) {
          if (
            token?.webUser?.UserRoles &&
            token.webUser.UserRoles.find(
              ({ role_id }: { role_id: number }) =>
                role_id == process.env.ADMIN_ROLE_ID
            )
              ? true
              : false
          ) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      },
    },
  }
);

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

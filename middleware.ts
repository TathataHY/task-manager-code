import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/sign-in"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\\.[\\w]+$)"],
  apiRoutes: ["/api/tasks"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

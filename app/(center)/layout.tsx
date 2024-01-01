import "@/styles/globals.css";
import { Metadata } from "next";
import { SelectMenu } from "@/components/center/selectMenu";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import clsx from "clsx";
import { TopNav } from "@/components/common/top-nav";
import { LoginCheck } from "@/components/common/login-check";

export const metadata: Metadata = {
  title: 'account center'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-sd-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <TopNav isFixed />
          <LoginCheck />
          <div className="w-full h-full pt-14 ">
            <SelectMenu />
            <div className="pl-[225px] w-full h-full min-h-full bg-sd-background">
              <div className="py-4 px-10 h-full">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

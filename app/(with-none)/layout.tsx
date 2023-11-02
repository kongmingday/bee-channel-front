/*
 * @Author: err0r
 * @Date: 2023-11-01 15:24:28
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-02 22:45:40
 * @Description: 
 * @FilePath: \bee-channel-front\app\(with-none)\layout.tsx
 */
import "@/styles/globals.css";
import { Providers } from "../providers";
import { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import { clsx } from "clsx";
import { TopNav } from "./top-nav";

export const metadata: Metadata = {
  title: {
    template: '%s bee-channel',
    default: 'bee-channel',
  },
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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col h-full min-h-screen">
            <TopNav />
            {children}
          </div>
        </Providers>
      </body>
    </html >
  );
}

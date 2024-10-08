import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";

const Vazirmatn = localFont({ src: "../fonts/Vazirmatn[wght].woff2" });

export const metadata: Metadata = {
  title: "Gis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body dir="rtl" className={Vazirmatn.className}>
          {children}
        </body>
      </Provider>
    </html>
  );
}

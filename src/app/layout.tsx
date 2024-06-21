"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Spinner from "@/components/atomic/atoms/spinner";
import Toaster from "@/components/atomic/atoms/toaster";
import { Provider } from "react-redux";
import store from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
          <Spinner />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}

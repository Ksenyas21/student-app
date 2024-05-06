import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Student Management System",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <html className="h-full" >
  <body className={`'relative h-full font-sans antialiased bg-white dark:bg-black`}>
  {children}
  </body>
  </html>;
}

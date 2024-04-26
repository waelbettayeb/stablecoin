import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { ApiClientProvider } from "./_data/Provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stablecoin",
  description: "Awesome stablecoin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh">
      <body className={`${poppins.className} min-h-full h-full`}>
        <ApiClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ApiClientProvider>
      </body>
    </html>
  );
}

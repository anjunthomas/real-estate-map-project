import type { Metadata } from "next";
import "./globals.css";
import { MuiNavbar } from "@/components/MuiNavbar";
import { MuiDrawer} from "@/components/MuiDrawer";
import { Providers } from "@/components/Providers";


export const metadata: Metadata = {
  title: "Real Estate Map Project",
  description: "Created by Anju",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MuiNavbar />
          <main style={{ padding: "0", margin: "0" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
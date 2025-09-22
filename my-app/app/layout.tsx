import type { Metadata } from "next";
import "./globals.css";
import { MuiNavbar } from "@/components/MuiNavbar";
import { MuiDrawer} from "@/components/MuiDrawer";


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
            {/* Navbar content should go here*/}
            <MuiNavbar/>
            <MuiDrawer/>

            {/* styling page here */}
            <main style={{ padding: "1rem" }}></main>
        {children}
      </body>
    </html>
  );
}

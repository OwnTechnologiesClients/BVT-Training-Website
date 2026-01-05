import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { QueryProvider } from "@/context/QueryContext";
import { AuthProvider } from "@/context/AuthContext";
import { PopupProvider } from "@/context/PopupContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BVT Training - Navy Vocational Training",
  description: "Professional navy vocational training programs and courses for career advancement",
  icons: {
    icon: "/BVT_logo.png",
    shortcut: "/BVT_logo.png",
    apple: "/BVT_logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <QueryProvider>
            <PopupProvider>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </PopupProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

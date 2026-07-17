import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ReduxProvider from "@/lib/redux/ReduxProvider";
import { GoogleAuthProvider } from "@/lib/google/GoogleAuthProvider";
import LoginPromptModal from "@/components/auth/LoginPromptModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Srinaar — Timeless Ethnic Wear",
  description: "Handcrafted kurtis, lehengas and ethnic wear by Srinaar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#EAE7DA]`}
      >
        <ReduxProvider>
          <GoogleAuthProvider>
            <Header />
            {children}
            <Footer />
            <LoginPromptModal />
            <ToastContainer />
          </GoogleAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

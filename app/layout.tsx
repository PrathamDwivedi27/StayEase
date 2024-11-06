import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google';
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";


const font = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "StayEase",
  description: "Trip Booking for your next vacation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser=await getCurrentUser();
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ToasterProvider/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}

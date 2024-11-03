import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google';
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modal";


const font = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "StayEase",
  description: "Trip Booking for your next vacation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <Modal isOpen={true}/>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

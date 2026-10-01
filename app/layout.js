import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "YazisaSA - Report Municipal Problems",
  description: "Report potholes, water leaks, streetlight faults and illegal dumping to your municipality, then track progress with your reference number.",
  openGraph: {
    title: "YazisaSA - Report Municipal Problems",
    description: "Report potholes, water leaks, streetlight faults and illegal dumping to your municipality, then track progress with your reference number.",
    images: ["/yazisasa-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

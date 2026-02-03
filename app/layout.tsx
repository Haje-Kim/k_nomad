import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K.NOMAD - 한국 노마드 도시 가이드",
  description: "대한민국에서 노마드 생활하기 좋은 도시를 찾아보세요. 30개 도시, 500+ 리뷰, 실시간 데이터.",
  keywords: ["노마드", "도시", "여행", "한국", "생활비", "카페"],
  openGraph: {
    title: "K.NOMAD",
    description: "한국 노마드 도시 가이드",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

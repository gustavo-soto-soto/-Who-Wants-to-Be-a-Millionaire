import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Who Wants to Be a Millonaire",
  description: "Trivia project based on the program who wants to be a millionaire, about questions and answers",
  authors: [ { name: "Gustavo Soto Soto", url: "https://github.com/gustavo-soto-soto" } ],
  keywords: "Trivia, Millonaire, Preguntas, Questions, Respuestas, Answers, ¿Quién Quiere Ser Millonario?, React, NextJS, Who Wants To Be a Millonaire",
  robots: "index, follow"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
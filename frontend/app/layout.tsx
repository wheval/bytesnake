import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snake Game - Starknet',
  description: 'A simple Snake game built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

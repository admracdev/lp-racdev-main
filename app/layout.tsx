import './globals.css';
import type { Metadata } from 'next';
import { Inter, Silkscreen } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const silkscreen = Silkscreen({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-silkscreen'
});

export const metadata: Metadata = {
  title: 'RACDEV - Desenvolvimento de Software com IA',
  description: 'Soluções de Inteligência Artificial para transformar seu negócio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} ${silkscreen.variable} dark`}>{children}</body>
    </html>
  );
}
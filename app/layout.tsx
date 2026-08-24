import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['italic'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Pradeep Kumar S',
  description: 'Full-Stack (MERN) & GenAI/Agentic AI Developer building scalable, AI-integrated web applications. Databricks Certified Data & GenAI Engineer.',
  keywords: 'Full Stack Developer, MERN Stack, Next.js, React, Node.js, MongoDB, JavaScript, TypeScript, GenAI, Agentic AI, LangChain, RAG, Databricks',
  authors: [{ name: 'Pradeep Kumar S' }],
  icons: {
    icon: '/PK_lightlogo.png',
    shortcut: '/PK_lightlogo.png',
    apple: '/PK_lightlogo.png',
  },
  openGraph: {
    title: 'Pradeep Kumar S - Full Stack & GenAI Developer',
    description: 'Full-Stack (MERN) & GenAI/Agentic AI Developer building scalable, AI-integrated web applications. Databricks Certified Data & GenAI Engineer.',
    type: 'website',
    images: [
      {
        url: '/PK_lightlogo.png',
        width: 1200,
        height: 630,
        alt: 'Pradeep Kumar S - Full Stack & GenAI Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pradeep Kumar S - Full Stack & GenAI Developer',
    description: 'Full-Stack (MERN) & GenAI/Agentic AI Developer building scalable, AI-integrated web applications. Databricks Certified Data & GenAI Engineer.',
    images: ['/PK_lightlogo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
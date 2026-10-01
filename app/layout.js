import { Pacifico, Quicksand, Nunito } from 'next/font/google';
import { StoreProvider } from '@/context/StoreContext';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Toasts from '@/components/ui/Toasts';
import { site } from '@/data/site';
import './globals.css';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-quicksand' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-nunito' });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: `${site.name} — Confectionery Shop`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — Confectionery Shop`,
    description: site.description,
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  themeColor: '#f4952c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${quicksand.variable} ${pacifico.variable} ${nunito.variable}`}>
      <body>
        <StoreProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <TopBar />
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Toasts />
        </StoreProvider>
      </body>
    </html>
  );
}

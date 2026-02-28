import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | WSB Tools',
    default: 'Game Tools',
  },
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}

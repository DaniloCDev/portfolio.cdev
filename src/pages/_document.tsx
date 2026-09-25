import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function Document({ locale }: { locale: string }) {
  return (
    <Html lang={locale}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale ?? "en" };
};

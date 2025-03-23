import { AppProps } from "next/app";
import { IntlProvider } from "next-intl";
import { useRouter } from "next/router";

import "../styles/globals.css"; // Se tiver um arquivo de estilos global

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale || "en"} messages={pageProps.messages}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}

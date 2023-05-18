import { NextAuthProvider } from "@components/NextAuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import './../globals.css'
import deepmerge from "deepmerge";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  let messages,defaultMessages,userMessages;
  try {
    defaultMessages = (await import(`../../messages/es.json`)).default;
    userMessages = (await import(`../../messages/${locale}.json`)).default;
    messages = deepmerge(defaultMessages, userMessages);

  } catch (error) {
    notFound();
  }


  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Nemmis - eSports Team</title>
      </head>
      <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NextAuthProvider>{children}</NextAuthProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

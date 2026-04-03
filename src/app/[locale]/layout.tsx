import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import Providers from "@/components/providers";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as never)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 lg:ml-[272px] flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 p-4 lg:p-6">{children}</main>
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import Providers from "@/components/providers";
import Sidebar from "@/components/layout/sidebar";
import Topbar from "@/components/layout/topbar";
import BottomNav from "@/components/layout/bottom-nav";
import Footer from "@/components/layout/footer";

// Заранее генерируем все локали — Next.js пре-рендерит [locale]/* статически.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        {/* Прокидываем атрибут lang в html через next/script нельзя напрямую;
            обновление dom lang делает Topbar/Theme провайдер на клиенте.
            Серверный lang ставится в root layout и обновляется через middleware/headers. */}
        <div className="flex min-h-screen overflow-x-hidden w-full" data-locale={locale}>
          <Sidebar />
          <div className="flex-1 lg:ml-[272px] flex flex-col min-h-screen w-full min-w-0">
            <Topbar />
            <main className="flex-1 p-3 sm:p-4 pb-24 lg:p-6 lg:pb-6 min-w-0">{children}</main>
            <Footer />
          </div>
          <BottomNav />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}

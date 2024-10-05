import type { Metadata } from "next";
import "@/styles/index.css";
import Providers from "./providers";
// import "primereact/resources/themes/saga-orange/theme.css";
// import "primereact/resources/themes/viva-dark/theme.css";
// import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
// import "primereact/resources/themes/arya-orange/theme.css";
import "primereact/resources/themes/arya-orange/theme.css";

export const metadata: Metadata = {
  title: "Filmovena",
  description: "Filmes para você assistir free de gratis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_br">
      <body className={`antialiased min-h-[100dvh]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

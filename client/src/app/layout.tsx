import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ThemeProvider from "@/context/ThemeProvider";

export const metadata = {
  title: "TrendScout - Descubra as Tendências em Tempo Real",
  description:
    "Acompanhe as principais tendências do Google, YouTube e redes sociais em tempo real.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className="min-h-screen flex flex-col transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 mt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

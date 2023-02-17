import Header from './header';
import Footer from './footer';

export default function WethPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute -z-10 h-full w-full blur-[256px]">
        <div className="absolute top-[calc(50%-10rem)] left-[calc(50%-10rem)] h-80 w-80 bg-green-200" />
      </div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

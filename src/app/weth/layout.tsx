export default function WethPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        <div className="absolute -z-10 h-full w-full blur-[256px]">
          <div className="absolute top-[calc(50%-10rem)] left-[calc(50%-10rem)] h-80 w-80 bg-green-200" />
        </div>
        <div className="relative">{children}</div>
      </section>
    </>
  );
}

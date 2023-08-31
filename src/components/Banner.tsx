export default function Banner() {
  return (
    <section className="h-96 relative -z-10">
      <div className="w-full h-full bg-cover bg-banner opacity-80 "></div>
      <div className="absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl">
        <h2 className="text-7xl mb-1">Shop with US</h2>
        <p className="text-2xl">Best Products, High Quality</p>
      </div>
    </section>
  );
}

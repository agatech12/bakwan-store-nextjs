import Link from "next/link";

const ProductSection = () => {
  return (
    <section className="mt-10 px-12">
      <h1 className="text-3xl font-bold mb-4 text-yellow-500">Bakwan Point</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Produk Pertama */}
        {[...new Array(1000)].map((_, key) => (
          <div key={key} className="bg-white rounded-xl text-black text-center shadow-xl hover:translate-y-4 hover:scale-110 transition duration-300">
            <Link href="/bakwan/[productId]" as="/bakwan/1">
              <div className="p-3 space-y-4 mt-8">
                <div className="flex justify-center">
                  <img src="/images/aga12121.png" alt="Produk Pertama" />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;

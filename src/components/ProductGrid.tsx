import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

const products = [
  { image: product1, name: "Diamond Solitaire Ring", id: "LJ-DR-001" },
  { image: product2, name: "Gold Chain Necklace", id: "LJ-GN-102" },
  { image: product3, name: "Sapphire Diamond Ring", id: "LJ-SR-203" },
  { image: product4, name: "Pearl Drop Earrings", id: "LJ-PE-304" },
  { image: product5, name: "Ruby Gemstone Ring", id: "LJ-RR-405" },
  { image: product6, name: "Diamond Tennis Bracelet", id: "LJ-DB-506" },
  { image: product7, name: "Emerald Pendant Necklace", id: "LJ-EN-607" },
  { image: product8, name: "Diamond Stud Earrings", id: "LJ-DE-708" },
];

const ProductGrid = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
            Best Selling Pieces
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Discover our most cherished designs, loved by jewelry connoisseurs worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg bg-card card-shadow hover:hover-shadow transition-elegant mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-elegant"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-elegant">
                  <button className="bg-card p-3 rounded-full card-shadow hover:elegant-shadow transition-smooth">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-display font-semibold text-primary mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                ID: {product.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

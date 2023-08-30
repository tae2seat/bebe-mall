import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.mybebe.net/api/v1/mall/item",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Banner />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-y-10">
        {products.items?.map((item, id) => (
          <ProductCard key={id} item={item} />
        ))}
      </ul>
    </div>
  );
}

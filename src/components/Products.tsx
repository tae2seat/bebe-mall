import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

interface Products {
  items: Product[]
}

interface Product {
  name: string;
  price: string;
  image: string;
  id: number;
  description: string;
  item_categories: {
    category: {
      name: string;
    }
    id: number;
  }[];
}

export default function Products() {
  const [products, setProducts] = useState<Products>({items: []});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.tae2seat.com/api/v1/mall/item",
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

  // 로딩 중일 때 에러 뜰 때 경우
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10 gap-y-10">
      {products?.items?.map((item, id) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </ul>
  );
}

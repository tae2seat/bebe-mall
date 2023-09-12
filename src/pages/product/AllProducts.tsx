import { lazy, Suspense } from "react";

const LazyProducts = lazy(() => import( "../../components/Products"))

export default function AllProducts() {
  return (
    <div className="mx-auto">
      <h2 className="text-center text-2xl font bold pt-8">제품 전체페이지</h2>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyProducts />
    </Suspense>
    </div>
  );
}

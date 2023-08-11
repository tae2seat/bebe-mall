import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../../components/buttons/Button";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const [productName, setProductName] = useState("");
  const [cId, setCId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
  };
  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    setCId(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    getProductDetail();
    getCategory();
  }, []);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.mybebe.net/api/v1/mall/item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      setProduct(response.data);
      setProductName(response.data.name);
      setCId(response.data.item_categories[0].id);
      setPrice(response.data.price);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "https://api.mybebe.net/api/v1/mall/category",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditProduct = async (e) => {
    e.preventDefault();

    const formDate = new FormData();

    formDate.append("name", productName);
    formDate.append("price", price);
    formDate.append("description", description);
    formDate.append("categoryId", cId);

    try {
      const response = await axios.put(
        `https://api.mybebe.net/api/v1/mall/item/${id}`,
        formDate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col mx-auto">
      <h2 className=" text-center text-2xl font bold py-8">
        제품 수정 후 등록
      </h2>
      <img
        className="w-80 h-80 md:w-96 md:h-96 mx-auto p-10 md:p-16 border-gray-100 border"
        src={product?.image}
        alt="file"
      />
      <form
        className="flex flex-col md:mx-auto p-12"
        onSubmit={handleSubmitEditProduct}
      >
        <input
          type="text"
          name="제품명"
          defaultValue={productName}
          required
          onChange={handleChangeProductName}
        />
        <input
          type="number"
          name="price"
          defaultValue={price}
          required
          onChange={handleChangePrice}
        />
        <div className="p-4 outline-none border border-gray-300 my-1 text-left">
          <label className="text-gray-400">카테고리</label>
          <select
            className="ml-3 text-center"
            defaultValue={cId}
            onChange={handleChangeCategory}
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input
          className="mb-6"
          type="text"
          name="description"
          defaultValue={description}
          required
          onChange={handleChangeDescription}
        />
        <Button text="제품 수정하기" />
      </form>
    </section>
  );
}

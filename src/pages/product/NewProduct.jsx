import React, { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [productName, setProductName] = useState("");
  const [cId, setCId] = useState(1);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleChangeProductName = (e) => {
    setProductName(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCId(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitNewProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", productName);
    formData.append("file", file);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", cId);

    try {
      const response = await axios.post(
        "https://api.mybebe.net/api/v1/mall/item",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("성공");
      if (response.status === 200) {
        navigate("/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      getCategory();
    }
  }, [isLoggedIn]);

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

  return (
    <section className="flex flex-col mx-auto ">
      <h2 className="text-center text-2xl font-bold  py-8">새로운 제품 등록</h2>
      {file && (
        <img
          className="w-80 h-80 md:w-96 md:h-96 mx-auto p-10 md:p-16 border-gray-100 border"
          src={URL.createObjectURL(file)}
          alt="file"
        />
      )}
      <form
        className="flex flex-col md:mx-auto p-12"
        onSubmit={handleSubmitNewProduct}
      >
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChangeFile}
        />
        <input
          type="text"
          name="name"
          value={productName || ""}
          placeholder="제품명"
          required
          onChange={handleChangeProductName}
        />
        <input
          type="number"
          name="price"
          value={price || ""}
          placeholder="가격"
          required
          onChange={handleChangePrice}
        />
        <div className="p-4 outline-none border border-gray-300 my-1 text-left">
          <label className="text-gray-400">카테고리</label>
          <select
            className="ml-3 text-center"
            onChange={handleChangeCategory}
            value={cId}
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
          value={description || ""}
          placeholder="제품 설명"
          required
          onChange={handleChangeDescription}
        />
        <Button text="제품 등록하기" />
      </form>
    </section>
  );
}

// text={isUploading ? '업로드 중 ..' : '제품 등록하기'} disabled={isUploading}

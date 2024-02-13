import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, userRole } = useSelector((state) => state.auth);

  const [product, setProduct] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    if (options.length > 0) {
      setNewOption(options[0].name);
    }
  }, [options]);

  const handleChangeOption = (e) => {
    const selectedOption = e.target.value;

    if (!selectedOption) {
      setNewOption(options[0]?.name || "");
    } else {
      const selectedOptionName = options.find(
        (option) => option.id === parseInt(selectedOption)
      )?.name;
      setNewOption(selectedOptionName || "");
    }
  };

  useEffect(() => {
    getProductDetail();
    getOptions();
  }, []);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `https:/api.tae2seat.com/api/v1/mall/item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOptions = async () => {
    try {
      const response = await axios.get(
        "https://api.tae2seat.com/api/v1/mall/size",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setOptions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product, newOption) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems);
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.option === newOption
    );

    if (existingItemIndex !== -1) {
      // 상품이 이미 장바구니에 존재하는 경우
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      // 상품이 장바구니에 존재하지 않는 경우
      const item = {
        ...product,
        option: newOption,
        quantity: 1,
      };
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const goToEdit = (e) => {
    navigate(`/product/edit/${id}`);
  };

  return (
    <div className="mx-auto md:w-2/3 ">
      <h2 className="text-center text-2xl font bold py-8">제품 상세페이지</h2>
      <section className="flex flex-col md:flex-row p-4">
        <img
          className="w-80 h-80 md:w-96 md:h-96 mx-auto p-10 md:p-16 border-gray-100 border"
          src={product?.image}
          alt="image"
        />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{product?.name}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gary-400">
            {product?.price}
          </p>
          <p className="text-lg py-4">{product?.description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold">옵션</label>
            <select
              className="p-2 m-4 flex-1 text-center border-2 border-dashed border-brand outline-none"
              onChange={handleChangeOption}
            >
              {options?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col py-8 gap-2">
            <Button
              text="장바구니에 추가"
              onClick={() => {
                addToCart(product, newOption);
                navigate("/carts");
              }}
            />
            {isAdmin && userRole === "admin" && (
              <Button text="제품 수정하기" onClick={goToEdit} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

//장바구니 추가를 눌렀을 떄 옵션이 없으면 alert로 옵션을 선택해주세요

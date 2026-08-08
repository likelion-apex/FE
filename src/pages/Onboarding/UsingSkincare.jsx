import { useState } from "react";
import { useNavigate } from "react-router-dom";

import cancelIcon from "../../assets/icons/cancel.svg";
import searchIcon from "../../assets/icons/search.svg";
import NextButton from "../../components/NextButton";
import TopNavbar from "../../components/TopNavbar";

// TODO: 제품 검색 API 연동 시 교체
const PRODUCTS = [
  { id: 1, brand: "아비브", name: "어성초 흔적 에센스 패드" },
  { id: 2, brand: "아누아", name: "어성초 포어 컨트롤 클렌징오일" },
  { id: 3, brand: "구달", name: "맑은 어성초 진정 무기자차 선크림" },
  { id: 4, brand: "아누아", name: "어성초 센텔라 레드 스팟 크림" },
];

function UsingSkincare() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [registered, setRegistered] = useState([]);

  const keyword = query.trim();
  const results = keyword
    ? PRODUCTS.filter(
        (product) =>
          product.name.includes(keyword) || product.brand.includes(keyword),
      )
    : [];

  const isRegistered = (id) => registered.some((item) => item.id === id);

  const addProduct = (product) => {
    if (isRegistered(product.id)) return;
    setRegistered((prev) => [...prev, product]);
  };

  const removeProduct = (id) =>
    setRegistered((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="relative min-h-full w-full bg-white pt-[51px] pb-[132px]">
      <div className="px-5">
        <TopNavbar step={4} totalSteps={4} />

        <div className="mt-6 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl leading-9 font-bold text-black">
              사용중인 스킨케어 제품을
              <br />
              알려주세요
            </h1>
            <p className="w-[243px] text-sm leading-5 text-gray-60">
              내 피부와 잘 맞는지 AI가 분석해 드릴게요.
            </p>
          </div>

          <div
            className={`mx-auto flex h-12 w-[332px] items-center justify-between rounded-2xl border px-5 py-[10px] ${
              keyword ? "border-blue-50 bg-blue-05" : "border-gray-20 bg-gray-05"
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="제품명을 입력하세요"
              aria-label="제품명 검색"
              className="min-w-0 flex-1 bg-transparent text-base leading-[14px] text-black caret-blue-50 outline-none placeholder:text-gray-60"
            />
            <img src={searchIcon} alt="" className="size-7 shrink-0" />
          </div>
        </div>
      </div>

      {keyword && (
        <div className="mt-6">
          <div className="bg-gray-05 px-[18px] pt-[13px] pb-4">
            <p className="text-xs leading-[14px] font-bold text-gray-60">
              등록된 제품({registered.length})
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {registered.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-1 rounded-3xl border border-gray-20 bg-white p-1"
                >
                  <span className="size-8 shrink-0 rounded-full bg-gray-10" />
                  <span className="text-sm font-bold text-gray-60">
                    {product.name}
                  </span>
                  <button
                    type="button"
                    aria-label={`${product.name} 삭제`}
                    onClick={() => removeProduct(product.id)}
                    className="flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-10"
                  >
                    <img src={cancelIcon} alt="" className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-t-[20px] bg-white px-[30px] pt-[18px]">
            {results.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-60">
                검색 결과가 없어요.
              </p>
            ) : (
              results.map((product) => {
                const added = isRegistered(product.id);

                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b border-gray-10 py-4"
                  >
                    <div className="flex items-start justify-center gap-4">
                      <span className="size-[60px] shrink-0 rounded-xl bg-gray-10" />
                      <div className="flex flex-col gap-1 py-2">
                        <span className="text-xs text-gray-60">
                          {product.brand}
                        </span>
                        <span className="text-base leading-[14px] font-bold text-gray-80">
                          {product.name}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={added}
                      onClick={() => addProduct(product)}
                      className={`shrink-0 rounded-3xl px-4 py-2 text-sm font-bold ${
                        added
                          ? "bg-blue-05 text-blue-50"
                          : "cursor-pointer bg-gray-05 text-gray-60"
                      }`}
                    >
                      {added ? "추가됨" : "추가"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <div className="absolute right-6 bottom-[52px] left-6">
        <NextButton
          disabled={registered.length === 0}
          onClick={() => navigate("/main")}
        >
        시작하기
        </NextButton>
      </div>
    </div>
  );
}

export default UsingSkincare;

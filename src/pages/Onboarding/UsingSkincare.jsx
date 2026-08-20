import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import cancelIcon from "../../assets/icons/cancel.svg";
import searchIcon from "../../assets/icons/search.svg";
import NextButton from "../../components/NextButton";
import TopNavbar from "../../components/layouts/TopNavbar";
import { searchProducts, addInventoryItem } from "../../api/inventory";

function UsingSkincare() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registered, setRegistered] = useState([]); // 선택된 제품(ProductSearchItem[])
  const [isSubmitting, setIsSubmitting] = useState(false);

  const keyword = query.trim();

  // 검색어가 바뀌면 300ms 디바운스 후 제품 검색 API 호출
  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchProducts(keyword);
        const items = data?.items ?? [];
        // 서버가 키워드로 안 걸러줄 경우를 대비해 클라이언트에서도 한 번 더 필터
        const filtered = items.filter(
          (item) =>
            item.productName?.includes(keyword) ||
            item.brand?.includes(keyword),
        );
        setResults(filtered);
      } catch (error) {
        console.error("제품 검색 실패:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const isRegistered = (productId) =>
    registered.some((item) => item.productId === productId);

  const addProduct = (product) => {
    if (isRegistered(product.productId)) return;
    setRegistered((prev) => [...prev, product]);
  };

  const removeProduct = (productId) =>
    setRegistered((prev) =>
      prev.filter((item) => item.productId !== productId),
    );

  // "시작하기": 선택한 제품들을 인벤토리에 저장한 뒤 홈으로 이동
  const handleStart = async () => {
    if (registered.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const results = await Promise.allSettled(
        registered.map((item) =>
          addInventoryItem({
            productId: item.productId,
            productName: item.productName,
          }),
        ),
      );

      const rejected = results.filter((r) => r.status === "rejected");
      const succeededCount = results.filter(
        (r) => r.status === "fulfilled",
      ).length;
      // 409(Conflict) = 이미 등록된 제품 / 그 외 = 실제 오류
      const conflicts = rejected.filter(
        (r) => r.reason?.response?.status === 409,
      );
      const conflictedProductIds = results
        .map((result, index) =>
          result.status === "rejected" &&
          result.reason?.response?.status === 409
            ? registered[index].productId
            : null,
        )
        .filter((productId) => productId !== null);
      const realErrors = rejected.filter(
        (r) => r.reason?.response?.status !== 409,
      );

      if (realErrors.length > 0) {
        console.error("인벤토리 등록 실패:", realErrors);
        alert("제품 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        return;
      }

      // 전부 중복이면 인벤토리에 새로 등록된 제품이 없으므로 온보딩을 진행하지 않는다.
      if (conflicts.length > 0) {
        // 중복 제품은 선택 목록에서 제거해, 정상 등록 가능한 제품만 남긴다.
        setRegistered((prev) =>
          prev.filter((item) => !conflictedProductIds.includes(item.productId)),
        );

        if (succeededCount === 0) {
          alert(
            "이미 등록된 제품입니다. 이미 등록되지 않은 제품을 하나 이상 추가해주세요.",
          );
          return;
        }

        alert(
          "일부 제품은 이미 등록되어 있어요. 새로 등록된 제품으로 시작합니다.",
        );
      }

      // 새 제품이 최소 한 개 등록된 경우에만 메인으로 이동한다.
      navigate("/main");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              keyword
                ? "border-blue-50 bg-blue-05"
                : "border-gray-20 bg-gray-05"
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

      {registered.length > 0 && (
        <div className="mt-6 bg-gray-05 px-[18px] pt-[13px] pb-4">
          <p className="text-xs leading-[14px] font-bold text-gray-60">
            등록된 제품({registered.length})
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {registered.map((product) => (
              <div
                key={product.productId}
                className="flex items-center gap-1 rounded-3xl border border-gray-20 bg-white p-1"
              >
                <span className="size-8 shrink-0 overflow-hidden rounded-full bg-gray-10">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="h-full w-full object-cover"
                    />
                  )}
                </span>
                <span className="text-sm font-bold text-gray-60">
                  {product.productName}
                </span>
                <button
                  type="button"
                  aria-label={`${product.productName} 삭제`}
                  onClick={() => removeProduct(product.productId)}
                  className="flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-10"
                >
                  <img src={cancelIcon} alt="" className="size-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {keyword && (
        <div className={registered.length > 0 ? "" : "mt-6"}>
          <div className="rounded-t-[20px] bg-white px-[30px] pt-[18px]">
            {isLoading ? (
              <p className="py-8 text-center text-sm text-gray-60">
                검색 중입니다...
              </p>
            ) : results.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-60">
                검색 결과가 없어요.
              </p>
            ) : (
              results.map((product) => {
                const added = isRegistered(product.productId);

                return (
                  <div
                    key={product.productId}
                    className="flex items-center justify-between border-b border-gray-10 py-4"
                  >
                    <div className="flex items-start justify-center gap-4">
                      <span className="size-[60px] shrink-0 overflow-hidden rounded-xl bg-gray-10">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.productName}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <div className="flex flex-col gap-1 py-2">
                        <span className="text-xs text-gray-60">
                          {product.brand}
                        </span>
                        <span className="text-base leading-[14px] font-bold text-gray-80">
                          {product.productName}
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
          disabled={registered.length === 0 || isSubmitting}
          onClick={handleStart}
        >
          {isSubmitting ? "등록 중..." : "시작하기"}
        </NextButton>
      </div>
    </div>
  );
}

export default UsingSkincare;

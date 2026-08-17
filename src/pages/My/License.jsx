import MyPageHeader from "../../components/My/MyPageHeader";
import { OPEN_SOURCE_INTRO, OPEN_SOURCE_LICENSES } from "../../constants/legal";

function License() {
  return (
    <div className="min-h-full w-full bg-gray-05">
      <MyPageHeader title="오픈소스 라이선스" />

      <div className="mt-[38px] flex flex-col gap-[26px] p-10">
        <p className="text-xs leading-5 font-medium text-gray-80">
          {OPEN_SOURCE_INTRO}
        </p>

        {OPEN_SOURCE_LICENSES.map((item) => (
          <div key={item.name} className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-col">
              <h2 className="text-sm leading-5 font-bold text-black">
                {item.name}
              </h2>
              <p className="text-xs leading-5 font-bold text-blue-50">
                {item.license}
              </p>
            </div>

            <div className="flex w-full flex-col">
              {item.notices.map((notice) => (
                <p key={notice} className="text-xs leading-4 text-gray-40">
                  {notice}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default License;

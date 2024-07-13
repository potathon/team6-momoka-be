const express = require("express");
const path = require("path");
const app = express();
const port = 4000;
const cors = require("cors");
const restaurantRouter = require("./routes/restaurantRouter.js");
const fetch = require('node-fetch');

app.use(
  cors({
    origin: [
      "http://ec2-52-79-127-33.ap-northeast-2.compute.amazonaws.com:3000",
      "http://ec2-52-79-177-10.ap-northeast-2.compute.amazonaws.com:3000",
      "http://localhost:3001",
      "http://www.momoka.kro.kr:3000",
    ],
    method: ["GET", "POST", "PATCH", "DELETE"],
  })
);

let restaurantData = []; // 데이터를 저장할 전역 변수

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// 착한 가게 데이터 가져오기 함수
const fetchData = async () => {
  try {
    const url =
      "https://api.odcloud.kr/api/15082982/v1/uddi:6c3db587-f3fb-46ef-97a2-cee7703151ba";
    const params = new URLSearchParams({
      page: 1,
      perPage: 293,
      returnType: "json",
      serviceKey:
        "LXsqgWnfJZdxNwgRq5w/npio1lEDVAAeXpxRfKLASpMNvxXF9VKlikcd8SsMeFZ1/KqsFbiJo7gSO/2oQE9FDw==",
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        accept: "*/*",
      },
    });
    const apiResponseJson = await response.json();

    // '업종' 필드가 '음식점'인 항목만 필터링
    restaurantData = apiResponseJson.data
      .filter((store) => store.업종 === "음식점")
      .map((store) => ({
        name: store?.업소명,
        tel: store?.연락처,
        menu: store?.품목,
        addr: store?.주소,
        info: store?.영업정보,
      }));
    console.log("데이터가 성공적으로 로드되었습니다.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 서버 시작 시 데이터 가져오기
fetchData();

app.use((req, res, next) => {
  req.restaurantData = restaurantData;
  next();
});

// 착한 가게 데이터 엔드포인트
app.use("/api", restaurantRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

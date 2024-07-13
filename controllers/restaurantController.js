const getAllList = (req, res) => {
  res.json(req.restaurantData);
};

// 검색어 필터링
const getSearchList = (req, res) => {
  let { keyword } = req.query;
  // 업소명, 품목중에 keyword가 포함된 데이터만 필터링
  let searchResult = req.restaurantData
    .filter(
      (store) =>
        store?.업소명.includes(keyword) ||
        store?.품목.includes(keyword) ||
        store?.주소.includes(keyword)
    )
    .map((store) => ({
      name: store.업소명,
      tel: store.연락처,
      menu: store.품목,
      addr: store.주소,
      info: store.영업정보,
    }));

  res.json(searchResult);
};

module.exports = {
  getAllList,
  getSearchList,
};

const getAllList = (req, res) => {
  res.json(req.restaurantData);
};

// 검색어 필터링
const getSearchList = (req, res) => {
  let { keyword } = req.query;
  //.name, menu, 주소 중에 keyword가 포함된 데이터만 필터링
  console.log(req.restaurantData);
  let searchResult = req.restaurantData
    .filter(
      (store) =>
        store?.name.includes(keyword) ||
        store?.menu.includes(keyword) ||
        store?.addr.includes(keyword)
    )
    .map((store) => ({
      name: store?.name,
      tel: store?.tel,
      menu: store?.menu,
      addr: store?.addr,
      info: store?.info,
    }));

  res.json(searchResult);
};

module.exports = {
  getAllList,
  getSearchList,
};

const getAllList = (req, res) => {
  res.json(req.restaurantData);
};

module.exports = {
  getAllList,
};

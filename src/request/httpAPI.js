import request from "./request";

// 精品推荐
export const recommend = () =>
  request.get("http://kumanxuan1.f3322.net:8881/cms/products/recommend");

// 用户信息
export const getShopCarts = () =>
  request.get("http://kumanxuan1.f3322.net:8881/cms/shop/carts", {
    headers: { "x-auth-token": "xxx" },
  });
  
// 查看购物车
export const getUserProfiles = () => {
  request.get("http://kumanxuan1.f3322.net:8881/cms/shop/userProfiles", {
    headers: { "x-auth-token": "xxx" },
  });
};

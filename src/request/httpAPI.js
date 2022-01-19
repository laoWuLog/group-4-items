import request from "./request";

// 精品推荐
export const recommend = () =>
  request.get("/cms/products/recommend");

// 用户信息
export const getShopCarts = () =>
  request.get("/cms/shop/carts", {
    headers: { "x-auth-token": "xxx" },
  });
  
// 查看购物车
export const getUserProfiles = () => {
  request.get("/cms/shop/userProfiles", {
    headers: { "x-auth-token": "xxx" },
  });
};

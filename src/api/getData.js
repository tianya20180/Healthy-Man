import fetch from '@/config/fetch';

/**
 * 登陆
 */

export const login = data => fetch('http://192.144.236.155:8080/admin/login', data, 'POST');
export const getOrderList=(start,end,current,size)=>fetch('http://192.144.236.155:8080/admin/getAllOrder',{start,end,current,size},'GET')

export const getAdminList = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllAdmin',{current,size});
export const addAdminList = data => fetch('http://192.144.236.155:8080/admin/add', data, 'POST');
export const deleteArticle = id => fetch('http://192.144.236.155:8080/admin/deleteArticleById?id='+id);
export const getArticleList = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllArticle',{current,size});
export const getUserList = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllUser',{current,size});
export const getDoctorList = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllDoctor',{current,size});
export const getAuthenticationList = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllAuthentiation',{current,size});
export const banUser = id => fetch('http://192.144.236.155:8080/admin/banUser?id='+id);
export const releaseUser = id => fetch('http://192.144.236.155:8080/admin/releaseUser?id='+id);

export const deleteUser = id => fetch('http://192.144.236.155:8080/admin/deleteUser?id='+id);
export const deleteAdmin = id => fetch('http://192.144.236.155:8080/admin/delete?id='+id);
export const banDoctor = id => fetch('http://192.144.236.155:8080/admin/banDoctor?id='+id);
export const releaseDoctor = id => fetch('http://192.144.236.155:8080/admin/releaseDoctor?id='+id);

export const deleteDoctor = id => fetch('http://192.144.236.155:8080/admin/deleteDoctor?id='+id);
export const deleteOrder = id => fetch('http://192.144.236.155:8080/admin/deleteOrder?id='+id);
export const agree = (doctorId,authenticationId) => fetch('http://192.144.236.155:8080/admin/authenticationAgree?doctorId=' + doctorId+'&authenticationId='+authenticationId);
export const disagree = (doctorId,authenticationId) => fetch('http://192.144.236.155:8080/admin/authenticationReject/doctorId=' + doctorId+'&authenticationId='+authenticationId);
export const getAllCategory = (current,size) => fetch('http://192.144.236.155:8080/admin/getAllCategory',{current,size});
export const addCategory = (data) => fetch('http://192.144.236.155:8080/category/add',data,'POST');
export const deleteCategory = (id) => fetch('http://192.144.236.155:8080/category/delete?id='+id);
export const getdata = () => fetch('http://192.144.236.155:8080/admin/getData');












































/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */

export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */

export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */

export const orderCount = date => fetch('/statis/order/' + date + '/count');


/**
 * 某一天管理员注册量
 */

export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

/**
 * 管理员列表
 */

export const adminList = data => fetch('/admin/getAllAdmin', data);

/**
 * 管理员数量
 */

export const adminCount = () => fetch('/admin/count');

/**
 * 获取定位城市
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 添加商铺
 */

export const addShop = data => fetch('/shopping/addShop', data, 'POST');

/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});

/**
 * 获取当前店铺食品种类
 */

export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

/**
 * 添加食品种类
 */



/**
 * 添加食品
 */

export const addFood = data => fetch('/shopping/addfood', data, 'POST');


/**
 * category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

/**
 * 获取餐馆列表
 */

export const getResturants = data => fetch('/shopping/restaurants', data);

/**
 * 获取餐馆详细信息
 */

export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

/**
 * 获取餐馆数量
 */

export const getResturantsCount = () => fetch('/shopping/restaurants/count');

/**
 * 更新餐馆信息
 */

export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

/**
 * 删除餐馆
 */

export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

/**
 * 获取食品列表
 */

export const getFoods = data => fetch('/shopping/v2/foods', data);

/**
 * 获取食品数量
 */

export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


/**
 * 获取menu列表
 */

export const getMenu = data => fetch('/shopping/v2/menu', data);

/**
 * 获取menu详情
 */

export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

/**
 * 更新食品信息
 */

export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

/**
 * 删除食品
 */

export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

/**
 * 获取用户列表
 */


/**
 * 获取用户数量
 */

export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 获取订单列表
 */



/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');

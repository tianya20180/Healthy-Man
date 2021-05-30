import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const login = (r) =>
    require.ensure([], () => r(require("@/page/login")), "login");
const manage = (r) =>
    require.ensure([], () => r(require("@/page/manage")), "manage");
const home = (r) => require.ensure([], () => r(require("@/page/home")), "home");
const addShop = (r) =>
    require.ensure([], () => r(require("@/page/addShop")), "addShop");
const addGoods = (r) =>
    require.ensure([], () => r(require("@/page/addGoods")), "addGoods");
const userList = (r) =>
    require.ensure([], () => r(require("@/page/userList")), "userList");
const doctorList = (r) =>
    require.ensure([], () => r(require("@/page/doctorList")), "doctorList");
const AuthenticationList = (r) =>
    require.ensure(
        [],
        () => r(require("@/page/AuthenticationList")),
        "AuthenticationList"
    );

const Article = (r) =>
    require.ensure([], () => r(require("@/page/Article")), "Article");
const shopList = (r) =>
    require.ensure([], () => r(require("@/page/shopList")), "shopList");
const foodList = (r) =>
    require.ensure([], () => r(require("@/page/foodList")), "foodList");
const orderList = (r) =>
    require.ensure([], () => r(require("@/page/orderList")), "orderList");
const adminList = (r) =>
    require.ensure([], () => r(require("@/page/adminList")), "adminList");
const visitor = (r) =>
    require.ensure([], () => r(require("@/page/visitor")), "visitor");
const newMember = (r) =>
    require.ensure([], () => r(require("@/page/newMember")), "newMember");
const uploadImg = (r) =>
    require.ensure([], () => r(require("@/page/uploadImg")), "uploadImg");
const vueEdit = (r) =>
    require.ensure([], () => r(require("@/page/vueEdit")), "vueEdit");
const adminSet = (r) =>
    require.ensure([], () => r(require("@/page/adminSet")), "adminSet");
const sendMessage = (r) =>
    require.ensure([], () => r(require("@/page/sendMessage")), "sendMessage");
const explain = (r) =>
    require.ensure([], () => r(require("@/page/explain")), "explain");
const categoryList = (r) =>
    require.ensure([], () => r(require("@/page/categoryList")), "categoryList");
const routes = [
    {
        path: "/",
        component: login,
    },
    {
        path: "/login",
        component: login,
    },
    {
        path: "/manage",
        component: manage,
        name: "",
        children: [
            {
                path: "",
                component: home,
                meta: [],
            },
            {
                path: "/userList",
                component: userList,
                meta: ["数据管理", "用户列表"],
            },
            {
                path: "/doctorList",
                component: doctorList,
                meta: ["数据管理", "医生列表"],
            },
            {
                path: "/orderList",
                component: orderList,
                meta: ["数据管理", "订单列表"],
            },
            {
                path: "/AuthenticationList",
                component: AuthenticationList,
                meta: ["数据管理", "认证列表"],
            },
            {
                path: "/adminList",
                component: adminList,
                meta: ["数据管理", "管理员列表"],
            },
            {
                path: "/visitor",
                component: visitor,
                meta: ["图表", "用户分布"],
            },
            {
                path: "/newMember",
                component: newMember,
                meta: ["图表", "用户数据"],
            },
            {
                path: "/adminSet",
                component: adminSet,
                meta: ["设置", "管理员设置"],
            },
            {
                path: "/sendMessage",
                component: sendMessage,
                meta: ["设置", "发送通知"],
            },
            {
                path: "/categoryList",
                component: categoryList,
                meta: ["设置", "发送通知"],
            },
            {
                path: "/",
                component: sendMessage,
                meta: ["设置", "发送通知"],
            },
            {
                path: "/explain",
                component: explain,
                meta: ["说明", "说明"],
            },
						{
							path: "/getallarti",
							component: Article,
							meta: ["文章管理", "文章管理"]
						}
        ],
    },
];

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== "production",
});

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

const routes = [
	{
		path: "/",
		name: "LoginPage",
		component: () =>
			import(/* webpackChunkName: "LoginPage" */ "@/views/LoginPage.vue"),
		meta: {
			keepAlive: true,
			title: "登录",
		},
	},
	{
		path: "/homePage",
		name: "HomePage",
		component: () =>
			import(/* webpackChunkName: "HomePage" */ "@/views/home/HomePage.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "主页",
		},
	},
	{
		path: "/roomList",
		name: "RoomList",
		component: () =>
			import(/* webpackChunkName: "RoomList" */ "@/views/home/RoomList.vue"),
		meta: {
			keepAlive: false,
			title: "房型列表",
		},
	},
	{
		path: "/roomDetail/:id",
		name: "RoomDetail",
		component: () =>
			import(
				/* webpackChunkName: "RoomDetail" */ "@/views/home/RoomDetail.vue"
			),
		meta: {
			keepAlive: true,
			title: "房型详情",
		},
	},
	{
		path: "/orderPage",
		name: "OrderPage",
		component: () =>
			import(/* webpackChunkName: "OrderPage" */ "@/views/order/OrderPage.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "订单",
		},
	},
	{
		path: "/payResult",
		name: "PayResult",
		component: () =>
			import(/* webpackChunkName: "PayResult" */ "@/views/order/PayResult.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "支付结果页",
		},
	},
	{
		path: "/orderAssess",
		name: "OrderAssess",
		component: () =>
			import(
				/* webpackChunkName: "OrderAssess" */ "@/views/order/OrderAssess.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: true,
			title: "评论页",
		},
	},
	{
		path: "/orderAssessResult",
		name: "OrderAssessResult",
		component: () =>
			import(
				/* webpackChunkName: "OrderAssessResult" */ "@/views/order/OrderAssessResult.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: true,
			title: "评论结果",
		},
	},
	{
		path: "/memberPage",
		name: "MemberPage",
		component: () =>
			import(
				/* webpackChunkName: "MemberPage" */ "@/views/member/MemberPage.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "会员",
		},
	},
	{
		path: "/memberOpening",
		name: "MemberOpening",
		component: () =>
			import(
				/* webpackChunkName: "MemberOpening" */ "@/views/member/MemberOpening.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "开通会员",
		},
	},
	{
		path: "/pointsMall",
		name: "PointsMall",
		component: () =>
			import(
				/* webpackChunkName: "PointsMall" */ "@/views/member/PointsMall.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "积分商城",
		},
	},
	{
		path: "/commodityDetail",
		name: "CommodityDetail",
		component: () =>
			import(
				/* webpackChunkName: "CommodityDetail" */ "@/views/member/CommodityDetail.vue"
			),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "商品详情",
		},
	},
	{
		path: "/myPage",
		name: "MyPage",
		component: () =>
			import(/* webpackChunkName: "MyPage" */ "@/views/my/MyPage.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "我的",
		},
	},
  {
		path: "/infoChange",
		name: "InfoChange",
		component: () =>
			import(/* webpackChunkName: "InfoChange" */ "@/views/my/InfoChange.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "信息修改",
		},
	},
  {
		path: "/commonInformation",
		name: "CommonInformation",
		component: () =>
			import(/* webpackChunkName: "CommonInformation" */ "@/views/my/CommonInformation.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "常用信息",
		},
	},
  {
		path: "/integralRecord",
		name: "IntegralRecord",
		component: () =>
			import(/* webpackChunkName: "IntegralRecord" */ "@/views/my/IntegralRecord.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "积分记录",
		},
	},
	{
		path: "/feedback",
		name: "Feedback",
		component: () =>
			import(/* webpackChunkName: "Feedback" */ "@/views/my/Feedback.vue"),
		meta: {
			requiredAuth: true,
			keepAlive: false,
			title: "意见反馈",
		},
	},
];

const router = new VueRouter({
	routes,
});

// 路由全局守卫
router.beforeEach((to, from, next) => {
	// console.log('路由全局守卫: router - beforeEach：',to)
	// if(to.path.includes('news')) { 需要鉴权内容过多时，用 meta
	if (to.matched.some((record) => record.meta.requiredAuth)) {
		// console.log(store.state)
		if (store.state.userInfo.phone) {
			next();
		} else {
			next({ name: "LoginPage" });
		}
	} else {
		next();
	}
});

export default router;

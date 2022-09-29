import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import DetailAnime from "../pages/DetailAnime.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/detail",
		name: "Detail",
		component: DetailAnime,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

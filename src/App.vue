<template>
	<Navbar />
	<router-view />
</template>

<script>
	import Navbar from "./components/Navbar.vue";

	export default {
		components: { Navbar },
	};
</script>

<style>
	body {
		background-color: #294273;
	}
</style>

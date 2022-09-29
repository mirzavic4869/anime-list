<script setup>
	import { ref, computed, onMounted } from "vue";

	const query = ref("");
	const my_anime = ref([]);
	const search_results = ref([]);

	const my_anime_asc = computed(() => {
		return my_anime.value.sort((a, b) => {
			return a.title.localCompare(b.title);
		});
	});

	const searchAnime = () => {
		const url = `https://api.jikan.moe/v4/anime?q=${query.value}`;
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				search_results.value = res.data;
			});
	};

	const handleInput = (e) => {
		if (!e.target.value) {
			search_results.value = [];
		}
	};

	const addAnime = (anime) => {
		search_results.value = [];
		query.value = "";

		my_anime.value.push({
			id: anime.mal_id,
			title: anime.title,
			image: anime.images.jpg.image_url,
			total_episodes: anime.episodes,
			watched_episodes: 0,
		});

		localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
	};

	const increaseWatch = (anime) => {
		anime.watched_episodes++;
		localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
	};
	const decreaseWatch = (anime) => {
		anime.watched_episodes--;
		localStorage.setItem("my_anime", JSON.stringify(my_anime.value));
	};

	onMounted(() => {
		my_anime.value = JSON.parse(localStorage.getItem("my_anime")) || [];
	});
</script>

<template>
	<main>
		<h1>My Anime List</h1>
		<form @submit.prevent="searchAnime">
			<input type="text" placeholder="Search for an anime" v-model="query" @input="handleInput" />
			<button class="button" type="submit">Search</button>
		</form>

		<div class="results" v-if="search_results.length > 0">
			<div class="result" v-for="anime in search_results">
				<img :src="anime.images.jpg.image_url" alt="picture" />
				<div class="details">
					<h3>{{ anime.title }}</h3>
					<p :title="anime.synopsis" v-if="anime.synopsis">{{ anime.synopsis.slice(0, 120) }} ...</p>
					<span class="flex-1"></span>
					<button class="button" @click="addAnime(anime)">Add to my anime</button>
				</div>
			</div>
		</div>

		<div class="myanime" v-if="my_anime.length > 0">
			<h2>My Anime</h2>

			<div v-for="anime in my_anime_asc" class="anime">
				<img :src="anime.image" />
				<h3>{{ anime.title }}</h3>
				<div class="flex-1"></div>
				<span class="episodes"> {{ anime.watched_episodes }} / {{ anime.total_episodes }} </span>
				<button class="button" v-if="anime.watched_episodes !== anime.total_episodes" @click="increaseWatch(anime)">+</button>
				<button class="button" v-if="anime.watched_episodes > 0" @click="decreaseWatch(anime)">-</button>
			</div>
		</div>
	</main>
</template>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
	}

	body {
		background-color: whitesmoke;
	}

	main {
		margin: 0 auto;
		max-width: 768px;
		padding: auto 1.5rem;
	}

	h1 {
		font-size: 2rem;
		text-align: center;
		margin-bottom: 1.5rem;
	}

	form {
		display: flex;
		max-width: 480px;
		margin: 0 auto 1.5rem;
	}

	form input {
		appearance: none;
		outline: none;
		border: none;
		background: white;

		display: block;
		color: cadetblue;
		font-size: 1.125 rem;
		padding: 0.5rem 1rem;
		width: 100%;
	}

	.results {
		background-color: white;
		border-radius: 0.5 rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-height: 480px;
		overflow-y: scroll;
		margin-bottom: 1.5rem;
	}

	.result {
		display: flex;
		margin: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		transition: 0.4s;
	}

	.result img {
		width: 100px;
		border-radius: 1rem;
		margin-right: 1rem;
	}

	.button {
		appearance: none;
		outline: none;
		border: none;
		background: none;
		cursor: pointer;
		display: block;
		padding: 0.5rem 1rem;
		background-image: linear-gradient(to right, rgb(6, 58, 90) 50%, rgb(10, 140, 221) 50%);
		background-size: 200%;
		color: white;
		font-size: 1.125rem;
		font-weight: bold;
		text-transform: uppercase;
		transition: 0.4s;
	}
	.button:hover {
		background-position: right;
	}

	.details {
		flex: 1 1 0%;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}

	.flex-1 {
		flex: 1 1 0%;
		display: block;
	}

	.details h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: tomato;
	}

	.details p {
		font-size: 0.875rem;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		text-align: left;
	}

	.details .button {
		margin-left: auto;
	}

	.myanime .anime {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		background-color: white;
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	}

	.myanime h2 {
		color: #888;
		font-weight: 600;
		margin-bottom: 1.5rem;
	}

	.anime img {
		width: 72px;
		height: 72px;
		object-fit: cover;
		border-radius: 1rem;
		margin-right: 1rem;
	}

	.anime h3 {
		color: tomato;
		font-size: 1.125rem;
		margin-right: 1rem;
	}

	.anime .episodes {
		margin-right: 1rem;
		color: rgb(8, 28, 72);
	}

	.anime .button:first-of-type {
		margin-right: 1rem;
	}

	.anime .button:last-of-type {
		margin-right: 0;
	}

	@media only screen and (min-width: 768px) {
		h1 {
			font-size: 3rem;
			text-align: center;
			margin-bottom: 1.5rem;
		}
		.myanime h2 {
			text-align: left;
			color: #888;
			font-weight: 600;
			margin-bottom: 1.5rem;
		}
	}
</style>

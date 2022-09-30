<!-- <template>
	<div class="anime-detail">
		<h2>{{ characters.name }}</h2>
		<h3>{{ characters.name_kanji }}</h3>
		<p>{{ characters.about }}</p>
		<img :src="characters.images.jpg.image_url" alt="Anime Poster" class="featured-img" />
		<h3>{{ characters.anime.role }}</h3>
	</div>
</template>

<script>
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";

	export default {
		setup() {
			const detailAnime = ref({});
			// const route = useRoute();

			onMounted(() => {
				fetch(`https://api.jikan.moe/v4/characters/{id}/full`)
					.then((response) => response.json())
					.then((res) => {
						detailAnime.value = res.data;
						console.log(res.data);
					});
			});

			return {
				detailAnime,
			};
		},
	};
</script>

<style>
	.anime-detail {
		padding: 16px;
	}
	h2 {
		color: #fff;
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.featured-img {
		display: block;
		max-width: 200px;
		margin-bottom: 16px;
	}
	p {
		color: #fff;
		font-size: 18px;
		line-height: 1.4;
	}
</style> -->

<template>
	<div class="topnav">
		<router-link to="/" href="#">Home</router-link>
		<router-link to="/detail">Detail</router-link>
	</div>
</template>

<style>
	.topnav {
		background-color: #333;
		overflow: hidden;
		margin: auto;
		width: 100%;
		margin-bottom: 3rem;
	}

	.topnav a {
		float: left;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		font-size: 17px;
	}

	.topnav a:hover {
		background-color: #4eb1d9;
		color: white;
		font-weight: bolder;
	}

	.topnav a.active {
		background-color: tomato;
		color: white;
	}
</style>

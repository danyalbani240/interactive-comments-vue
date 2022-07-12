<template>
	<div></div>
</template>

<script>
export default {
	data() {
		return {
			comments: [],
		};
	},
	mounted() {
		fetch(
			"https://interactive-comments-70a95-default-rtdb.firebaseio.com/comments.json"
		)
			.then((res) => res.json())
			.then((res) => {
				this.comments = Object.values(res);
			});
	},
};
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>

<template>
	<div>
		<Vue3Lottie :animationData="loader" :height="200" :width="200" />
	</div>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import "vue3-lottie/dist/style.css";
import loader from "../assets/11473-loading-spinner.json";

export default {
	components: {
		vue3Lottie: defineAsyncComponent(() => {
			import(vue3Lottie);
		}),
	},
	data() {
		return {
			loader,
		};
	},
};
</script>

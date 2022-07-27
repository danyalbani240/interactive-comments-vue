<template>
	<BaseComment
		v-if="commentData.user.username !== 'juliusomo'"
		:commentData="commentData"
	/>
	<UserComment :commentData="commentData" v-else />
</template>

<script>
import UserComment from "./UserComment.vue";

import BaseComment from "./BaseComment.vue";
export default {
	components: {
		UserComment,
		BaseComment,
	},

	props: {
		commentData: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style></style>

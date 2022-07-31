<template>
	<BaseReply
		:replyData="replyData"
		:parentId="parentId"
		v-if="replyData.user.username !== 'juliusomo'"
	/>
	<UserReply :replyData="replyData" :parentId="parentId" v-else />
</template>

<script>
import BaseReply from "./BaseReply.vue";
import UserReply from "./UserReply.vue";
export default {
	components: { BaseReply, UserReply },

	props: {
		replyData: {
			type: Object,
			required: true,
		},
		parentId: {
			required: true,
			type: Number,
		},
	},
};
</script>

<style></style>

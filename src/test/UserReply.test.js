import { describe, it, vi, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { useCommentsStore } from "../stores/comments.js";
import { createTestingPinia } from "@pinia/testing";
import flushPromises from "flush-promises";
import UserReply from "../components/UserReply.vue";
const replyData = {
	content: "123",
	createdAt: "1 day ago",
	replyingTo: "amyrobson",
	score: 0,
	user: {
		image: {
			png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
			webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
		},
		username: "juliusomo",
	},
	id: "-N8TEwaVq8H0clh4KEx3",
};
describe("ReplyUser", () => {
	it("should load the data", async () => {
		const wrapper = mount(UserReply, {
			props: {
				replyData: replyData,
				parentId: 0,
			},
		});
		const html = wrapper.html();
		//assert
		expect(html).contain(replyData.content);
		expect(html).contain(replyData.createdAt);
		expect(html).contain(replyData.replyingTo);
		expect(html).contain(replyData.score);
		expect(html).contain(replyData.user.username);
		expect(html).contain(replyData.user.image.png);
	});
	it("should delete the reply after clicking on delete button", async () => {
		const wrapper = mount(UserReply, {
			props: {
				replyData: replyData,
				parentId: 0,
			},
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		const deleteButton = wrapper.find(".delete-button");
		const store = useCommentsStore();
		await deleteButton.trigger("click");
		await flushPromises();
		expect(store.deleteReply).toHaveBeenCalledTimes(1);
		expect(wrapper.classes()).contain("delete-animation");
	});
});

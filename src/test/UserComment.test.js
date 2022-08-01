import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import UserComment from "../components/UserComment.vue";
import { useCommentsStore } from "../stores/comments.js";
import { createTestingPinia } from "@pinia/testing";
import flushPromises from "flush-promises";
const commentData = {
	content: "123",
	score: 0,
	replies: [],
	user: {
		username: "juliusomo",
		image: {
			png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
			webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
		},
	},
	createdAt: "1 day ago",
	id: "-N8PgagFetF2cVvAxhWX",
};
describe("UserComment", () => {
	it("loads the data ", () => {
		const wrapper = mount(UserComment, {
			props: {
				commentData,
			},
		});
		expect(wrapper.html()).contain(commentData.content);
		expect(wrapper.html()).contain(commentData.score);
		expect(wrapper.html()).contain(commentData.user.username);
		expect(wrapper.html()).contain(commentData.createdAt);
		expect(wrapper.html()).contain(commentData.user.image.png);
	});
	it("should open the EDit Modal After Clicking on Edit Button", async () => {
		const wrapper = mount(UserComment, {
			props: {
				commentData,
			},
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		const editButton = wrapper.find(".edit-button");

		await editButton.trigger("click");
		expect(wrapper.find('[data-test="modal-bg"]').exists()).toBe(true);
	});
	it("should the Comment after Clicking on Delete Button", async () => {
		const wrapper = mount(UserComment, {
			props: {
				commentData,
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
		expect(deleteButton.exists()).toBe(true);
		await deleteButton.trigger("click");
		const store = useCommentsStore();
		await flushPromises();
		expect(wrapper.classes()).contain("delete-animation");
		expect(store.deleteComment).toHaveBeenCalledTimes(1);
	});
});

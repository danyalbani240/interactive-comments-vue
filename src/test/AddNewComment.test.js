import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { useCommentsStore } from "../stores/comments.js";
import { createTestingPinia } from "@pinia/testing";
import flushPromises from "flush-promises";
import AddNewCommentForm from "../components/AddNewCommentForm.vue";
describe("AddNewCommentForm", () => {
	it("should not send request or run any functions if comment is empty", async () => {
		const wrapper = mount(AddNewCommentForm, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		await wrapper.find("textarea").setValue("");
		await wrapper.find("form").trigger("submit");
		const store = useCommentsStore();

		await flushPromises();
		expect(store.createNewComment).toHaveBeenCalledTimes(0);
	});
	it("should  send request or run any functions if comment is not epmty", async () => {
		const wrapper = mount(AddNewCommentForm, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		await wrapper.find("textarea").setValue("My Name Is Danyal");
		await wrapper.find("form").trigger("submit");
		const store = useCommentsStore();

		await flushPromises();
		expect(store.createNewComment).toHaveBeenCalledTimes(1);
	});
});

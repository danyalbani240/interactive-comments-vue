import App from "../App.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { useCommentsStore } from "../stores/comments.js";
import { createTestingPinia } from "@pinia/testing";
import flushPromises from "flush-promises";
describe("App", () => {
	it("should load the form from first", () => {
		const wrapper = shallowMount(App, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		const newCommnetForm = wrapper.find("add-new-comment-form-stub");
		expect(newCommnetForm.exists()).toBe(true);
	});
	it("there should be loading before the data come", () => {
		//Arrange
		const wrapper = shallowMount(App, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});
		//
		const loadingStub = wrapper.find("loading-stub");
		//Assert
		expect(loadingStub.exists()).toBe(true);
	});
	it("there should show the data after getting the comments from backend", async () => {
		//Arrange
		const wrapper = shallowMount(App, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
			},
		});

		const store = useCommentsStore();

		await store.getComments();
		expect(store.getComments).toHaveBeenCalledTimes(1);
		await flushPromises();
		//Assert
		console.log(wrapper.html());
	});
});

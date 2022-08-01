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
		const responseData = {
			0: {
				content:
					"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
				createdAt: "1 month ago",
				id: 0,
				score: 12,
				user: {
					image: {
						png: "https://i.ibb.co/vCNV76M/image-amyrobson.png",
						webp: "https://i.ibb.co/jZf7vhP/image-amyrobson.webp",
					},
					username: "amyrobson",
				},
			},
			1: {
				content:
					"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
				createdAt: "2 weeks ago",
				id: 1,
				replies: {
					0: {
						content:
							"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
						createdAt: "1 week ago",
						id: 0,
						replyingTo: "maxblagun",
						score: 4,
						user: {
							image: {
								png: "https://i.ibb.co/Z1KMm0h/image-ramsesmiron.png",
								webp: "https://i.ibb.co/TwmFm1v/image-ramsesmiron.webp",
							},
							username: "ramsesmiron",
						},
					},
					1: {
						content:
							"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
						createdAt: "2 days ago",
						id: 1,
						replyingTo: "ramsesmiron",
						score: 2,
						user: {
							image: {
								png: "https://i.ibb.co/jWJfdwM/image-juliusomo.png",
								webp: "https://i.ibb.co/cDyZ7yQ/image-juliusomo.webp",
							},
							username: "juliusomo",
						},
					},
				},
				score: "5",
				user: {
					image: {
						png: "https://i.ibb.co/125LL4p/image-maxblagun.png",
						webp: "https://i.ibb.co/pnnKnZb/image-maxblagun.webp",
					},
					username: "maxblagun",
				},
			},
		};
		store.getComments.mockResolvedValue(responseData);
		await flushPromises();

		await (() => {
			store.comments = responseData;
		})();
		//Assert
		expect(store.getComments).toHaveBeenCalledTimes(1);
		expect(wrapper.html()).contain("comment-stub");
	});
});

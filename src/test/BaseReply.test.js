import BaseReply from "../components/BaseReply.vue";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
const replyData = {
	id: 1,
	content:
		"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
	createdAt: "1 week ago",
	score: 4,
	replyingTo: "maxblagun",
	user: {
		image: {
			png: "https://i.ibb.co/Z1KMm0h/image-ramsesmiron.png",
			webp: "https://i.ibb.co/TwmFm1v/image-ramsesmiron.webp",
		},
		username: "ramsesmiron",
	},
};
describe("BaseReply", () => {
	it("loads the initial data properly", () => {
		const wrapper = mount(BaseReply, {
			props: {
				replyData: replyData,
				parentId: 1,
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
	it("replyModal should not be Visible By Default", () => {
		const wrapper = mount(BaseReply, {
			props: {
				replyData: replyData,
				parentId: 1,
			},
		});
		const replyModal = wrapper.find('[data-test="reply-Modal"');
		expect(replyModal.isVisible()).toBe(false);
	});
	it("should open Reply Modal when clicking on Reply Button Desktop, and mobile", async () => {
		const wrapper = mount(BaseReply, {
			props: {
				replyData: replyData,
				parentId: 1,
			},
		});
		const replyButtonDesktop = wrapper.find('[data-test="replyBDesktop"]');
		expect(replyButtonDesktop.exists()).toBe(true);
		expect(wrapper.find('[data-test="reply-Modal"]').isVisible()).toBe(
			false
		);
		await replyButtonDesktop.trigger("click");
		expect(wrapper.find('[data-test="reply-Modal"]').isVisible()).toBe(
			true
		);
		await wrapper.setData({ showReplyModal: false });
		//now testing for mobile
		expect(wrapper.find('[data-test="reply-Modal"]').isVisible()).toBe(
			false
		);
		const replyButtonMobile = wrapper.find('[data-test="replyBMobile"]');
		expect(replyButtonMobile.exists()).toBe(true);
		await replyButtonDesktop.trigger("click");
		expect(wrapper.find('[data-test="reply-Modal"]').isVisible()).toBe(
			true
		);
		wrapper.unmount();
	});
});

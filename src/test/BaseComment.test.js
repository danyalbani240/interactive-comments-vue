import { describe, expect, it, afterEach, beforeEach, test } from "vitest";
import { mount } from "@vue/test-utils";
import BaseComment from "../components/BaseComment.vue";
let commentData = {
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
	replies: {},
};

describe("BaseComment", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(BaseComment, {
			props: { commentData: commentData },
		});
	});
	afterEach(() => {
		wrapper.unmount();
	});

	it("should render the data properly", async () => {
		expect(wrapper.text()).contain(commentData.content);
		expect(wrapper.text()).contain(commentData.createdAt);
		expect(wrapper.text()).contain(commentData.score);
		expect(wrapper.text()).contain(commentData.user.username);
	});

	it("should make replyBoxShow Boolean true after Clicking on reply and after clicking cancel it will be false", async () => {
		const button = wrapper.find('[data-test="reply-desktop"]');
		//first time clicking it shows the ReplyBox and the text of button switch to cancel
		await button.trigger("click");
		const replyBox = wrapper.find('[data-test="reply-box"]');
		expect(button.text()).toBe("Cancel");
		expect(replyBox.isVisible()).toBe(true);
		// expect to close it after the clicking again
		await button.trigger("click");
		expect(replyBox.isDisabled()).toBe(false);
		expect(button.text()).toBe("Reply");
	});
	test("replyBox By default should not exist ", () => {
		const replyBox = wrapper.find('[data-test="reply-box"]');

		expect(replyBox.exists()).toBe(false);
	});
});

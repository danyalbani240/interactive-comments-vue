import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ReplyModal from "../components/ReplyModal.vue";

describe("replyModal", () => {
	it(" should be emitting close event when we click on background", async () => {
		const wrapper = mount(ReplyModal);
		const replyModalContainer = wrapper.find('[data-test="reply-Modal"]');
		await replyModalContainer.trigger("click");
		const hadnleCloseEmit = wrapper.emitted("closeModal");

		expect(hadnleCloseEmit).toHaveLength(1);
	});
});

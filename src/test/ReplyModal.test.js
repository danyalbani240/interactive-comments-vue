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
	it("should emit cancel event when we click on cancel button", async () => {
		const wrapper = mount(ReplyModal);
		const caneclButton = wrapper.find("button.cancel");
		await caneclButton.trigger("click");
		const cancelEmit = wrapper.emitted("cancel");
		expect(cancelEmit).toHaveLength(1);
	});
	it("Should send the data back when we click on send", async () => {
		const wrapper = mount(ReplyModal);
		const textarea = wrapper.find("textarea");
		const replyText = "Hello gorgeous";
		await textarea.setValue(replyText);
		const replyButton = wrapper.find('[data-test="reply-button"]');
		expect(replyButton.exists()).toBe(true);
		await replyButton.trigger("click");
		const submitModalEmit = wrapper.emitted("submitModal");
		expect(submitModalEmit).toHaveLength(1);
		expect(submitModalEmit[0][0]).toBe(replyText);
	});
	it("Should not send the data back when we click on send and textArea is emty", async () => {
		const wrapper = mount(ReplyModal);
		const textarea = wrapper.find("textarea");
		const replyText = "";
		await textarea.setValue(replyText);
		const replyButton = wrapper.find('[data-test="reply-button"]');
		expect(replyButton.exists()).toBe(true);
		await replyButton.trigger("click");
		const submitModalEmit = wrapper.emitted("submitModal");
		// undefined because no emit has happend
		expect(submitModalEmit).toBe(undefined);
	});
});

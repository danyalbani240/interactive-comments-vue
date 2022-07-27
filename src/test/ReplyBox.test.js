import { describe, expect, it, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ReplyBox from "../components/ReplyBox.vue";

describe("replyBox", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(ReplyBox);
	});
	afterEach(() => {
		wrapper.unmount();
	});
	it("should be shown if the replyBoxShow Prop is True", async () => {
		await wrapper.setProps({
			replyBoxShow: true,
		});
		expect(wrapper.isVisible()).toBe(true);
	});
	it("shouldn't be shown if the replyBoxShow Prop is False", async () => {
		await wrapper.setProps({
			replyBoxShow: false,
		});
		expect(wrapper.isVisible()).toBe(false);
	});
	it("should set user's name to the textarea", async () => {
		const userName = "Danyal";
		await wrapper.setProps({
			modelValue: "@" + userName,
		});
		const textArea = wrapper.get("textarea");

		expect(textArea.wrapperElement._value).include(userName);
	});
	it("should not be visible after closing submitting the form", async () => {
		await wrapper.get("form").trigger("submit");
		expect(wrapper.isVisible()).toBe(false);
	});
	it("should emit handleReply event", async () => {
		await wrapper.setProps({
			replyBoxShow: true,
		});
		await wrapper.get("form").trigger("submit");
		const handleReplyEvent = wrapper.emitted("handleReply");
		expect(handleReplyEvent).toHaveLength(1);
	});
});

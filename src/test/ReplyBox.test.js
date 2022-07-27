import { describe, expect, it, afterEach, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ReplyBox from "../components/ReplyBox.vue";

describe("replyBox", () => {
	it("should be shown if the replyBoxShow Prop is True", () => {
		const wrapper = mount(ReplyBox, {
			props: {
				replyBoxShow: true,
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
	it("shouldn't be shown if the replyBoxShow Prop is False", () => {
		const wrapper = mount(ReplyBox, {
			props: {
				replyBoxShow: false,
			},
		});
		expect(wrapper.isVisible()).toBe(false);
	});
	it("should set user's name to the textarea", () => {
		const userName = "Danyal";
		const wrapper = mount(ReplyBox, {
			props: {
				modelValue: "@" + userName,
			},
		});
		const textArea = wrapper.get("textarea");

		expect(textArea.wrapperElement._value).include(userName);
	});
	it("should not be visible after closing submitting the form", async () => {
		const wrapper = mount(ReplyBox);
		await wrapper.get("form").trigger("submit");
		expect(wrapper.isVisible()).toBe(false);
	});
});

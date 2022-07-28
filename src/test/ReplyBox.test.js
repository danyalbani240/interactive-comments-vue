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

	it("should emit handleReply event to parent Component with the text", async () => {
		const textArea = wrapper.find("textarea");
		const value = "yes it's good";
		await textArea.setValue(value);
		await wrapper.get("form").trigger("submit");
		const handleReplyEvent = wrapper.emitted("handleReply");
		expect(handleReplyEvent).toHaveLength(1);
		expect(handleReplyEvent[0][0]).toBe(value);
	});
});

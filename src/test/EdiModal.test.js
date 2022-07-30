import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import EditModal from "../components/EditModal.vue";
describe("EditModal", () => {
	it("should set the textarea's deafult inital value to baseValue  prop ", async () => {
		const wrapper = mount(EditModal, {
			props: {
				baseValue: "@juluisomo",
			},
		});
		const textarea = wrapper.find("textarea");
		expect(textarea.element.value).toBe("@juluisomo");
	});
	it("it should Emit Close Modal Event when Ever User Click on the BackGround", async () => {
		const wrapper = mount(EditModal, {
			props: {
				baseValue: "@juluisomo",
			},
		});
		const bgElement = wrapper.find('[data-test="modal-bg"]');
		await bgElement.trigger("click");
		const closeModalEmit = wrapper.emitted("closeModal");
		expect(closeModalEmit).toHaveLength(1);
	});
	it("should emit cancel event when we click on cancel button", async () => {
		const wrapper = mount(EditModal, {
			props: {
				baseValue: "@juluisomo",
			},
		});
		const caneclButton = wrapper.find("button.cancel");
		await caneclButton.trigger("click");
		const cancelEmit = wrapper.emitted("cancel");
		expect(cancelEmit).toHaveLength(1);
	});
	it("Should send the data back when we click on send", async () => {
		const baseValue = "@juluisomo";
		const wrapper = mount(EditModal, {
			props: {
				baseValue: baseValue,
			},
		});
		const textarea = wrapper.find("textarea");
		const editText = "Hello gorgeous";
		await textarea.setValue(baseValue + editText);
		const editButton = wrapper.find(".send-edit");
		expect(editButton.exists()).toBe(true);
		await editButton.trigger("click");
		const submitModalEmit = wrapper.emitted("submitModal");
		expect(submitModalEmit).toHaveLength(1);
		expect(submitModalEmit[0][0]).toBe(baseValue + editText);
	});
	it("Should not send the data back when we click on send and the textarea is not added any thing on it yet", async () => {
		const baseValue = "@juluisomo";
		const wrapper = mount(EditModal, {
			props: {
				baseValue: baseValue,
			},
		});
		const textarea = wrapper.find("textarea");
		await textarea.setValue(baseValue);
		const editButton = wrapper.find(".send-edit");
		expect(editButton.exists()).toBe(true);
		await editButton.trigger("click");
		const submitModalEmit = wrapper.emitted("submitModal");
		expect(submitModalEmit).toBe(undefined);
	});
});
//Todo
//1- we should add error handling and show that user should add the data

import "../../../test-setup.js";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import "../../../src/components/NavigationMenu/navigation-menu.js";
import sinon from "sinon";
import { Router } from "@vaadin/router";
import store from "../../../src/store/index.js";

describe("NavigationMenu", () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<navigation-menu></navigation-menu>`);
  });

  it("should exist", () => {
    expect(element).to.exist;
  });

  it("should contain navigation elements", async () => {
    const nav = element.shadowRoot.querySelector(".nav");
    expect(nav).to.exist;

    const logo = element.shadowRoot.querySelector(".logo");
    expect(logo).to.exist;
    expect(logo.textContent).to.equal("ING");
  });

  it("should navigate to home when logo is clicked", async () => {
    const logo = element.shadowRoot.querySelector(".logo");

    const goSpy = sinon.spy(Router, "go");
    logo.click();
    expect(goSpy.calledWith("/")).to.be.true;
    goSpy.restore();
  });

  it("should navigate to home when employees label is clicked", async () => {
    const employeesLabel = element.shadowRoot.querySelector(".employees-label");

    const goSpy = sinon.spy(Router, "go");
    employeesLabel.click();
    expect(goSpy.calledWith("/")).to.be.true;
    goSpy.restore();
  });

  it("should navigate to home when add button is clicked", async () => {
    const employeesLabel = element.shadowRoot.querySelector(".add-btn");

    const goSpy = sinon.spy(Router, "go");
    employeesLabel.click();
    expect(goSpy.calledWith("/add")).to.be.true;
    goSpy.restore();
  });

  it("should toggle language dropdown when language flag is clicked", async () => {
    const langFlag = element.shadowRoot.querySelector(".lang-flag");

    expect(element.showLangDropdown).to.be.false;

    langFlag.click();
    expect(element.showLangDropdown).to.be.true;

    langFlag.click();
    expect(element.showLangDropdown).to.be.false;
  });

  it("should change language when a language option is clicked", async () => {
    const langFlag = element.shadowRoot.querySelector(".lang-flag");
    langFlag.click();

    await element.updateComplete;

    const langOptions = element.shadowRoot.querySelectorAll(".lang-option");
    const dispatchSpy = sinon.spy(store, "dispatch");

    langOptions[0].click();
    expect(dispatchSpy.calledWith({ type: "SET_LANGUAGE", payload: "tr" })).to
      .be.true;

    langOptions[1].click();
    expect(dispatchSpy.calledWith({ type: "SET_LANGUAGE", payload: "en" })).to
      .be.true;

    dispatchSpy.restore();
  });

  it('should display correct language flag based on current language', async () => {
    // Test Turkish flag
    store.dispatch({ type: 'SET_LANGUAGE', payload: 'tr' });
    await element.updateComplete;
    const trFlagElement = element.shadowRoot.querySelector('.lang-flag');
    const normalizedTrFlag = trFlagElement.innerHTML.trim().split('\n')[1].trim();
    const expectedTrFlag = '<img src="https://flagcdn.com/tr.svg" alt="TR" width="24" height="16" style="vertical-align:middle;">';
    expect(normalizedTrFlag).to.equal(expectedTrFlag);

    // Test English flag
    store.dispatch({ type: 'SET_LANGUAGE', payload: 'en' });
    await element.updateComplete;
    const enFlagElement = element.shadowRoot.querySelector('.lang-flag');
    const normalizedEnFlag = enFlagElement.innerHTML.trim().split('\n')[1].trim();
    const expectedEnFlag = '<img src="https://flagcdn.com/gb.svg" alt="EN" width="24" height="16" style="vertical-align:middle;">';
    expect(normalizedEnFlag).to.equal(expectedEnFlag);
  });
});

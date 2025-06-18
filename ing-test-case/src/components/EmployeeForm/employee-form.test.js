import "../../../test-setup.js";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import "../../../src/components/EmployeeForm/employee-form.js";
import sinon from "sinon";
import { Router } from "@vaadin/router";
import store from "../../../src/store/index.js";

describe("EmployeeForm", () => {
  let element;

  beforeEach(async () => {
    const mockState = {
      employees: {
        employees: [],
      },
    };
    sinon.stub(store, "getState").returns(mockState);

    element = await fixture(html`<employee-form></employee-form>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should exist", () => {
    expect(element).to.exist;
  });

  it("should render with default properties", async () => {
    expect(element.employee).to.deep.equal({
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: "",
    });
    expect(element.errors).to.deep.equal({});
    expect(element.isEdit).to.be.false;
    expect(element.employeeId).to.be.null;
  });

  it("should render all form fields", async () => {
    const form = element.shadowRoot.querySelector("form");
    expect(form).to.exist;

    const inputs = form.querySelectorAll("input");
    expect(inputs.length).to.equal(6);

    const selects = form.querySelectorAll("select");
    expect(selects.length).to.equal(2);

    const buttons = form.querySelectorAll("button");
    expect(buttons.length).to.equal(2);
  });

  it("should update input value when typing first name", async () => {
    const firstNameInput = element.shadowRoot.querySelector(
      'input[name="firstName"]'
    );
    firstNameInput.value = "John";
    firstNameInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.firstName).to.equal("John");
  });

  it("should update input value when typing last name", async () => {
    const lastNameInput = element.shadowRoot.querySelector(
      'input[name="lastName"]'
    );
    lastNameInput.value = "Doe";
    lastNameInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.lastName).to.equal("Doe");
  });

  it("should update input value when selecting date of employment", async () => {
    const dateOfEmploymentInput = element.shadowRoot.querySelector(
      'input[name="dateOfEmployment"]'
    );
    dateOfEmploymentInput.value = "2024-03-20";
    dateOfEmploymentInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.dateOfEmployment).to.equal("2024-03-20");
  });

  it("should update input value when selecting date of birth", async () => {
    const dateOfBirthInput = element.shadowRoot.querySelector(
      'input[name="dateOfBirth"]'
    );
    dateOfBirthInput.value = "1990-01-01";
    dateOfBirthInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.dateOfBirth).to.equal("1990-01-01");
  });

  it("should update input value when typing phone number", async () => {
    const phoneNumberInput = element.shadowRoot.querySelector(
      'input[name="phoneNumber"]'
    );
    phoneNumberInput.value = "+1234567890";
    phoneNumberInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.phoneNumber).to.equal("+1234567890");
  });

  it("should update input value when typing email", async () => {
    const emailInput = element.shadowRoot.querySelector('input[name="email"]');
    emailInput.value = "test@example.com";
    emailInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.email).to.equal("test@example.com");
  });

  it("should update input value when selecting department", async () => {
    const departmentSelect = element.shadowRoot.querySelector(
      'select[name="department"]'
    );
    departmentSelect.value = "analytics";
    departmentSelect.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.department).to.equal("analytics");
  });

  it("should update input value when selecting position", async () => {
    const positionSelect = element.shadowRoot.querySelector(
      'select[name="position"]'
    );
    positionSelect.value = "junior";
    positionSelect.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.employee.position).to.equal("junior");
  });

  it("should validate form when all fields are filled and submit button is clicked", async () => {
    const firstNameInput = element.shadowRoot.querySelector(
      'input[name="firstName"]'
    );
    firstNameInput.value = "John";
    firstNameInput.dispatchEvent(new Event("input"));

    const lastNameInput = element.shadowRoot.querySelector(
      'input[name="lastName"]'
    );
    lastNameInput.value = "Doe";
    lastNameInput.dispatchEvent(new Event("input"));

    const dateOfBirthInput = element.shadowRoot.querySelector(
      'input[name="dateOfBirth"]'
    );
    dateOfBirthInput.value = "1990-01-01";
    dateOfBirthInput.dispatchEvent(new Event("input"));

    const dateOfEmploymentInput = element.shadowRoot.querySelector(
      'input[name="dateOfEmployment"]'
    );
    dateOfEmploymentInput.value = "2024-03-20";
    dateOfEmploymentInput.dispatchEvent(new Event("input"));

    const phoneNumberInput = element.shadowRoot.querySelector(
      'input[name="phoneNumber"]'
    );
    phoneNumberInput.value = "+1234567890";
    phoneNumberInput.dispatchEvent(new Event("input"));

    const emailInput = element.shadowRoot.querySelector('input[name="email"]');
    emailInput.value = "john.doe@example.com";
    emailInput.dispatchEvent(new Event("input"));

    const departmentSelect = element.shadowRoot.querySelector(
      'select[name="department"]'
    );
    departmentSelect.value = "analytics";
    departmentSelect.dispatchEvent(new Event("input"));

    const positionSelect = element.shadowRoot.querySelector(
      'select[name="position"]'
    );
    positionSelect.value = "junior";
    positionSelect.dispatchEvent(new Event("input"));

    await element.updateComplete;

    const submitButton = element.shadowRoot.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    await element.updateComplete;

    expect(element.employee).to.deep.equal({
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      dateOfEmployment: "2024-03-20",
      phoneNumber: "+1234567890",
      email: "john.doe@example.com",
      department: "analytics",
      position: "junior",
    });
  });

  it("should show validation errors when form is submitted with invalid data", async () => {
    const submitButton = element.shadowRoot.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    await element.updateComplete;

    expect(element.errors).to.deep.equal({
      dateOfBirth: "This field is required",
      dateOfEmployment: "This field is required",
      department: "This field is required",
      email: "This field is required",
      firstName: "This field is required",
      lastName: "This field is required",
      phoneNumber: "This field is required",
      position: "This field is required",
    });

    expect(element.employee).to.deep.equal({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      dateOfEmployment: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: "",
    });
  });

  it("should validate phone number format correctly", async () => {
    const phoneNumberInput = element.shadowRoot.querySelector(
      'input[name="phoneNumber"]'
    );

    phoneNumberInput.value = "";
    phoneNumberInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    const submitButton = element.shadowRoot.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    await element.updateComplete;

    expect(element.errors.phoneNumber).to.equal("This field is required");

    phoneNumberInput.value = "123";
    phoneNumberInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    submitButton.click();
    await element.updateComplete;

    expect(element.errors.phoneNumber).to.equal("Invalid phone number format");

    phoneNumberInput.value = "+1234567890";
    phoneNumberInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    submitButton.click();
    await element.updateComplete;

    expect(element.errors.phoneNumber).to.be.undefined;
  });

  it("should validate email format correctly", async () => {
    const emailInput = element.shadowRoot.querySelector('input[name="email"]');
    
    emailInput.value = "";
    emailInput.dispatchEvent(new Event("input"));
    await element.updateComplete;
    
    const submitButton = element.shadowRoot.querySelector(
      'button[type="submit"]'
    );
    submitButton.click();
    await element.updateComplete;
    
    expect(element.errors.email).to.equal("This field is required");

    emailInput.value = "not-an-email";
    emailInput.dispatchEvent(new Event("input"));
    await element.updateComplete;
    
    submitButton.click();
    await element.updateComplete;

    expect(element.errors.email).to.equal("This field is required");

    emailInput.value = "test@example.com";
    emailInput.dispatchEvent(new Event("input"));
    await element.updateComplete;
    
    submitButton.click();
    await element.updateComplete;
    
    expect(element.errors.email).to.be.undefined;
  });

  it("should add new employee when form is submitted", async () => {
    const routerGoStub = sinon.stub(Router, 'go');
    const dispatchStub = sinon.stub(store, 'dispatch');
    const clock = sinon.useFakeTimers(new Date('2024-03-20').getTime());

    element.isEdit = false;
    element.employee = {
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      dateOfEmployment: "2024-03-20",
      phoneNumber: "+1234567890",
      email: "john@example.com",
      department: "analytics",
      position: "junior"
    };

    const form = element.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect(dispatchStub.calledOnce).to.be.true;
    expect(dispatchStub.firstCall.args[0]).to.deep.equal({
      type: 'ADD_EMPLOYEE',
      payload: {
        ...element.employee,
        id: clock.now
      }
    });

    expect(routerGoStub.calledOnce).to.be.true;
    expect(routerGoStub.firstCall.args[0]).to.equal('/');

    routerGoStub.restore();
    dispatchStub.restore();
    clock.restore();
  });

  it("should navigate to home when cancel button is clicked", async () => {
    const routerGoStub = sinon.stub(Router, 'go');

    const cancelButton = element.shadowRoot.querySelector('button[type="button"]');
    cancelButton.click();
    await element.updateComplete;

    expect(routerGoStub.calledOnce).to.be.true;
    expect(routerGoStub.firstCall.args[0]).to.equal('/');

    routerGoStub.restore();
  });

  it("should not submit form when validation fails", async () => {
    const routerGoStub = sinon.stub(Router, 'go');
    const dispatchStub = sinon.stub(store, 'dispatch');

    element.employee = {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      dateOfEmployment: "",
      phoneNumber: "",
      email: "",
      department: "",
      position: ""
    };

    const form = element.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect(dispatchStub.called).to.be.false;
    expect(routerGoStub.called).to.be.false;

    routerGoStub.restore();
    dispatchStub.restore();
  });

  it("should update existing employee data when in edit mode", async () => {
    const originalConfirm = window.confirm;
    window.confirm = sinon.stub().returns(true);
    const routerGoStub = sinon.stub(Router, 'go');
    const dispatchStub = sinon.stub(store, 'dispatch');

    const initialEmployee = {
      id: 123,
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      dateOfEmployment: "2024-03-20",
      phoneNumber: "+1234567890",
      email: "john@example.com",
      department: "analytics",
      position: "junior"
    };

    element.isEdit = true;
    element.employee = { ...initialEmployee };

    const firstNameInput = element.shadowRoot.querySelector('input[name="firstName"]');
    firstNameInput.value = "Johnny";
    firstNameInput.dispatchEvent(new Event("input"));

    const lastNameInput = element.shadowRoot.querySelector('input[name="lastName"]');
    lastNameInput.value = "Smith";
    lastNameInput.dispatchEvent(new Event("input"));

    await element.updateComplete;

    const form = element.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await element.updateComplete;

    expect(window.confirm.calledOnce).to.be.true;

    expect(dispatchStub.calledOnce).to.be.true;
    expect(dispatchStub.firstCall.args[0]).to.deep.equal({
      type: 'UPDATE_EMPLOYEE',
      payload: {
        ...initialEmployee,
        firstName: "Johnny",
        lastName: "Smith"
      }
    });

    // Verify navigation occurred
    expect(routerGoStub.calledOnce).to.be.true;
    expect(routerGoStub.firstCall.args[0]).to.equal('/');

    window.confirm = originalConfirm;
    routerGoStub.restore();
    dispatchStub.restore();
  });
});

import "../../../test-setup.js";
import { fixture, expect } from "@open-wc/testing";
import { html } from "lit";
import "../../../src/components/EmployeeList/employee-list.js";
import sinon from "sinon";
import { Router } from "@vaadin/router";
import store from "../../../src/store/index.js";

// Mock data generator
const generateMockEmployees = (count = 50) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    firstName: `Employee${i + 1}`,
    lastName: `Lastname${i + 1}`,
    dateOfEmployment: `2023-${String((i % 12) + 1).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`,
    dateOfBirth: `1990-${String(((i + 5) % 12) + 1).padStart(2, "0")}-${String(
      ((i + 10) % 28) + 1
    ).padStart(2, "0")}`,
    phoneNumber: `5${String(30 + (i % 70)).padStart(2, "0")}${String(
      100 + ((i * 7) % 900)
    ).padStart(3, "0")}${String(10 + ((i * 3) % 90)).padStart(2, "0")}${String(
      10 + ((i * 5) % 90)
    ).padStart(2, "0")}`,
    email: `employee${i + 1}@example.com`,
    department: ["analytics", "tech"][i % 2],
    position: ["junior", "medior", "senior"][i % 3],
  }));
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

const mockEmployees = generateMockEmployees();

describe("EmployeeList", () => {
  let element;

  beforeEach(async () => {
    const mockState = {
      employees: {
        employees: mockEmployees,
      },
    };
    sinon.stub(store, "getState").returns(mockState);

    element = await fixture(html`<employee-list></employee-list>`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should exist", () => {
    expect(element).to.exist;
  });

  it("should render with default properties", async () => {
    expect(element.employees).to.be.an("array");
    expect(element.employees.length).to.equal(50);
    expect(element.viewMode).to.equal("table");
    expect(element.currentPage).to.equal(1);
    expect(element.itemsPerPage).to.equal(10);
    expect(element.searchQuery).to.equal("");
    expect(element.selectedEmployees).to.be.an("array");
  });

  it("should render list view by default", async () => {
    const tableIcon = element.shadowRoot.querySelector(".table-icon");
    tableIcon.click();
    await element.updateComplete;

    const listIcon = element.shadowRoot.querySelector(".list-icon");
    listIcon.click();
    await element.updateComplete;

    const listView = element.shadowRoot.querySelector(".list-view");
    expect(element.viewMode).to.be.equal("list");
    expect(listView).to.exist;
  });

  it("should switch to table view when table icon is clicked", async () => {
    const tableIcon = element.shadowRoot.querySelector(".table-icon");
    tableIcon.click();
    await element.updateComplete;

    const tableView = element.shadowRoot.querySelector("table");
    expect(element.viewMode).to.be.equal("table");
    expect(tableView).to.exist;
  });

  it("should filter employees based on search input", async () => {
    const searchInput = element.shadowRoot.querySelector(".search-input");

    searchInput.value = "Employee11";
    searchInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.filteredEmployees.length).to.equal(1);
    expect(element.searchQuery).to.be.equal("Employee11");

    searchInput.value = "NonExistent";
    searchInput.dispatchEvent(new Event("input"));
    await element.updateComplete;

    expect(element.filteredEmployees.length).to.equal(0);
    expect(element.searchQuery).to.be.equal("NonExistent");
  });

  it("should update employees when store state changes", async () => {
    const newEmployees = generateMockEmployees(30);
    const newState = {
      employees: {
        employees: newEmployees,
      },
    };

    // Update store state
    store.getState.returns(newState);
    element.unsubscribe();
    element.connectedCallback();
    await element.updateComplete;

    // Verify update
    expect(element.employees).to.deep.equal(newEmployees);
    expect(element.employees.length).to.equal(30);
  });

  it("should handle invalid phone number formats", () => {
    expect(element.formatPhoneNumber("abc")).to.equal("abc");
    expect(element.formatPhoneNumber("123")).to.equal("123");
    expect(element.formatPhoneNumber("1234567890123")).to.equal(
      "1234567890123"
    );
    expect(element.formatPhoneNumber("123-456-78-90")).to.equal(
      "(+90) 123 456 78 90"
    );
    expect(element.formatPhoneNumber("123 456 78 90")).to.equal(
      "(+90) 123 456 78 90"
    );
    expect(element.formatPhoneNumber("123abc456def")).to.equal("123abc456def");
  });

  it("should navigate to edit page when edit icon is clicked", async () => {
    const goSpy = sinon.spy(Router, "go");
    const testEmployee = mockEmployees[0];

    const tableIcon = element.shadowRoot.querySelector(".table-icon");
    tableIcon.click();
    await element.updateComplete;

    const editIcon = element.shadowRoot.querySelector(".action-icon.edit");
    editIcon.click();

    expect(goSpy.calledWith(`/edit/${testEmployee.id}`)).to.be.true;
    goSpy.restore();
  });

  it("should delete employee when delete icon is clicked and confirmed", async () => {
    const dispatchSpy = sinon.spy(store, "dispatch");
    const testEmployee = mockEmployees[0];

    const deleteIcon = element.shadowRoot.querySelector(".action-icon.delete");
    deleteIcon.click();
    await element.updateComplete;

    expect(element.showBulkDeleteModal).to.be.true;

    const modal = element.shadowRoot.querySelector('.modal-backdrop');

    expect(modal).to.be.exist;
    await element.updateComplete;

    const modalDeleteButton = element.shadowRoot.querySelector('.modal-button.delete');
    modalDeleteButton.click();
    await element.updateComplete;

    expect(
      dispatchSpy.calledWith({
        type: "DELETE_EMPLOYEE",
        payload: testEmployee.id,
      })
    ).to.be.true;

    dispatchSpy.restore();
  });

  it("should not delete employee when delete icon is clicked but not confirmed", async () => {
    const dispatchSpy = sinon.spy(store, "dispatch");

    const deleteIcon = element.shadowRoot.querySelector(".action-icon.delete");
    deleteIcon.click();

    expect(dispatchSpy.called).to.be.false;

    dispatchSpy.restore();
  });

  it("should handle employee selection through checkbox clicks", async () => {
    const checkboxes = element.shadowRoot.querySelectorAll(
      'input[type="checkbox"]'
    );

    checkboxes[0].click();
    await element.updateComplete;
    expect(element.selectedEmployees.length).to.equal(1);
    expect(element.selectedEmployees).to.include(mockEmployees[0].id);

    checkboxes[1].click();
    await element.updateComplete;
    expect(element.selectedEmployees.length).to.equal(2);
    expect(element.selectedEmployees).to.include(mockEmployees[1].id);

    checkboxes[0].click();
    await element.updateComplete;
    expect(element.selectedEmployees.length).to.equal(1);
    expect(element.selectedEmployees).to.not.include(mockEmployees[0].id);
    expect(element.selectedEmployees).to.include(mockEmployees[1].id);
  });

  it("should handle bulk delete through UI interaction", async () => {
    const dispatchSpy = sinon.spy(store, "dispatch");

    const checkboxes = element.shadowRoot.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes[0].click();
    await element.updateComplete;

    const bulkDeleteButton = element.shadowRoot.querySelector(
      ".bulk-actions button.delete"
    );
    bulkDeleteButton.click();
    await element.updateComplete;

    expect(element.showBulkDeleteModal).to.be.true;

    const modal = element.shadowRoot.querySelector('.modal-backdrop');

    expect(modal).to.be.exist;
    await element.updateComplete;

    const modalDeleteButton = element.shadowRoot.querySelector('.modal-button.delete');
    modalDeleteButton.click();
    await element.updateComplete;

    expect(dispatchSpy.callCount).to.equal(1);
    expect(dispatchSpy.firstCall.args[0]).to.deep.equal({
      type: "DELETE_EMPLOYEE",
      payload: mockEmployees[0].id,
    });
    expect(element.selectedEmployees).to.be.empty;
  });

  it("should handle select all functionality through UI", async () => {
    const selectAllCheckbox = element.shadowRoot.querySelector(
      '.bulk-actions .select-all'
    );
    selectAllCheckbox.click();
    await element.updateComplete;

    expect(element.selectedEmployees.length).to.equal(
      element.paginatedEmployees.length
    );
    element.paginatedEmployees.forEach((employee) => {
      expect(element.selectedEmployees).to.include(employee.id);
    });

    selectAllCheckbox.click();
    await element.updateComplete;

    expect(element.selectedEmployees.length).to.equal(0);
  });

  it("should handle pagination through UI elements", async () => {
    const nextButton = element.shadowRoot.querySelector(
      ".pagination-arrow:last-child"
    );
    nextButton.click();
    await element.updateComplete;
    expect(element.currentPage).to.equal(2);

    const prevButton = element.shadowRoot.querySelector(
      ".pagination-arrow:first-child"
    );
    prevButton.click();
    await element.updateComplete;
    expect(element.currentPage).to.equal(1);

    expect(prevButton.disabled).to.be.true;
    prevButton.click();
    await element.updateComplete;
    expect(element.currentPage).to.equal(1);

    const pageButtons = element.shadowRoot.querySelectorAll(
      ".pagination-numbers button"
    );
    pageButtons[2].click();
    await element.updateComplete;
    expect(element.currentPage).to.equal(3);

    const lastPage = element.totalPages;
    element.handlePageChange(lastPage);
    await element.updateComplete;
    expect(nextButton.disabled).to.be.true;
    nextButton.click();
    await element.updateComplete;
    expect(element.currentPage).to.equal(lastPage);
  });
});

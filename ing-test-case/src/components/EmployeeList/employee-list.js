import { LitElement, html } from "lit";
import { Router } from "@vaadin/router";
import store from "../../store/index.js";
import { getTranslation, getCurrentLanguage } from "../../utils/i18n.js";
import {
  trashIcon,
  editIcon,
  listIcon,
  tableIcon,
  prevIcon,
  nextIcon,
} from "../../icons/icon-folder.js";
import { styles } from "./styles.js";

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    searchQuery: { type: String },
    selectedEmployees: { type: Array },
    showBulkDeleteModal: { type: Boolean },
    deletedListItem: { type: Object },    
  };

  static styles = styles;

  constructor() {
    super();
    this.employees = [];
    this.viewMode = "table";
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.searchQuery = "";
    this.selectedEmployees = [];
    this.showBulkDeleteModal = false;
    this.deletedListItem = null
  }

  connectedCallback() {
    super.connectedCallback();
    const initialState = store.getState();
    this.employees = initialState.employees.employees;

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();

      this.employees = state.employees.employees;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleViewChange(mode) {
    this.viewMode = mode;
  }

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.currentPage = 1;
  }

  handlePageChange(page) {
    this.currentPage = page;
  }

  handleEdit(employee) {
    Router.go(`/edit/${employee.id}`);
  }

  handleSelectEmployee(e, employee) {
    if (e.target.checked) {
      this.selectedEmployees = [...this.selectedEmployees, employee.id];
    } else {
      this.selectedEmployees = this.selectedEmployees.filter(
        (id) => id !== employee.id
      );
    }
    this.requestUpdate();
  }

  closeBulkDeleteModal() {
    this.showBulkDeleteModal = false;
    this.requestUpdate();
  }

  confirmBulkDelete() {
    if (this.deletedListItem) {
      store.dispatch({ type: "DELETE_EMPLOYEE", payload: this.deletedListItem.id });

      return;
    }

    this.selectedEmployees.forEach((id) => {
      store.dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    });

    this.selectedEmployees = [];
    this.showBulkDeleteModal = false;
    this.requestUpdate();
  }

  handleDeleteAndSelect(e, emp) {
    if (
      getTranslation("employee.deleteSelected", getCurrentLanguage()) ===
      e.target.innerText?.split(" (").shift()
    ) {
      this.showBulkDeleteModal = true;
      this.requestUpdate();
    } else if (e.target instanceof SVGElement || e.target instanceof HTMLSpanElement) {
      this.showBulkDeleteModal = true;
      this.deletedListItem = emp;
      this.requestUpdate();
    } else if (
      getTranslation("employee.selecAll", getCurrentLanguage()) ===
      e.target.innerText
    ) {
      const allSelected = this.paginatedEmployees.every((emp) =>
        this.selectedEmployees.includes(emp.id)
      );

      if (allSelected) {
        this.selectedEmployees = this.selectedEmployees.filter(
          (id) => !this.paginatedEmployees.some((emp) => emp.id === id)
        );
      } else {
        const paginatedIds = this.paginatedEmployees.map((emp) => emp.id);
        this.selectedEmployees = Array.from(
          new Set([...this.selectedEmployees, ...paginatedIds])
        );
      }

      this.requestUpdate();
    }
  }

  get filteredEmployees() {
    return this.employees.filter(
      (emp) =>
        emp.firstName
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase()) ||
        emp.lastName
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase()) ||
        emp.email
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase()) ||
        emp.department
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase()) ||
        emp.position
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase())
    );
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEmployees.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `(+90) ${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }

    return phone;
  }

  handlePrevPage() {
    if (this.currentPage > 1) {
      this.handlePageChange(this.currentPage - 1);
    }
  }

  handleNextPage() {
    if (this.currentPage < this.totalPages) {
      this.handlePageChange(this.currentPage + 1);
    }
  }

  renderPagination() {
    const lang = getCurrentLanguage();
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    return html`
      <div class="pagination">
        <button
          class="pagination-arrow"
          @click=${this.handlePrevPage}
          ?disabled=${this.currentPage === 1}
          title=${getTranslation("pagination.previous", lang)}
        >
          ${prevIcon}
        </button>
        <div class="pagination-numbers">
          ${pages.map(
            (page) => html`
              <button
                @click=${() => this.handlePageChange(page)}
                class="${page === this.currentPage ? "active" : ""}"
              >
                ${page}
              </button>
            `
          )}
        </div>
        <button
          class="pagination-arrow"
          @click=${this.handleNextPage}
          ?disabled=${this.currentPage === this.totalPages}
          title=${getTranslation("pagination.next", lang)}
        >
          ${nextIcon}
        </button>
      </div>
    `;
  }

  render() {
    const lang = getCurrentLanguage();
    return html`
      <div class="controls">
        <div class="list-title">
          ${getTranslation("list.employeeList", lang)}
        </div>
        <input
          class="search-input"
          type="text"
          placeholder="${getTranslation("navigation.search", lang)}"
          @input=${this.handleSearch}
          value=${this.searchQuery}
        />
        <div class="view-toggle">
          <span @click=${() => this.handleViewChange("list")} class="list-icon">
            ${listIcon}
          </span>
          <span
            @click=${() => this.handleViewChange("table")}
            class="table-icon"
          >
            ${tableIcon}
          </span>
        </div>
      </div>

      <div class="bulk-actions">
        <button
          class="select-all"
          @click=${(e) => this.handleDeleteAndSelect(e)}
        >
          ${getTranslation("employee.selecAll", lang)}
        </button>
        ${this.selectedEmployees.length > 0
          ? html`
              <button
                class="delete"
                @click=${(e) => this.handleDeleteAndSelect(e)}
              >
                ${getTranslation("employee.deleteSelected", lang)}
                (${this.selectedEmployees.length})
              </button>
            `
          : ""}
      </div>

      ${this.showBulkDeleteModal
        ? html`
            <div class="modal-backdrop" @click=${this.closeBulkDeleteModal}>
              <div class="modal">
                <div class="modal-content">
                  <p class="modal-title">Are you sure ?</p>
                  <p class="modal-label">
                    Selected Employee records will be deleted.
                  </p>
                  <div class="modal-actions">
                    <button
                      @click=${this.confirmBulkDelete}
                      class="modal-button delete"
                    >
                      Proceed
                    </button>
                    <button
                      @click=${this.closeBulkDeleteModal}
                      class="modal-button cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `
        : ""}
      ${this.viewMode === "table"
        ? this.renderTableView()
        : this.renderListView()}
      ${this.renderPagination()}
    `;
  }

  renderTableView() {
    const lang = getCurrentLanguage();
    return html`
      <table>
        <thead>
          <tr>
            <th>
              <div class="checkbox-container"></div>
            </th>
            <th class="table-title">
              ${getTranslation("employee.firstName", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.lastName", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.dateOfEmployment", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.dateOfBirth", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.phoneNumber", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.emailAddress", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.department", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.position", lang)}
            </th>
            <th class="table-title">
              ${getTranslation("employee.actions", lang)}
            </th>
          </tr>
        </thead>
        <tbody>
          ${this.paginatedEmployees.map(
            (emp) => html`
              <tr
                class="${this.selectedEmployees.includes(emp.id)
                  ? "selected"
                  : ""}"
              >
                <td>
                  <div class="checkbox-container">
                    <input
                      class="table-checkbox"
                      type="checkbox"
                      @change=${(e) => this.handleSelectEmployee(e, emp)}
                      ?checked=${this.selectedEmployees.includes(emp.id)}
                    />
                  </div>
                </td>
                <td>${emp.firstName}</td>
                <td>${emp.lastName}</td>
                <td>${emp.dateOfEmployment}</td>
                <td>${emp.dateOfBirth}</td>
                <td>${this.formatPhoneNumber(emp.phoneNumber)}</td>
                <td>${emp.email}</td>
                <td>
                  ${getTranslation(`departments.${emp.department}`, lang)}
                </td>
                <td>${getTranslation(`positions.${emp.position}`, lang)}</td>
                <td>
                  <div class="table-actions">
                    <span
                      class="action-icon edit"
                      @click=${() => this.handleEdit(emp)}
                      >${editIcon}</span>
                    <span
                      class="action-icon delete"
                      @click=${(e) => this.handleDeleteAndSelect(e, emp)}
                      >${trashIcon}</span>
                  </div>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }

  renderListView() {
    const lang = getCurrentLanguage();
    return html`
      <div class="list-view">
        ${this.paginatedEmployees.map(
          (emp) => html`
            <div
              class="list-item ${this.selectedEmployees.includes(emp.id)
                ? "selected"
                : ""}"
            >
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  class="list-checkbox"
                  @change=${(e) => this.handleSelectEmployee(e, emp)}
                  ?checked=${this.selectedEmployees.includes(emp.id)}
                />
                <div class="item">
                  <div class="item-title">
                    <strong>${emp.firstName} ${emp.lastName}</strong>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.dateOfEmployment", lang)}:
                    </div>
                    <div class="item-data-value">${emp.dateOfEmployment}</div>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.dateOfBirth", lang)}:
                    </div>
                    <div class="item-data-value">${emp.dateOfBirth}</div>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.phoneNumber", lang)}:
                    </div>
                    <div class="item-data-value">
                      ${this.formatPhoneNumber(emp.phoneNumber)}
                    </div>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.emailAddress", lang)}:
                    </div>
                    <div class="item-data-value">${emp.email}</div>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.department", lang)}:
                    </div>
                    <div class="item-data-value">
                      ${getTranslation(`departments.${emp.department}`, lang)}
                    </div>
                  </div>
                  <div class="item-data">
                    <div class="item-data-title">
                      ${getTranslation("employee.position", lang)}:
                    </div>
                    <div class="item-data-value">
                      ${getTranslation(`positions.${emp.position}`, lang)}
                    </div>
                  </div>
                </div>
              </div>
              <div class="actions">
                <span
                  class="action-icon edit"
                  @click=${() => this.handleEdit(emp)}
                  >${editIcon}</span>
                <span
                  class="action-icon delete"
                  @click=${(e) => this.handleDeleteAndSelect(e, emp)}
                  >${trashIcon}</span>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

customElements.define("employee-list", EmployeeList);

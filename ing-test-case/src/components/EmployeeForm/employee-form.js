import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import store from '../../store/index.js';
import { getTranslation, getCurrentLanguage } from '../../utils/i18n.js';
import { styles } from "./styles.js";

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    errors: { type: Object },
    isEdit: { type: Boolean },
    employeeId: { type: String }
  };

  static styles = styles;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: ''
    };
    this.errors = {};
    this.isEdit = false;
    this.employeeId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.employeeId) {
      this.isEdit = true;
      this.loadEmployeeData();
    }
  }

  loadEmployeeData() {
    const state = store.getState();
    const employee = state.employees.employees.find(emp => emp.id === parseInt(this.employeeId));
  
    if (employee) {
      this.employee = { ...employee };
    } else {
      Router.go('/');
    }
  }

  validateForm() {
    const lang = getCurrentLanguage();
    const errors = {};
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    if (!this.employee.firstName) {
      errors.firstName = getTranslation('validation.required', lang);
    }

    if (!this.employee.lastName) {
      errors.lastName = getTranslation('validation.required', lang);
    }

    if (!this.employee.dateOfEmployment) {
      errors.dateOfEmployment = getTranslation('validation.required', lang);
    }

    if (!this.employee.dateOfBirth) {
      errors.dateOfBirth = getTranslation('validation.required', lang);
    }

    if (!this.employee.phoneNumber) {
      errors.phoneNumber = getTranslation('validation.required', lang);
    } else if (!phoneRegex.test(this.employee.phoneNumber)) {
      errors.phoneNumber = getTranslation('validation.phone', lang);
    }

    if (!this.employee.email) {
      errors.email = getTranslation('validation.required', lang);
    }

    if (!this.employee.department) {
      errors.department = getTranslation('validation.required', lang);
    }

    if (!this.employee.position) {
      errors.position = getTranslation('validation.required', lang);
    }


    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  handleInput(e) {
    const { name, value } = e.target;
    this.employee = { ...this.employee, [name]: value };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      if (this.isEdit) {
        if (confirm(getTranslation('confirm.update', getCurrentLanguage()))) {
          store.dispatch({ type: 'UPDATE_EMPLOYEE', payload: this.employee });
          Router.go('/');
        }
      } else {
        const newEmployee = { ...this.employee, id: Date.now() };
        store.dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
        Router.go('/');
      }
    }
  }

  handleCancel() {
    Router.go('/');
  }

  render() {
    const lang = getCurrentLanguage();
    return html`
      <form @submit=${this.handleSubmit}>
        <div class="form-group">
          <label>${getTranslation('employee.firstName', lang)}</label>
          <input type="text" 
                 name="firstName" 
                 .value=${this.employee.firstName}
                 @input=${this.handleInput}>
          ${this.errors.firstName ? html`
            <span class="error">${this.errors.firstName}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.lastName', lang)}</label>
          <input type="text" 
                 name="lastName" 
                 .value=${this.employee.lastName}
                 @input=${this.handleInput}>
          ${this.errors.lastName ? html`
            <span class="error">${this.errors.lastName}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.dateOfEmployment', lang)}</label>
          <input type="date" 
                 name="dateOfEmployment" 
                 .value=${this.employee.dateOfEmployment}
                 @input=${this.handleInput}>
          ${this.errors.dateOfEmployment ? html`
            <span class="error">${this.errors.dateOfEmployment}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.dateOfBirth', lang)}</label>
          <input type="date" 
                 name="dateOfBirth" 
                 .value=${this.employee.dateOfBirth}
                 @input=${this.handleInput}>
          ${this.errors.dateOfBirth ? html`
            <span class="error">${this.errors.dateOfBirth}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.phoneNumber', lang)}</label>
          <input type="tel" 
                 name="phoneNumber" 
                 .value=${this.employee.phoneNumber}
                 @input=${this.handleInput}>
          ${this.errors.phoneNumber ? html`
            <span class="error">${this.errors.phoneNumber}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.emailAddress', lang)}</label>
          <input type="email" 
                 name="email" 
                 .value=${this.employee.email}
                 @input=${this.handleInput}>
          ${this.errors.email ? html`
            <span class="error">${this.errors.email}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.department', lang)}</label>
          <select name="department" 
                  .value=${this.employee.department}
                  @input=${this.handleInput}>
            <option value="">${getTranslation('validation.required', lang)}</option>
            <option value="analytics">${getTranslation('departments.analytics', lang)}</option>
            <option value="tech">${getTranslation('departments.tech', lang)}</option>
          </select>
          ${this.errors.department ? html`
            <span class="error">${this.errors.department}</span>
          ` : ''}
        </div>

        <div class="form-group">
          <label>${getTranslation('employee.position', lang)}</label>
          <select name="position" 
                  .value=${this.employee.position}
                  @input=${this.handleInput}>
            <option value="">${getTranslation('validation.required', lang)}</option>
            <option value="junior">${getTranslation('positions.junior', lang)}</option>
            <option value="medior">${getTranslation('positions.medior', lang)}</option>
            <option value="senior">${getTranslation('positions.senior', lang)}</option>
          </select>
          ${this.errors.position ? html`
            <span class="error">${this.errors.position}</span>
          ` : ''}
        </div>

        <div class="buttons">
          <button type="submit">
            ${this.isEdit ? getTranslation('employee.save', lang) : getTranslation('navigation.addEmployee', lang)}
          </button>
          <button type="button" @click=${this.handleCancel}>
            ${getTranslation('employee.cancel', lang)}
          </button>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm); 
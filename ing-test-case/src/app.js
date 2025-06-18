import "./utils/polyfills.js";
import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import "./components/NavigationMenu/navigation-menu.js";
import "./components/EmployeeList/employee-list.js";
import "./components/EmployeeForm/employee-form.js";
import store from "./store/index.js";

export class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => this.requestUpdate());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector("#outlet"));
    router.setRoutes([
      { path: "/", component: "employee-list" },
      { path: "/add", component: "employee-form" },
      {
        path: "/edit/:id",
        component: "employee-form",
        action: (context) => {
          const form = document.createElement("employee-form");
          form.employeeId = context.params.id;
          return form;
        },
      },
    ]);
  }

  render() {
    return html`
      <navigation-menu></navigation-menu>
      <div id="outlet"></div>
    `;
  }
}

customElements.define("app-root", App);

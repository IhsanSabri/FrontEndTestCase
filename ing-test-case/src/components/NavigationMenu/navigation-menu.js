import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import store from "../../store/index.js";
import { getTranslation, getCurrentLanguage } from "../../utils/i18n.js";
import { trFlag, enFlag, humanIcon, plusIcon } from "../../icons/icon-folder.js";
import { styles } from "./styles.js";

export class NavigationMenu extends LitElement {
  static properties = {
    showLangDropdown: { type: Boolean },
  };

  static styles = styles;

  constructor() {
    super();
    this.showLangDropdown = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = store.subscribe(() => {
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) this.unsubscribe();
  }

  handleAdd() {
    (window.Router || Router).go("/add");
  }

  handleLanguageChange(lang) {
    this.toggleLangDropdown();

    store.dispatch({ type: "SET_LANGUAGE", payload: lang });
  }

  toggleLangDropdown() {
    this.showLangDropdown = !this.showLangDropdown;
  }

  render() {
    const lang = getCurrentLanguage();
    return html`
      <nav class="nav">
        <div class="logo" @click=${() => (window.Router || Router).go("/")}>ING</div>
        <div class="nav-actions">
          <div class="employees-label" @click=${() => (window.Router || Router).go("/")}>
            ${humanIcon} ${getTranslation("navigation.employees", lang)}
          </div>
          <button class="add-btn" @click=${this.handleAdd}>
            ${plusIcon} ${getTranslation("navigation.addEmployee", lang)}
          </button>
          <span
            class="lang-flag"
            @click=${this.toggleLangDropdown}
            title="Change language"
          >
            ${lang === "tr" ? trFlag : enFlag}
          </span>
          ${this.showLangDropdown
            ? html`
                <div class="lang-dropdown">
                  <div
                    class="lang-option"
                    @click=${() => this.handleLanguageChange("tr")}
                  >
                    ${trFlag} Türkçe
                  </div>
                  <div
                    class="lang-option"
                    @click=${() => this.handleLanguageChange("en")}
                  >
                    ${enFlag} English
                  </div>
                </div>
              `
            : ""}
        </div>
      </nav>
    `;
  }
}

customElements.define("navigation-menu", NavigationMenu);

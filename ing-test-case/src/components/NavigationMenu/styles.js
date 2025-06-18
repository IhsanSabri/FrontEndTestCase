import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    padding: 0 2rem;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  .logo {
    font-weight: bold;
    color: #ff6200;
    font-size: 1.5rem;
    letter-spacing: 1px;
    cursor: pointer;
  }
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .employees-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    color: #ff6200;
    cursor: pointer;
  }
  .lang-flag {
    margin-left: 0.5rem;
    cursor: pointer;
    user-select: none;
    align-items: center;
    display: flex;
  }
  .lang-flag:hover {
    filter: brightness(1.2);
  }
  .add-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff;
    color: #ff620085;
    border: none;
    cursor: pointer;
  }
  .add-btn svg {
    stroke: #ff620085;
  }
  .lang-dropdown {
    position: absolute;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    margin-top: 0.5rem;
    z-index: 10;
    right: 0;
  }
  .lang-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    white-space: nowrap;
  }
  .lang-option:hover {
    background: #f5f5f5;
  }

  @media (max-width: 768px) {
    :host {
      padding: 0 1rem;
    }
    .nav {
      align-items: center;
    }
    .nav-actions {
      background: white;
      z-index: 100;
    }
  }
`;

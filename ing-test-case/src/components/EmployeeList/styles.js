import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    padding: 2rem;
    margin: 0 auto;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
  }

  .table-title {
    color: #ff6200;
    background-color: white;
  }

  .search-input {
    width: 50%;
    border-radius: 8px;
  }

  .view-toggle {
    display: flex;
    gap: 1rem;
  }

  .bulk-actions {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    display: flex
  }

  .bulk-actions button {
    width: 100%;
    justify-content: center;
    height: 40px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button.delete {
    background-color: #e74c3c;
  }

  button.delete:hover {
    background-color: #c0392b;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
    max-width: 90vw;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    width: 100%;
    flex-direction: column;
  }

  .modal-button {
    border-radius: 8px;
  }

  .modal-button.cancel {
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
  }

  .modal-title {
    margin: 0;
    color: #ff6200;
    font-weight: bold;
    font-size: 24px;
  }

  .modal-label {
    font-size: 18px;
  }

  .list-icon,
  .table-icon {
    cursor: pointer;
  }

  .icon-button {
    padding: 0.5rem;
    background: none;
    color: #666;
    border-radius: 50%;
  }

  .material-icons {
    font-size: 20px;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }

  tr {
    background-color: white;
  }

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .list-title {
    color: #ff6200;
    font-size: 2rem;
    font-weight: 500;
  }

  .list-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .list-item {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  }

  .list-item.selected {
    border-color: #ff6200;
  }

  .list-item .item {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .item-title {
    margin-bottom: 5px;
  }

  .item-data {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .item-data-value {
    font-size: 12px;
  }

  .item-data-title {
    font-weight: bold;
    font-size: 12px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .pagination button {
    background-color: transparent;
    border-radius: 50%;
    color: black;
    min-width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pagination button.active {
    background-color: #ff6200;
    border-radius: 50%;
    color: white;
  }

  .pagination-arrow {
    display: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    background: none;
    border: none;
    color: #ff6200;
  }

  .pagination-arrow:hover {
    background-color: #f0f0f0;
  }

  .pagination-arrow:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .pagination-arrow svg {
    width: 24px;
    height: 24px;
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: -webkit-fill-available;
    background-color: white;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    width: 10%;
    justify-content: flex-end;
  }

  table-actions {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }

  .action-icon svg {
    vertical-align: middle;
    cursor: pointer;
    transition: stroke 0.2s;
    stroke: #ff6200;
  }

  .action-icon.edit:hover svg {
    stroke: #ff944d;
  }

  .action-icon.delete:hover svg {
    stroke: #e74c3c;
  }

  .pagination-numbers {
    display: flex;
    gap: 0.25rem;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 0 0.5rem;
  }

  @media (max-width: 768px) {
    :host {
      padding: 1rem;
    }

    .controls {
      flex-direction: column;
      gap: 1rem;
    }

    .search-input {
      width: 100%;
    }

    .view-toggle {
      justify-content: center;
    }

    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }

    .list-item {
      flex-direction: row;
      gap: 1rem;
    }

    .pagination {
      flex-wrap: nowrap;
      gap: 0.25rem;
    }

    .pagination button {
      min-width: 2rem;
      height: 2rem;
      font-size: 0.875rem;
    }

    .pagination-arrow {
      display: flex;
    }

    .pagination-numbers::-webkit-scrollbar {
      display: none;
    }

    .list-checkbox {
      width: 15%;
    }

    .table-checkbox {
      width: 50%;
    }

    .actions {
      width: unset;
    }
  }
`;

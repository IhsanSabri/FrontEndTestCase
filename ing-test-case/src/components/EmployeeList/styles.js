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
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-direction: column;
  }

  .bulk-actions button {
    width: 100%;
    justify-content: center;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
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
    background-color: #f0f7ff;
    border-color: #3498db;
  }

  .list-item .item {
    width: 100%;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
    align-items: center;
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
    width: 100%;
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

    input {
      width: 50%;
    }

    .actions {
      width: unset;
    }
  }
`;

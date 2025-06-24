import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: bold;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .error {
    color: #e74c3c;
    font-size: 0.875rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-direction: column;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }

  button[type="button"] {
    background-color: #95a5a6;
  }

  button[type="button"]:hover {
    background-color: #7f8c8d;
  }

  @media (max-width: 768px) {
    :host {
      padding: 1rem;
    }

    form {
      gap: 1.5rem;
    }

    .form-group {
      gap: 0.75rem;
    }

    input,
    select {
      padding: 0.75rem;
      font-size: 16px; /* Prevents zoom on iOS */
    }

    .buttons {
      flex-direction: column;
      gap: 0.75rem;
    }

    button {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
    }
  }
`;

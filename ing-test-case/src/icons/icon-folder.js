import { html } from "lit";

const trashIcon = html`
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path
      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
    />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
`;

const editIcon = html`
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
  </svg>
`;

const listIcon = html`
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="4" cy="18" r="2" />
  </svg>
`;

const tableIcon = html`
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </svg>
`;

const prevIcon = html`
  <svg viewBox="0 0 24 24" fill="none" stroke="#FF6200" stroke-width="2">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
`;

const nextIcon = html`
  <svg viewBox="0 0 24 24" fill="none" stroke="#FF6200" stroke-width="2">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
`;

const trFlag = html`
  <img
    src="https://flagcdn.com/tr.svg"
    alt="TR"
    width="24"
    height="16"
    style="vertical-align:middle;"
  />
`;
const enFlag = html`
  <img
    src="https://flagcdn.com/gb.svg"
    alt="EN"
    width="24"
    height="16"
    style="vertical-align:middle;"
  />
`;

const humanIcon = html`
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
`;

const plusIcon = html`
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF6200"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
`;

export {
    nextIcon,
    prevIcon,
    tableIcon,
    listIcon,
    editIcon,
    trashIcon,
    trFlag,
    enFlag,
    humanIcon,
    plusIcon
}
# Employee Management Application

A modern, responsive web application for managing employee information, built with LitElement and Redux.

## Features

- **Employee Management**
  - Add new employees
  - Edit existing employee information
  - Delete employees
  - View employee details

- **User Interface**
  - Responsive design that works on desktop and mobile devices
  - List and table view options for employee data
  - Search functionality
  - Pagination support

- **Internationalization**
  - Support for multiple languages (English and Turkish)
  - Easy language switching through UI
  - Localized form labels and messages

- **Form Validation**
  - Comprehensive input validation
  - Real-time error feedback
  - Required field validation
  - Date format validation
  - Email format validation
  - Phone number format validation

## Tech Stack

- **Frontend Framework**: LitElement
- **State Management**: Redux
- **Routing**: Vaadin Router
- **Testing**: Web Test Runner, Chai, Sinon
- **Development Server**: Web Dev Server

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd employee-management-app
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm start
```

This will start the application on `http://localhost:8000` with hot-reloading enabled.

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```
src/
├── components/
│   ├── EmployeeForm/      # Employee creation and editing
│   ├── EmployeeList/      # Employee listing and management
│   └── NavigationMenu/    # Application navigation
├── store/                 # Redux store configuration
├── utils/                 # Utility functions
├── icons/                 # SVG icons
└── app.js                 # Main application entry
```

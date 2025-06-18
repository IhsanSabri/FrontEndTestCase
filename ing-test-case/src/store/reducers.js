import { combineReducers } from "redux";

const initialState = {
  employees: {
    employees: [
      ...Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        firstName: `Employee${i + 1}`,
        lastName: `Lastname${i + 1}`,
        dateOfEmployment: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
        dateOfBirth: `1990-${String(((i + 5) % 12) + 1).padStart(2, '0')}-${String(((i + 10) % 28) + 1).padStart(2, '0')}`,
        phoneNumber: `5${String(30 + (i % 70)).padStart(2, '0')}${String(100 + (i * 7) % 900).padStart(3, '0')}${String(10 + (i * 3) % 90).padStart(2, '0')}${String(10 + (i * 5) % 90).padStart(2, '0')}`,
        email: `employee${i + 1}@example.com`,
        department: i % 2 === 0 ? 'tech' : 'analytics',
        position: ['junior', 'medior', 'senior'][i % 3],
      })),
    ],
  },
  language: localStorage.getItem("lang") || "en",
};

const employeesReducer = (state = initialState.employees, action) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    case "SET_LANGUAGE":
      localStorage.setItem("lang", action.payload);
      document.documentElement.lang = action.payload;

      return { ...state, language: action.payload };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  employees: employeesReducer,
});

export default rootReducer;

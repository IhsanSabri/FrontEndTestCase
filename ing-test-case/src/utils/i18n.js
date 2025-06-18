import store from "../store/index.js";

const translations = {
  en: {
    navigation: {
      home: 'Home',
      addEmployee: 'Add New',
      employees: 'Employee',
      search: 'Search...',
    },
    list: {
      employeeList: 'Employee List'
    },
    employee: {
      firstName: 'First Name',
      lastName: 'Last Name',
      dateOfEmployment: 'Date of Employment',
      dateOfBirth: 'Date of Birth',
      phoneNumber: 'Phone Number',
      emailAddress: 'Email Address',
      department: 'Department',
      position: 'Position',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      deleteSelected: 'Delete Selected',
    },
    departments: {
      analytics: 'Analytics',
      tech: 'Tech'
    },
    positions: {
      junior: 'Junior',
      medior: 'Medior',
      senior: 'Senior'
    },
    validation: {
      required: 'This field is required',
      email: 'Invalid email format',
      phone: 'Invalid phone number format',
      date: 'Invalid date format'
    },
    confirm: {
      delete: 'Are you sure you want to delete this employee?',
      update: 'Are you sure you want to update this employee?'
    },
    pagination: {
      previous: 'Previous page',
      next: 'Next page'
    }
  },
  tr: {
    navigation: {
      home: 'Ana Sayfa',
      addEmployee: 'Yeni Ekle',
      employees: 'Çalışan',
      search: 'Ara...',
    },
    list: {
      employeeList: 'Çalışan Listesi'
    },
    employee: {
      firstName: 'Ad',
      lastName: 'Soyad',
      dateOfEmployment: 'İşe Başlama Tarihi',
      dateOfBirth: 'Doğum Tarihi',
      phoneNumber: 'Telefon Numarası',
      emailAddress: 'E-posta Adresi',
      department: 'Departman',
      position: 'Pozisyon',
      actions: 'İşlemler',
      edit: 'Düzenle',
      delete: 'Sil',
      save: 'Kaydet',
      cancel: 'İptal',
      deleteSelected: 'Seçilenleri Sil'
    },
    departments: {
      analytics: 'Analitik',
      tech: 'Teknoloji'
    },
    positions: {
      junior: 'Junior',
      medior: 'Medior',
      senior: 'Senior'
    },
    validation: {
      required: 'Bu alan zorunludur',
      email: 'Geçersiz e-posta formatı',
      phone: 'Geçersiz telefon numarası formatı',
      date: 'Geçersiz tarih formatı'
    },
    confirm: {
      delete: 'Bu çalışanı silmek istediğinizden emin misiniz?',
      update: 'Bu çalışanı güncellemek istediğinizden emin misiniz?'
    },
    pagination: {
      previous: 'Önceki sayfa',
      next: 'Sonraki sayfa'
    }
  }
};

export const getTranslation = (key, lang = 'en') => {
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value[k];
    if (!value) return key;
  }
  
  return value;
};

export const getCurrentLanguage = () => {
  return store.getState().employees.language || 'en';
};

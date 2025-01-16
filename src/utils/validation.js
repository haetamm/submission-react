export const validateTitle = (value) => {
  if (value.trim() === "") {
    return "Judul tidak boleh kosong";
  } else if (value.length > 50) {
    return "Judul maksimal 50 karakter";
  }
  return "";
};

export const validateBody = (value) => {
  if (value.trim() === "") {
    return "Deskripsi tidak boleh kosong";
  }
  return "";
};

export const validateName = (value) => {
  if (value.trim() === "") {
    return "Nama tidak boleh kosong";
  }
  return "";
};

export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value.trim() === "") {
    return "Email tidak boleh kosong";
  } else if (!emailRegex.test(value)) {
    return "Email tidak valid";
  }
  return "";
};

export const validatePassword = (value) => {
  if (value.trim() === "") {
    return "Password tidak boleh kosong";
  } else if (value.length < 6) {
    return "Password harus mengandung minimal 6 karakter";
  }
  return "";
};

export const validatePasswordConfirmation = (
  password,
  passwordConfirmation
) => {
  if (password !== passwordConfirmation) {
    return "Password dan konfirmasi password harus sama";
  }
  return "";
};

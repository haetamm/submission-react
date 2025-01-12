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

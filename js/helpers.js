export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  basketList: document.querySelector(".shopping ul"),
  clearBtn: document.querySelector("#clear"),
  likeList: document.querySelector(".list"),
};

// local storage ı gunceller
export const setLocalStorage = (key, data) => {
  // verileri stringe cevırme
  const strData = JSON.stringify(data);

  // localstorage a kaydetme
  localStorage.setItem(key, strData);
};

// local storage dan eleman alma
export const getFromLocal = (key) => {
  // string veriyi localden alma
  const strData = localStorage.getItem(key);

  // veriyi json a cevirip fonksıyonun  cagrıldıgı yere gonderme
  return JSON.parse(strData);
};

// sepetin doluluk oranına göre temizle butonunu goster
export const controlBtn = (basket) => {
  if (basket.length > 0) {
    elements.clearBtn.style.display = "flex";
  } else {
    elements.clearBtn.style.display = "none";
  }
};

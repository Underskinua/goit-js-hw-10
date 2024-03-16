// import axios from "axios";
// import { fetchBreeds } from "./cat-api.js";

// const API_KEY = "live_7hWYQiyzXepcBfYts6iFS4paXCTpeplBe52rSiD9unGzwsdmE4oDRxhdiwZOENgY";

// // Получение элементов HTML-структуры
// const breedSelect = document.querySelector(".breed-select");
// const loader = document.querySelector(".loader");
// const error = document.querySelector(".error");
// const catInfo = document.querySelector(".cat-info");

// // Создание элементов для вывода информации о коте
// const catImage = document.createElement("img");
// const catDescription = document.createElement("p");
// const catTemperament = document.createElement("p");
// catInfo.appendChild(catImage);
// catInfo.appendChild(document.createElement("h2")); // Заголовок для названия породы
// catInfo.appendChild(catDescription);
// catInfo.appendChild(catTemperament);

// // Функция для получения списка пород
// async function fetchBreeds() {
//   try {
//     loader.classList.add("show");
//     const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });
//     loader.classList.remove("show");

//     const breeds = response.data;
//     breeds.forEach((breed) => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });
//   } catch (error) {
//     loader.classList.remove("show");
//     error.classList.add("show");
//   }
// }

// // Функция для получения информации о коте
// async function fetchCatByBreed(breedId) {
//   try {
//     loader.classList.add("show");
//     const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });
//     loader.classList.remove("show");

//     const cat = response.data[0];
//     catImage.src = cat.url;
//     catDescription.textContent = cat.description;
//     catTemperament.textContent = cat.temperament;
//     catInfo.querySelector("h2").textContent = cat.breeds[0].name; // Добавление названия породы в заголовок
//     catInfo.classList.add("show");
//   } catch (error) {
//     loader.classList.remove("show");
//     error.classList.add("show");
//   }
// }

// // Отримання списка пород
// fetchBreeds();

// // Обработка события изменения значения селекта
// breedSelect.addEventListener("change", (event) => {
//   const breedId = event.target.value;
//   catInfo.classList.remove("show");
//   fetchCatByBreed(breedId);
// });
import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

// Ваш ключ API
const API_KEY = "live_7hWYQiyzXepcBfYts6iFS4paXCTpeplBe52rSiD9unGzwsdmE4oDRxhdiwZOE";

// Додавання ключа API до заголовків
axios.defaults.headers.common["x-api-key"] = API_KEY;

// Функція для заповнення select-а
async function populateBreedSelect(selectElement) {
    try {
      const breeds = await fetchBreeds();
  
      breeds.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        selectElement.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      showError();
    } finally {

        //Спрятать загрузчик
      hideLoader();
    }
  }

// Функція для відображення інформації про кота
async function showCatInfo(breedId) {
    try {
      const catData = await fetchCatByBreed(breedId);
  
      const catInfoElement = document.querySelector(".cat-info");
      catInfoElement.innerHTML = "";
  
      const catImage = document.createElement("img");
      catImage.src = catData[0].url;
      catInfoElement.appendChild(catImage);
  
      const catName = document.createElement("h2");
      catName.textContent = catData[0].breeds[0].name;
      catInfoElement.appendChild(catName);
  
      const catDescription = document.createElement("p");
      catDescription.textContent = catData[0].breeds[0].description;
      catInfoElement.appendChild(catDescription);
  
      const catTemperament = document.createElement("p");
      catTemperament.textContent = catData[0].breeds[0].temperament;
      catInfoElement.appendChild(catTemperament);
    } catch (error) {
      console.error(error);
      showError();
    } finally {

        //Спрятать загрузчик
      hideLoader();
    }
  }

  // Показати завантажувач
function showLoader() {
    const loaderElement = document.querySelector(".loader");
    loaderElement.classList.add("visible");
  }
  
  // Приховати завантажувач
  function hideLoader() {
    const loaderElement = document.querySelector(".loader");
    loaderElement.classList.remove("visible");
  }

// Показати повідомлення про помилку
function showError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.add("visible");
  }
  
  // Приховати повідомлення про помилку
  function hideError() {
    const errorElement = document.querySelector(".error");
    errorElement.classList.remove("visible");
  }  

// Завантаження порід при завантаженні сторінки
window.addEventListener("load", async () => {
  const breedSelect = document.querySelector(".breed-select");

  // Показати завантажувач
  showLoader();

  try {
    await populateBreedSelect(breedSelect);
  } catch (error) {
    console.error(error);
    showError();
  } finally {
    hideLoader();
  }

  breedSelect.addEventListener("change", (event) => {
    const breedId = event.target.value;

    showLoader();

    try {
      showCatInfo(breedId);
    } catch (error) {
      console.error(error);
      showError();
    } finally {
      hideLoader();
    }
  });
});



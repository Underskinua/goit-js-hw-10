// Импортируем функции fetchBreeds и fetchCatByBreed из файла cat-api.js
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
// Импортируем компонент уведомлений Notify из библиотеки notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Импортируем библиотеку SlimSelect для создания выпадающего списка
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
// Деструктурируем объект ref для сокращения записи
const { selector, divCatInfo, loader, error } = ref;
// Изначально скрываем элементы загрузчика, сообщения об ошибке и информации о породе
loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');
// Создаем пустой массив для хранения идентификаторов пород
let arrBreedsId = [];
// Делаем запрос на получение списка пород кошек
fetchBreeds()
  .then(data => {
    // Перебираем полученные данные о породах
    data.forEach(element => {
      // Формируем объект с названием и идентификатором породы для выпадающего списка
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    // Инициализируем компонент SlimSelect для создания выпадающего списка
    new SlimSelect({
      select: selector,  // Указываем элемент для выпадающего списка
      data: arrBreedsId,   // Передаем массив объектов с данными о породах
    });
  })
  .catch(onFetchError); // Обрабатываем ошибку при получении списка пород

// Добавляем обработчик события выбора породы в выпадающем списке
selector.addEventListener('change', onSelectBreed);
// Функция обработки выбора породы
function onSelectBreed(event) {
  // Показываем загрузчик и скрываем остальные элементы
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');
  // Получаем выбранный идентификатор породы
  const breedId = event.currentTarget.value;
  // Делаем запрос на получение информации о выбранной породе
  fetchCatByBreed(breedId)
    .then(data => {
      // Скрываем загрузчик и показываем выпадающий список
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      // Извлекаем необходимые данные о породе из ответа
      const { url, breeds } = data[0];

      // **Проверка на пустой массив breeds**
      if (!breeds || !breeds.length) {
        // Если информации нет, выводим сообщение об ошибке
        divCatInfo.innerHTML = `<div>Не удалось получить информацию о породе</div>`;
        return;
      }
      // Формируем HTML-код для отображения информации о породе
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      // Показываем контейнер с информацией о породе
      divCatInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  // Показываем выпадающий список выбора породы
  selector.classList.remove('is-hidden');
  // Скрываем загрузчик
  loader.classList.replace('loader', 'is-hidden');
  // Выводим уведомление об ошибке с помощью библиотеки notiflix
  Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
}
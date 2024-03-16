export async function fetchBreeds() {
    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        return response.data;
      } catch (error) {
        console.error("Ошибка при получении списка пород:", error);
    // Вы можете повторно выбросить ошибку для обработки в `index.js`
        throw error;
      }
  }
// Информация про кота
  export async function fetchCatByBreed(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        return response.data;
      } catch (error) {
        console.error("Ошибка при получении информации о коте:", error);
        // Вы можете повторно выбросить ошибку для обработки в `index.js`
        // throw error;
      }
  }
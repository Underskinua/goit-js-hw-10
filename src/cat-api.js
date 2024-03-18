const API_KEY = "live_7hWYQiyzXepcBfYts6iFS4paXCTpeplBe52rSiD9unGzwsdmE4oDRxhdiwZOENgY";

const url = "https://api.thecatapi.com/v1";

export async function fetchBreeds() {
  try {
    const response = await fetch(`${url}/breeds?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error; // or handle error in your way
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await fetch(`${url}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error; // or handle error in your way
  }
}

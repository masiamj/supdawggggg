/**
 * Retrieves all available dog breeds
 *
 * Maps breeds and their sub-breeds into the structure <breed:subbreed>
 * This common structure will be used in the UI to specify the exact breed variants available
 * It will also be used in image requests to create the URI path for API requests
 */
const retrieveAllBreeds = async () => {
  const result = await fetch("https://dog.ceo/api/breeds/list/all");
  const { message = {} } = await result.json();

  return Object.entries(message).reduce((acc, [breed, variants = []]) => {
    const combinations = [breed].concat(variants.map((v) => `${breed}:${v}`));
    return acc.concat(combinations);
  }, []);
};

/**
 * Retrieves a new random picture from the API for a selected breed
 */
const retrieveRandomPictureForBreed = async (breed) => {
  const result = await fetch(createRandomPictureRequestURL(breed));
  const { message } = await result.json();
  return message;
};

/**
 * Given a breed of the format <breed:subbreed> it will format a URI path to request a random image for that breed
 */
const createRandomPictureRequestURL = (breed = "") => {
  const breedPath = breed.replace(":", "/");
  return `https://dog.ceo/api/breed/${breedPath}/images/random`;
};

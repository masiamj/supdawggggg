/**
 * Functions for updating UI elements
 *
 * These functions live separate from the state and data-fetching utils because they're really only concerned w/ the view layer
 * They get dispatched based on state updates to emulate fn(state) --> UI (lol React??)
 */

/**
 * Parses breeds (with subbreeds) of the form <breed:subbreed> for UI display
 */
const formatBreedForDisplay = (breed = "") => {
  const parts = breed.split(":");
  if (parts.length === 1) {
    return parts[0];
  } else {
    const [breed, subbreed] = parts;
    return `${breed} (${subbreed})`;
  }
};

/**
 * Sets image source for the image currently being viewed
 */
const renderActiveImage = (imageURL = "") => {
  document.getElementById("active-image").src = imageURL;
};

/**
 * Renders the available breeds as buttons
 */
const renderAvailableBreeds = (breeds = []) => {
  const fragment = document.createDocumentFragment();

  /**
   * Create a button to select each breed
   */
  breeds.forEach((breed) => {
    const el = document.createElement("button");
    el.id = breed;
    el.innerText = formatBreedForDisplay(breed);
    el.onclick = () => state.setActiveBreed(breed);
    el.className =
      "justify-center py-1 px-1 border border-blue-500 rounded-sm shadow-sm text-xs font-medium bg-white hover:bg-gray-100 mr-2 mb-2";

    fragment.appendChild(el);
  });

  document.getElementById("breed-selector").append(fragment);
};

/**
 * Puts some text for the current breed in the button
 */
const renderNextImageButton = (breed) => {
  document.getElementById(
    "next-image-button"
  ).textContent = `See more ${formatBreedForDisplay(breed)}!`;
};

const renderViewedShiba = (imageURL) => {
  const el = document.createElement("img");
  el.id = imageURL;
  el.src = imageURL;
  el.className = "object-contain h-24 opacity-50 mr-2 mb-2 rounded-sm";
  el.onclick = () => state.selectViewedShiba(imageURL);
  document.getElementById("viewed-shibas").appendChild(el);
};

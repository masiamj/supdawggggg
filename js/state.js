/**
 * For purposes of this assessment, I'm just going to assume happy-path and all API requests succeed
 * Obviously that's not real-life, but alas.
 *
 * I normally write in more of a functional way,
 * but I think a simple class that holds the application state and coordinates updates will do the job here
 */

// No magic strings!!!
const SHIBA = "shiba";

class ApplicationState {
  constructor(activeBreed = SHIBA) {
    this.activeBreed = activeBreed;
    this.activeImageURL = "";
    this.availableBreeds = [];
    this.viewedShibas = new Set([]);
  }

  /**
   * Maybe adds a newly viewed Shiba image to viewed images (via Set [no dupes])
   */
  addViewedShiba(imageURL) {
    if (this.activeBreed === SHIBA) {
      // Only render a new "viewed Shiba" image if it's not already in the Set
      if (!this.viewedShibas.has(imageURL)) {
        renderViewedShiba(imageURL);
      }

      // Maybe add to set (potentially no-op)
      this.viewedShibas.add(imageURL);
    }
  }

  /**
   * When a user clicks on an already viewed Shiba,
   * sets the breed to Shiba and the activeImageURL
   */
  selectViewedShiba(imageURL) {
    this.activeBreed = SHIBA;
    this.setActiveImageURL(imageURL);
    renderNextImageButton(SHIBA);
  }

  /**
   * Initializes state with all available dog breeds and a picture of a shiba
   */
  async initialize() {
    const breeds = await retrieveAllBreeds();
    this.setActiveBreed(this.activeBreed);
    this.setAvailableBreeds(breeds);
  }

  /**
   * Sets the active breed (via user selection)
   * Runs side-effect to fetch and set a new active image for the breed
   */
  async setActiveBreed(breed) {
    this.activeBreed = breed;
    const imageURL = await retrieveRandomPictureForBreed(breed);
    this.setActiveImageURL(imageURL);
    this.addViewedShiba(imageURL);
    renderNextImageButton(breed);
  }

  /**
   * Quick way to view next image for currently selected breed
   */
  async viewNextImage() {
    await this.setActiveBreed(this.activeBreed);
  }

  setActiveImageURL(imageURL) {
    this.activeImageURL = imageURL;
    renderActiveImage(imageURL);
  }

  setAvailableBreeds(breeds = []) {
    this.availableBreeds = breeds;
    renderAvailableBreeds(breeds);
  }
}

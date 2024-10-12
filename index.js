import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
    "live_7HN3UDEIs21bl6zR1Lyha4pa32QTIUNiFjdwnavoyXaopP0mlzx3MUiGQhVKQhfw";

/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
// axios.defaults.headers.common["x-api-key"] =
//   "live_7HN3UDEIs21bl6zR1Lyha4pa32QTIUNiFjdwnavoyXaopP0mlzx3MUiGQhVKQhfw";
// axios.defaults.baseURL = "https://api.thecatapi.com/v1";

// async function initialLoad() {
//   try {
//     //console.log("Fetching breeds...");
//     const response = await fetch("https://api.thecatapi.com/v1/breeds", {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });

//     //The ok property of the response object is a boolean that indicates if the HTTP status code is in the range of 200-299
//     //If Not OK, throws Error... -creates a new Error object - handled by try catch block
//     //response.status contains the HTTP status code of the response (e.g., 404 for "Not Found", 500 for "Internal Server Error").
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const breeds = await response.json();
//     //console.log("Breeds fetched:", breeds);

//     const breedSelect = document.getElementById("breedSelect");

//     //adding options to dropdown
//     breeds.forEach((breed) => {
//       const option = document.createElement("option");
//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });
//     console.log("Select element populated");

//     console.log("Total breeds added:", breeds.length);
//   } catch (error) {
//     console.error("Error loading breeds:", error);
//   }
// }

// // Execute the function immediately
// initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
// The event handler for breed selection
// async function handleBreedSelect() {
//   const selectedBreedId = breedSelect.value;

//   if (!selectedBreedId) return;

//   try {
//     // Fetch breed information
//     const response = await fetch(
//       `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}&limit=5`,
//       {
//         headers: {
//           "x-api-key": API_KEY,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const breedData = await response.json();

//     // Clear existing carousel items and info section
//     Carousel.clear();
//     infoDump.innerHTML = "";

//     // Populate carousel with new breed images
//     breedData.forEach((item) => {
//       const carouselItem = Carousel.createCarouselItem(
//         item.url,
//         item.breeds[0].name,
//         item.id
//       );
//       Carousel.appendCarousel(carouselItem);
//     });

//     // Create and populate the informational section
//     const breedInfo = breedData[0].breeds[0]; // Get the breed information
//     const infoHTML = `
//       <h3>${breedInfo.name}</h3>
//       <p>${breedInfo.description}</p>
//       <p><strong>Origin:</strong> ${breedInfo.origin}</p>
//       <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
//     `;
//     infoDump.innerHTML = infoHTML;

//     // Start the carousel
//     Carousel.start();
//   } catch (error) {
//     console.error("Error loading breed details:", error);
//   }
// }

// // Add event listener to the breed selection
// breedSelect.addEventListener("change", handleBreedSelect);

// // Call handleBreedSelect at the end of initialLoad to create the initial carousel
// initialLoad().then(() => handleBreedSelect());

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
// Step 0: Store your API key here for reference and easy access.
// const API_KEY =
//   "live_7HN3UDEIs21bl6zR1Lyha4pa32QTIUNiFjdwnavoyXaopP0mlzx3MUiGQhVKQhfw";

// Set axios default headers and base URL
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.defaults.baseURL = "https://api.thecatapi.com/v1";

// Initial load function to fetch breeds
async function initialLoad() {
    try {
        // Fetch breeds from the Cat API using axios
        const response = await axios.get("/breeds");

        const breeds = response.data;

        // Populate the dropdown with breeds
        breeds.forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed.id;
            option.textContent = breed.name;
            breedSelect.appendChild(option);
        });

        console.log("Total breeds added:", breeds.length);
    } catch (error) {
        console.error("Error loading breeds:", error);
    }
}

// The event handler for breed selection
async function handleBreedSelect() {
    const selectedBreedId = breedSelect.value;

    if (!selectedBreedId) return;

    try {
        // Fetch breed information using axios
        const response = await axios.get(
            `/images/search?breed_ids=${selectedBreedId}&limit=5`
        );

        const breedData = response.data;

        // Clear existing carousel items and info section
        Carousel.clear();
        infoDump.innerHTML = "";

        // Check if breed data is available
        if (!breedData.length || !breedData[0].breeds.length) {
            infoDump.innerHTML =
                "<p>No images or information available for this breed.</p>";
            return;
        }

        // Populate carousel with new breed images
        breedData.forEach((item) => {
            const imgUrl = item.url;
            const breedInfo = item.breeds[0]; // Get the breed information

            // Only add images if breed info is available
            if (breedInfo) {
                const carouselItem = Carousel.createCarouselItem(
                    imgUrl,
                    breedInfo.name,
                    item.id
                );
                Carousel.appendCarousel(carouselItem);
            }
        });

        // Create and populate the informational section
        const breedInfo = breedData[0].breeds[0]; // Get the breed information
        const infoHTML = `
      <h3>${breedInfo.name}</h3>
      <p>${breedInfo.description}</p>
      <p><strong>Origin:</strong> ${breedInfo.origin}</p>
      <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
    `;
        infoDump.innerHTML = infoHTML;

        // Start the carousel
        Carousel.start();
    } catch (error) {
        console.error("Error loading breed details:", error);
        infoDump.innerHTML =
            "<p>Error loading breed details. Please try again.</p>";
    }
}

// Add event listener to the breed selection
breedSelect.addEventListener("change", handleBreedSelect);

// Call handleBreedSelect at the end of initialLoad to create the initial carousel
initialLoad().then(() => handleBreedSelect());

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */
// Add axios request interceptor
// axios.interceptors.request.use((config) => {
//   // Log the start time
//   config.metadata = { startTime: new Date() };
//   console.log(`Request started: ${config.url}`);
//   return config;
// });

// // Add axios response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     // Calculate the time taken for the request
//     const duration = new Date() - response.config.metadata.startTime;
//     console.log(
//       `Response received: ${response.config.url} | Duration: ${duration} ms`
//     );
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     const duration = new Date() - error.config.metadata.startTime;
//     console.log(
//       `Error occurred: ${error.config.url} | Duration: ${duration} ms`
//     );
//     return Promise.reject(error);
//   }
// );

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */
// Progress bar element
//const progressBar = document.getElementById("progressBar");

// Function to update progress bar width
function updateProgress(event) {
    if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        progressBar.style.width = `${percentage}%`;
        console.log("Progress event:", event);
    }
}

// // Add axios request interceptor
// axios.interceptors.request.use((config) => {
//   // Log the start time
//   config.metadata = { startTime: new Date() };
//   console.log(`Request started: ${config.url}`);

//   // Reset progress bar
//   progressBar.style.width = "0%";

//   return config;
// });

// // Add axios response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     // Calculate the time taken for the request
//     const duration = new Date() - response.config.metadata.startTime;
//     console.log(
//       `Response received: ${response.config.url} | Duration: ${duration} ms`
//     );

//     // Reset progress bar after completion
//     progressBar.style.width = "100%";

//     return response;
//   },
//   (error) => {
//     const duration = new Date() - error.config.metadata.startTime;
//     console.log(
//       `Error occurred: ${error.config.url} | Duration: ${duration} ms`
//     );

//     // Reset progress bar on error
//     progressBar.style.width = "100%";

//     return Promise.reject(error);
//   }
// );

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
// Add axios request interceptor
axios.interceptors.request.use((config) => {
    // Log the start time
    config.metadata = { startTime: new Date() };
    console.log(`Request started: ${config.url}`);

    // Reset progress bar
    progressBar.style.width = "0%";

    // Set cursor to progress
    document.body.style.cursor = "progress";

    return config;
});

// Add axios response interceptor
axios.interceptors.response.use(
    (response) => {
        // Calculate the time taken for the request
        const duration = new Date() - response.config.metadata.startTime;
        console.log(
            `Response received: ${response.config.url} | Duration: ${duration} ms`
        );

        // Reset progress bar after completion
        progressBar.style.width = "100%";

        // Remove progress cursor style
        document.body.style.cursor = "auto";

        return response;
    },
    (error) => {
        const duration = new Date() - error.config.metadata.startTime;
        console.log(
            `Error occurred: ${error.config.url} | Duration: ${duration} ms`
        );

        // Reset progress bar on error
        progressBar.style.width = "100%";

        // Remove progress cursor style
        document.body.style.cursor = "auto";

        return Promise.reject(error);
    }
);

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
    // your code here
    try {
        //Fetch the current list of favorites
        const response = await axios.get("/favourites");
        const favourites = response.data;

        //Check if the image is already in the favorites
        const isFavorited = favourites.some((fav) => fav.image.id === imgId);

        if (isFavorited) {
            // If it is favorited, delete it
            const favToDelete = favourites.find((fav) => fav.image.id === imgId);
            await axios.delete(`/favourites/${favToDelete.id}`);
            console.log(`Removed favourite for image ID: ${imgId}`);
        } else {
            // If it is not favorited, add it to favorites
            await axios.post("/favourites", {
                image_id: imgId,
            });
            console.log(`Added favourite for image ID: ${imgId}`);
        }
    } catch (error) {
        console.error("Error toggling favourite:", error);
    }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
// Function to fetch and display favourites
async function getFavourites() {
    try {
        // Fetch favourites from the API
        const response = await axios.get("/favourites");
        const favourites = response.data;

        // Clear the carousel
        Carousel.clear();

        // Check if there are any favourites
        if (favourites.length === 0) {
            infoDump.innerHTML = "<p>No favourites found.</p>";
            return;
        }

        // Loop through the favourites and create carousel items
        favourites.forEach((fav) => {
            const imgSrc = fav.image.url; // URL of the image
            const imgAlt = `Favourite cat image`; // Alt text for accessibility
            const imgId = fav.image.id; // Image ID for the favourite
            const carouselItem = Carousel.createCarouselItem(imgSrc, imgAlt, imgId);
            Carousel.appendCarousel(carouselItem);
        });

        // Start the carousel functionality
        Carousel.start();
    } catch (error) {
        console.error("Error fetching favourites:", error);
    }
}

// Bind the event listener to the Get Favourites button
getFavouritesBtn.addEventListener("click", getFavourites);

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
// Check if breed data is available
// if (!breedData.length || !breedData[0].breeds.length) {
//   infoDump.innerHTML =
//     "<p>No images or information available for this breed.</p>";
//   return;
// }

// breedData.forEach((item) => {
//   const imgUrl = item.url;
//   const breedInfo = item.breeds[0]; // Get the breed information

//   // Only add images if breed info is available
//   if (breedInfo) {
//     const carouselItem = Carousel.createCarouselItem(
//       imgUrl,
//       breedInfo.name,
//       item.id
//     );
//     Carousel.appendCarousel(carouselItem);
//   }
// });

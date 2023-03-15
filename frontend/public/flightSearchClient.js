const originInput = document.getElementById("origin-input");
const originOptions = document.getElementById("origin-options");
const destinationInput = document.getElementById("destination-input");
const destinationOptions = document.getElementById("destination-options");
const flightTypeSelect = document.getElementById("flight-type-select");
const departureDateInput = document.getElementById("departure-date-input");
const returnDateInput = document.getElementById("return-date-input");
const adultsInput = document.getElementById("adults-input");
const childrenInput = document.getElementById("children-input");
const infantsInput = document.getElementById("infants-input");
const travelClassSelect = document.getElementById("travel-class-select");
const searchButton = document.getElementById("search-button");
const separator = document.querySelector(".separator");
const loadingIndicator = document.querySelector(".loading-indicator");
const searchResultsList = document.querySelector(".search-results");

const autocompleteTimeout = 300;
let autocompleteTimeoutHandle = 0;

let originCityCodes = {};
let destinationCityCodes = {};

const autocomplete = (input, datalist, cityCodes) => {
  clearTimeout(autocompleteTimeoutHandle);
  autocompleteTimeoutHandle = setTimeout(async () => {
    try {
      const params = new URLSearchParams({ keyword: input.value });
      const response = await fetch(`/api/autocomplete?${params}`);
      const data = await response.json();
      datalist.textContent = "";
      data.forEach((entry) => {
        cityCodes[entry.name.toLowerCase()] = entry.iataCode;
        datalist.insertAdjacentHTML(
          "beforeend",
          `<option value="${entry.name}"></option>`
        );
      });
    } catch (error) {
      console.error(error);
    }
  }, autocompleteTimeout);
};

originInput.addEventListener("input", () => {
  if (originInput) {
    autocomplete(originInput, originOptions, originCityCodes);
  }
});

destinationInput.addEventListener("input", () => {
  if (destinationInput) {
    autocomplete(destinationInput, destinationOptions, destinationCityCodes);
  }
});

const formatDate = (date) => {
  const [formattedDate] = date.toISOString().split("T");
  return formattedDate;
};

const formatNumber = (number) => {
  return `${Math.abs(parseInt(number))}`;
};

const search = async () => {
  try {
    const returns = flightTypeSelect.value === "round-trip";
    const params = new URLSearchParams({
      origin: originCityCodes[originInput.value.toLowerCase()],
      destination: destinationCityCodes[destinationInput.value.toLowerCase()],
      departureDate: formatDate(departureDateInput.valueAsDate),
      adults: formatNumber(adultsInput.value),
      children: formatNumber(childrenInput.value),
      infants: formatNumber(infantsInput.value),
      travelClass: travelClassSelect.value,
      ...(returns ? { returnDate: formatDate(returnDateInput.valueAsDate) } : {}),
    });
    const response = await fetch(`/api/search?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

searchButton.addEventListener("click", async () => {
  const results = await search();
  console.log(results);
});

const reset = () => {
  separator.classList.add("d-none");
  loadingIndicator.classList.add("d-none");
  searchResultsList.textContent = "";
};

searchButton.addEventListener("click", async () => {
  reset();
  const results = await search();
  showResults(results);
});

const showResults = (results) => {
  if (results.length === 0) {
    searchResultsList.insertAdjacentHTML(
      "beforeend",
      `<li class="list-group-item">No results found.</li>`
    );
  } else {
    results.forEach((result) => {
      const flight = result.itineraries[0];
      const price = result.price.total;

      searchResultsList.insertAdjacentHTML(
        "beforeend",
        `<li class="list-group-item">
          ${flight.segments[0].departure.iataCode} -> ${flight.segments[0].arrival.iataCode} | ${flight.duration.slice(2).toLowerCase()} | ${price} ${result.price.currency}
        </li>`
      );
    });
  }

  separator.classList.remove("d-none");
  loadingIndicator.classList.add("d-none");
};

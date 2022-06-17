/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/**
 * Add Search Bar
 */
const searchBar = `
  <form id="search-form">
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  </form>`;
const header = document.querySelector("header");
header.insertAdjacentHTML("beforeend", searchBar);

const searchForm = document.querySelector("#search-form");
const input = document.querySelector("#search");
const searchButton = document.querySelector("button");

input.addEventListener("keydown", e => {
  const searchTerm = e.target.value.toLowerCase();
  const results = data.filter(item => {
    const name = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
    return name.includes(searchTerm);
  });

  showPage(results, 1);
  addPagination(results);
});

// searchButton.addEventListener("click", e => {
//   const searchTerm = input.value.toLowerCase();
//   const results = data.filter(item => {
//     const name = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`;
//     return name.includes(searchTerm);
//   });
//   showPage(results, 1);
//   addPagination(results);
// });

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const cardsPerPage = 9;
  const startIndex = page * cardsPerPage - cardsPerPage;
  const endIndex = page * cardsPerPage;

  const ul = document.querySelector(".student-list");
  ul.innerHTML = ""; // empty UL area of existing items

  if (list.length === 0) {
    ul.innerHTML = "<h1>No results found</h1>";
  } else {
    // Loop through list and only create cards for items between
    // startIndex and endIndex
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        // Create card
        let card = `
        <li class="student-item cf">
        <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
        <h3>${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email">${list[i].email}</span>
        </div>
        <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
        </div>
        </li>`;
        // Insert card into UL area on page
        ul.insertAdjacentHTML("beforeend", card);
      }
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const cardsPerPage = 9;
  const ul = document.querySelector(".link-list");
  ul.innerHTML = ""; // empty UL area of existing items

  // Create and insert number buttons
  for (let i = 0; i < list.length / cardsPerPage; i++) {
    const button = `
     <li>
        <button type="button">${i + 1}</button>
     </li>
    `;
    ul.insertAdjacentHTML("beforeend", button);
  }

  // Make first number button "active"
  ul.firstElementChild.firstElementChild.className = "active";

  // Handle button click events
  ul.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      // If "button" clicked make clicked button active
      // (while looping to find clicked button, remove "active" class)
      const pageButtons = Array.from(document.querySelectorAll(".link-list li"));
      pageButtons.forEach(button => {
        button.firstElementChild.className = "";
        if (e.target.textContent === button.firstElementChild.textContent) {
          button.firstElementChild.className = "active";
        }
      });

      // Display "showPage" with new page number
      showPage(data, e.target.textContent);
    }
  });
}

// Call functions
showPage(data, 1);
addPagination(data);

/*
{
    name: {
      title: "Miss",
      first: "Ethel",
      last: "Dean",
    },
    email: "ethel.dean@example.com",
    registered: {
      date: "12-15-2005",
      age: 15,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/25.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    },
  },
*/

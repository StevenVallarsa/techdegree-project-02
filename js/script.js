/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  const itemsPerPage = 9;
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;

  const ul = document.querySelector(".student-list");
  ul.innerHTML = ""; // empty UL area of existing items

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      let card = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
          </div>
        </li>`;
      ul.insertAdjacentHTML("beforeend", card);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

// Call functions
showPage(data, 1);

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

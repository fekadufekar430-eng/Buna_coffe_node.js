

// // 3 part in Explanation of chatGPT

// const menuContainer =
//     document.getElementById("menuContainer");

// const searchInput =
//     document.getElementById("searchInput");

// const categoryFilter =
//     document.getElementById("categoryFilter");


// async function loadMenu() {

//     try {

//         const search =
//             searchInput?.value.trim() || "";

//         const category =
//             categoryFilter?.value || "";


//         const params =
//             new URLSearchParams();

// // this code prevent blank or empty file is not send to server
// // search=coffee
//         if (search) {
//             params.set("search", search);
//         }


//         if (category) {
//             params.set("category", category);
//         }


//         const query =
//             params.toString();

// //   the use of "?" this is to separate path and the user send data 
// //  example like this     1).. /api/menu?search=pizza
//         const response =
//             await fetch(
//                 `/api/menu${query ? "?" + query : ""}`
//             );


//         const result =
//             await response.json();


//         if (!result.success) {

//             menuContainer.innerHTML =
//                 "<p>Unable to load menu.</p>";

//             return;
//         }


//         renderMenu(result.data);

//     } catch (error) {

//         console.error(error);

//         menuContainer.innerHTML =
//             "<p>Server connection failed.</p>";
//     }
// }


// function renderMenu(items) {

//     if (items.length === 0) {

//         menuContainer.innerHTML =
//             "<p>No menu items found.</p>";

//         return;
//     }


//     menuContainer.innerHTML =
//         items.map(item => `

//             <article class="menu-card">

//                 <div class="menu-card-top">

//                     <span class="menu-category">
//                         ${item.category}
//                     </span>

//                     <span class="menu-price">
//                         $${item.price.toFixed(2)}
//                     </span>

//                 </div>

//                 <h2>
//                     ${item.name}
//                 </h2>

//                 <p>
//                     ${item.description}
//                 </p>

//             </article>

//         `).join("");
// }


// searchInput?.addEventListener(
//     "input",
//     loadMenu
// );

// // this "?" use check searchInput they have a data or not
// categoryFilter?.addEventListener(
//     "change",
//     loadMenu
// );


// if (menuContainer) {
//     loadMenu();
// }









const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

async function loadMenu() {
    try {
        const search = searchInput?.value.trim() || "";
        const category = categoryFilter?.value || "";

        const params = new URLSearchParams();
        if (search) {
            params.set("search", search);
        }

        if (category) {
            params.set("category", category);
        }

        const query = params.toString();
        const response = await fetch(`/api/menu${query ? "?" + query : ""}`);
        const result = await response.json();

        if (!result.success) {
            menuContainer.innerHTML = "<p>Unable to load menu.</p>";
            return;
        }

        renderMenu(result.data);
    } catch (error) {
        console.error(error);
        menuContainer.innerHTML = "<p>Server connection failed.</p>";
    }
}

function renderMenu(items) {
    if (items.length === 0) {
        menuContainer.innerHTML = "<p>No menu items found.</p>";
        return;
    }

    menuContainer.innerHTML = items.map(item => `
        <article class="menu-card">
            <div class="menu-card-top">
                <span class="menu-category">${item.category}</span>
                <span class="menu-price">$${item.price.toFixed(2)}</span>
            </div>
            <h2>${item.name}</h2>
            <p>${item.description}</p>
        </article>
    `).join("");
}

searchInput?.addEventListener("input", loadMenu);
categoryFilter?.addEventListener("change", loadMenu);

if (menuContainer) {
    loadMenu();
}
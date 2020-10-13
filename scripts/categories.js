const categories = ["electronics", "sport", "cars", "jobs", "animals", "health", "games", "houses"];
const selectCategories = document.querySelector("#select-categories");

categories.forEach(item => {
    const option = `
    <option value="${item}">
     ${item}
    </option>
    `;
    selectCategories.innerHTML += option
})
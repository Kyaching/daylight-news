// fetch all news catagories
const loadNewsCatagories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data.news_category));
};
loadNewsCatagories();

const displayCatagories = (data) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach((data) => {
    const { category_name } = data;
    const catagoriesList = document.createElement("li");
    catagoriesList.classList.add("nav-item");
    catagoriesList.innerHTML = `
    <a class="nav-link fw-bold text-secondary" href="#">${category_name}</a>
    `;
    catagoriesContainer.appendChild(catagoriesList);
  });
};

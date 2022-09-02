// fetch all news catagories
const loadNewsCatagories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data.news_category));
};
loadNewsCatagories();
// display All news catagories in UI
const displayCatagories = (data) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach((data) => {
    console.log(data);
    const { category_id, category_name } = data;
    const catagoriesList = document.createElement("li");
    catagoriesList.classList.add("nav-item");
    catagoriesList.innerHTML = `
    <a onClick="loadCategory('${category_id}')" class="nav-link fw-bold text-secondary" href="#">${category_name}</a>
    `;
    catagoriesContainer.appendChild(catagoriesList);
  });
};

const loadCategory = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data));
};

const displayCategory = (data) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  data.forEach((data) => {
    const { thumbnail_url, title, details } = data;
    const { img, name, published_date } = data.author;
    console.log(data);
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "card mb-3");
    categoryDiv.innerHTML = `
    <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-9 d-flex align-items-end">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="me-2 author-img" src="${img}"  alt="" />
                    <div>
                      <p class="m-0">${name}</p>
                      <p class="m-0">${published_date}</p>
                    </div>
                  </div>
                  <div>
                    <img src="./image/carbon_view.png" alt="" />
                    <span>${data.total_view}</span>
                  </div>
                  <div>
                    <i class="fa-regular fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                  </div>
                  <div>
                    <i class="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

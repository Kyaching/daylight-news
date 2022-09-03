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
    // console.log(data);
    const { category_id, category_name } = data;
    const catagoriesList = document.createElement("li");
    catagoriesList.classList.add("nav-item");
    catagoriesList.innerHTML = `
    <a id="category-name" onClick="loadCategory('${category_id}')" class="nav-link fw-bold text-secondary" href="#">${category_name}</a>
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
  let count = 0;
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  console.log(count);
  if (count <= 0) {
    displayTotalItems(count);
  }
  data.forEach((data) => {
    const { thumbnail_url, title, details } = data;
    const { img, name, published_date } = data.author;
    const { _id } = data;
    count++;
    console.log(count, data);
    displayTotalItems(count);
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "card mb-3");
    categoryDiv.innerHTML = `
    <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="details-text mb-5 ">
                <p class="card-text ">
                  <span>${details.slice(0, 250)}</span>
                  <br><br>
                  <span>${details.slice(0, 150)}</span>
                </p>
                </div>
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
                  <button onClick="openDetails('${_id}')"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  More
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    categoryContainer.appendChild(categoryDiv);
  });
};

const openDetails = (news_id) => {
  fetch(` https://openapi.programming-hero.com/api/news/${news_id}`)
    .then((res) => res.json())
    .then((data) => displaySelected(data.data[0]));
};

const displaySelected = (data) => {
  const modelContainer = document.getElementById("model-container");
  modelContainer.textContent = "";
  const categoryDiv = document.createElement("div");
  categoryDiv.setAttribute("class", "card mb-3");
  categoryDiv.innerHTML = `
    <div class="row g-0">
            <div class="col-12">
              <img src="${data.thumbnail_url}" class="w-100 img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-12 d-flex align-items-end">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.details}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="me-2 author-img" src="${data.author.img}"  alt="" />
                    <div>
                      <p class="m-0">${data.author.name}</p>
                      <p class="m-0">${data.author.published_date}</p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  modelContainer.appendChild(categoryDiv);
};

// display total items categories
const displayTotalItems = (count) => {
  console.log(count);
  // const categoryName = document.getElementById("category-name");
  // const name = categoryName.innerText;
  // console.log(data);
  const itemsCount = document.getElementById("items-count");
  itemsCount.textContent = "";
  const h6 = document.createElement("h6");

  itemsCount.classList.remove("d-none");
  h6.innerText = `${count ? count : "0"} items found`;
  itemsCount.appendChild(h6);
};

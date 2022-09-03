// fetch all news catagories
const loadNewsCatagories = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.data.news_category))
    .catch((error) => console.log(error, "Invalid url"));
};
loadNewsCatagories();
// display All news catagories in UI
const displayCatagories = (data) => {
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach((data) => {
    const { category_id, category_name } = data;
    const catagoriesList = document.createElement("li");
    catagoriesList.classList.add("nav-item");
    catagoriesList.innerHTML = `
    <a id="news-name" onClick="loadCategory('${category_id}','${category_name}')" class="nav-link fw-semibold news-color" href="#">${category_name}</a>
    `;
    catagoriesContainer.appendChild(catagoriesList);
  });
};

const loadCategory = (categoryId, categoryName) => {
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data, categoryName))
    .catch((error) => console.log(error, "Invalid Url"));
};
const displayCategory = (data, categoryName) => {
  if (data.length <= 0) {
    displayTotalItems(data.length, categoryName);
    toggleSpinner(false);
  }
  displayTotalItems(data.length, categoryName);
  data.sort((a, b) => b.total_view - a.total_view);
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  data.forEach((data) => {
    const { _id, thumbnail_url, title, details, total_view } = data;
    const { img, name, published_date } = data.author;
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "card mb-4 border-0 p-3");
    categoryDiv.innerHTML = `
    <div class="row g-0">
            <div class="col-12 col-md-3">
              <img src="${thumbnail_url}" class="w-100 rounded-start" alt="..." />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <div class="details-text">
                <p style="max-height:160px;" class="card-text text-over">
                  <span  class="d-none d-md-block">${details
                    .slice(0, 500)
                    .concat("...")}</span>
                  <span  class="d-block d-md-none">${details
                    .slice(0, 200)
                    .concat("...")}</span>
                </p>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="me-2 author-img" src="${img}"  alt="" />
                    <div>
                      <p class="m-0">${name ? name : "Not found"}</p>
                      <p class="m-0">${
                        published_date ? published_date : "Not found"
                      }</p>
                    </div>
                  </div>
                  <div>
                    <img src="./image/carbon_view.png" alt="" />
                    <span>${total_view ? total_view : "no view"}</span>
                  </div>
                  <div class="d-none d-md-block">
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
    toggleSpinner(false);
  });
};
// display total items categories
const displayTotalItems = (count, categoryName) => {
  const itemsCount = document.getElementById("items-count");
  itemsCount.textContent = "";
  const itemsDiv = document.createElement("div");
  itemsDiv.innerHTML = `
  <div class="item-size d-flex align-items-center px-3">
          <h6><span class="txt-color fw-bold">${count}</span> items found for category <span class="txt-color fw-bold">${categoryName}</span></h6>
        </div>
  `;
  itemsCount.appendChild(itemsDiv);
  itemsCount.classList.remove("d-none");
};

// toggle loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("spinner-loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
loadCategory("08", "All News");
const openDetails = (news_id) => {
  fetch(` https://openapi.programming-hero.com/api/news/${news_id}`)
    .then((res) => res.json())
    .then((data) => displaySelected(data.data[0]))
    .catch((error) => console.log(error, "Invalid"));
};

const displaySelected = (data) => {
  const { thumbnail_url, title, details, total_view } = data;
  const { img, name, published_date } = data.author;
  const modelContainer = document.getElementById("model-container");
  modelContainer.textContent = "";
  const categoryDiv = document.createElement("div");
  categoryDiv.setAttribute("class", "card mb-3");
  categoryDiv.innerHTML = `
    <div class="row g-0">
            <div class="col-12">
              <img style="height:300px" src="${thumbnail_url}" class="w-100 img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-12 d-flex align-items-end">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details}</p>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <img class="me-2 author-img" src="${img}"  alt="" />
                    <div>
                      <p class="m-0">${name ? name : "Not found"}</p>
                      <p class="m-0">${
                        published_date ? published_date : "Not found"
                      }</p>
                    </div>
                  </div>
                  <div>
                    <img src="./image/carbon_view.png" alt="" />
                    <span>${total_view ? total_view : "no view"}</span>
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

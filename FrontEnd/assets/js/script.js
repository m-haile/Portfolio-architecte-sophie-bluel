async function getWorks() {
  // asynchrone; not at the same time
  const url = "http://localhost:5678/api/works";

  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    return true; //s'arrete la fonction
  }

  const result = await response.json();
  return result;
}

async function displayWorks() {
  const data = await getWorks();
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // pour vider l'élément

  for (let work of data) {
    let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`; // interpolation
    gallery.innerHTML += html;
  }
}

async function displayWorksInModal() {
  const data = await getWorks();
  let gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = ""; // pour vider l'élément

  for (let work of data) {
    let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <i class="fa-solid fa-trash-can"></i>
          </figure>`; // interpolation
    gallery.innerHTML += html;
    const iconElements = document.querySelectorAll("figure i");
    iconElements.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const workId = icon.parentElement.dataset.id;
        deleteWorks(workId);
      });
    });
  }
}

//pour supprimer les image vers la prmiere modale
async function deleteWorks(id) {
  const request = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!request.ok) {
    console.log(request.status);
    return true;
  }
  const figureElements = document.querySelectorAll(`figure[data-id="${id}"]`);
  figureElements.forEach(function (figureElement) {
    figureElement.remove();
  });
}

async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  // Récupérer les catégories avec l'API
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    return true;
  }
  const result = await response.json();
  console.log(result);

  let filtres = document.querySelector(".filtres");
  filtres.innerHTML = "";

  //Creation du bouton Tous
  const buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  filtres.appendChild(buttonAll);

  buttonAll.classList.add("active");

  //pour que le bouton Tous soit cliquable
  buttonAll.addEventListener("click", function () {
    const allElement = document.querySelectorAll(".gallery figure");
    allElement.forEach(function (element) {
      element.style.display = "block";
    });
    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (b) {
      // b pour le bouton
      b.classList.remove("active");
    });

    buttonAll.classList.add("active");
  });

  for (let category of result) {
    //Création des boutons
    const button = document.createElement("button");
    filtres.appendChild(button);
    button.textContent = category.name;

    //Pour que les boutons soient cliquables
    button.addEventListener("click", function () {
      const buttons = document.querySelectorAll("button");
      buttons.forEach(function (b) {
        // b pour le bouton
        b.classList.remove("active");
      });

      button.classList.add("active");
      const allElement = document.querySelectorAll(".gallery figure");
      allElement.forEach(function (element) {
        if (element.dataset.categoryId == category.id) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    });
  }
}

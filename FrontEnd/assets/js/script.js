//on devine qu’elle va récupérer des des travaux(works)
async function getWorks() {
  const url = "http://localhost:5678/api/works"; // c’est le chemin pour demander la liste des
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    return true; //s'arrete la fonction
  }
  //pour traduire les données de chaîne de caractère en javaScript
  const result = await response.json();
  return result;
}

async function displayWorks() {
  const data = await getWorks(); // pour récupérer les données de works
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // pour vider l'élément

  data.forEach(function (work) {
    let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`; // interpolation
    gallery.innerHTML += html; //à la place d'append child// pour insérer(mettre à l'intérieur) les éléments HTML
  });
}

// pour créer les projet dans la modale
async function displayWorksInModal() {
  const data = await getWorks(); // pour récupérer les données de works
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = ""; // pour vider l'élément

  data.forEach(function (work) {
    const html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <i class="fa-solid fa-trash-can"></i>
          </figure>`; // interpolation
    gallery.innerHTML += html;
    const iconElements = document.querySelectorAll("figure i"); //Les éléments i(icons) qui sont à l'intérieur des éléments figure
    iconElements.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const workId = icon.parentElement.dataset.id; //pour récupérer l'id de work
        deleteWorks(workId);
      });
    });
  });
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

//Ajouter dynamiquement les filtres des travaux
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  // Récupérer les catégories avec l'API
  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    return true;
  }
  const result = await response.json();
  return result;
}
// la 2em modale
async function displayCategoryOptions() {
  const result = await getCategories();
  const selectElement = document.querySelector("#category");
  selectElement.innerHTML = `<option value=""></option>`;
  result.forEach(function (category) {
    selectElement.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}

async function displayCategories() {
  const result = await getCategories();
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

function displayImage(file) {
  let imageLabel = document.querySelector(".image-label");
  // Créer l'aperçu de l'image avec un objet URL
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.alt = file.name;
  // Remplace le contenu d'image label avec l'image
  imageLabel.innerHTML = "";
  imageLabel.appendChild(img);
}

async function addNewWork(formList) {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: new FormData(formList),
    });

    if (response.ok) {
      const work = await response.json();

      formList.querySelectorAll("input, select").forEach(function (element) {
        element.value = "";
      });
      formList.querySelector(".image-label").innerHTML =
        `  <i class="fa-solid fa-image"></i>
              <div class="ajoutPhoto">+ Ajouter photo</div>
              <p>jpg, png : 4mo max</p>`;

      let gallery = document.querySelector(".gallery");
      let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`; // interpolation
      gallery.innerHTML += html;

      const galleryModal = document.querySelector(".gallery-modal");
      const htmlModal = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <i class="fa-solid fa-trash-can"></i>
          </figure>`; // interpolation
      galleryModal.innerHTML += htmlModal;

      const icon = document.querySelector(`figure[data-id="${work.id}"] i`);
      icon.addEventListener("click", (event) => {
        const workId = icon.parentElement.dataset.id; //pour récupérer l'id de work
        deleteWorks(workId);
      });

      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}

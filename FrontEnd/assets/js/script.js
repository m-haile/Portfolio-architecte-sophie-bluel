//on récupère les données des travaux
async function getWorks() {
  const url = "http://localhost:5678/api/works"; //je définit l'adresse de l'API que je veux contacter
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    return null;
  }

  // Traduction des données JSON en tableau d'objets JavaScript
  const result = await response.json();
  return result;
}

//pour afficher les travaux dans la page prancipale
function displayWorks(data) {
  //Sélectionne l'élément HTML où les travaux seront affichés
  let gallery = document.querySelector(".gallery");
  //vide la gallerie avant d'ajouter du contenu
  gallery.innerHTML = "";

  //pour chaque oeuvre
  data.forEach(function (work) {
    //création Html pour chaque travail
    let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`;
    gallery.innerHTML += html; //à la place d'append child// pour insérer(mettre à l'intérieur) les éléments HTML
  });
}

// pour créer(afficher) les travaux dans la modale
function displayWorksInModal(data) {
  const gallery = document.querySelector(".gallery-modal");
  gallery.innerHTML = "";

  //pour boucler chaque travail
  data.forEach(function (work) {
    //créer le HTML pour chaque travail
    const html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}"> 
            <img src="${work.imageUrl}" alt="${work.title}" />
            <i class="fa-solid fa-trash-can"></i>
          </figure>`;
    // Ajouter le HTML dans la galarie-modale
    gallery.innerHTML += html;
  });

  const iconElements = document.querySelectorAll(".gallery-modal figure i"); //Les éléments i(icons) qui sont à l'intérieur des éléments figure
  iconElements.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      //pour récupérer l'id de work
      const workId = icon.parentElement.dataset.id;
      deleteWorks(workId);
    });
  });
}

//pour supprimer les images dans la prmiere modale
async function deleteWorks(id) {
  const request = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // pour s'identifier de l'api
    },
  });

  if (!request.ok) {
    console.log(request.status);
    return;
  }

  //pour sélectionner les élélements figure qui ont l'attribut sélecteur CSS  data-id égal à l'id qu'on veut supprimer
  const figureElements = document.querySelectorAll(`figure[data-id="${id}"]`); //
  figureElements.forEach(function (figureElement) {
    figureElement.remove(); //méthod pour supprimer définitivment l'élément de la page web
  });
}

// Récupérer les catégories depuis l'API
async function getCategories() {
  const url = "http://localhost:5678/api/categories";

  const response = await fetch(url);
  if (!response.ok) {
    console.log(response.status);
    return null;
  }
  const result = await response.json();
  return result;
}

//pour créer les options Category dans select(dans un menu déroulant)
async function displayCategoryOptions() {
  const result = await getCategories();
  const selectElement = document.querySelector("#category");
  selectElement.innerHTML = `<option value=""></option>`; //on le lesse vide ("") pour pas séléctioner par défaut.
  result.forEach(function (category) {
    selectElement.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}

//pour afficher les boutons filtres
async function displayCategories() {
  const result = await getCategories();
  let filtres = document.querySelector(".filtres");
  filtres.innerHTML = "";

  //Création du bouton Tous
  const buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  filtres.appendChild(buttonAll);

  buttonAll.classList.add("active"); //

  //pour que le bouton Tous soit cliquable
  buttonAll.addEventListener("click", function () {
    const allElement = document.querySelectorAll(".gallery figure"); //pour sélectionner les éléments figure qui sont dans la gallery
    allElement.forEach(function (element) {
      element.style.display = "block";
    });

    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (b) {
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
        //pour retirer la classe active
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

//pour créer  l'aperçu dans la 2em modale
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

// pour ajouter une nouvelle oeuvre
async function addNewWork(formList) {
  //formlist(formlaire)
  const url = "http://localhost:5678/api/works";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: new FormData(formList), // pour envoyer un ficher
    });

    //on récupère les données que renvoie l'api
    if (response.ok) {
      const work = await response.json();

      //on vide le formulaire
      formList.querySelectorAll("input, select").forEach(function (element) {
        element.value = "";
      });

      //pour remplacer l'aperçu avec le HTML du début
      formList.querySelector(".image-label").innerHTML =
        `  <i class="fa-solid fa-image"></i>
              <div class="ajoutPhoto">+ Ajouter photo</div>
              <p>jpg, png : 4mo max</p>`;

      // On crée l'oeuvre sur la page principale
      let gallery = document.querySelector(".gallery");
      let html = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`;
      gallery.innerHTML += html;

      // On crée l'oeuvre dans la modale
      const galleryModal = document.querySelector(".gallery-modal");
      const htmlModal = `<figure data-id="${work.id}" data-category-id="${work.categoryId}">
            <img src="${work.imageUrl}" alt="${work.title}" />
            <i class="fa-solid fa-trash-can"></i>
          </figure>`;
      galleryModal.innerHTML += htmlModal; // pour affucher dans la page html

      const icon = document.querySelector(`figure[data-id="${work.id}"] i`); //icon de poubelle

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

//pour se déconnecter
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

function validateImage(image) {
  if (
    image.type === "image/png" ||
    image.type === "image/jpg" ||
    image.type === "image/jpeg"
  ) {
    if (image.size < 4 * 1024 * 1024) {
      return true;
    }
  }
  return false;
}

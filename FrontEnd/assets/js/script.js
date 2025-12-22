async function getWorks() {
  // asynchrone; not at the same time
  const url = "http://localhost:5678/api/works";

  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    return false;
  }

  const result = await response.json();
  console.log(result);

  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // pour vider l'élément

  for (let work of result) {
    console.log(work.title);
    let html = `<figure>
            <img src="${work.imageUrl}" alt="${work.title}" />
            <figcaption>${work.title}</figcaption>
        </figure>`; // interpolation
    gallery.innerHTML += html;
  }
}
getWorks();

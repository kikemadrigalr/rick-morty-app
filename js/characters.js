const d = document;

export default function getCharacters() {
  const $sectionCharacters = d.querySelector("#row-personajes"),
    $fragment = d.createDocumentFragment();

  const charactersAsync = async function () {
    try {
      let resp = await fetch("https://rickandmortyapi.com/api/character"),
        json = await resp.json(),
        characters = json.results;

      console.log(resp, characters);

      if (!resp.ok) {
        throw { status: resp.status, statusText: resp.statusText };
      }

      characters.forEach((character) => {
        const $colCard = d.createElement("div");
        $colCard.classList.add("col", "mb-4");

        $colCard.innerHTML = `
          <div class="card h-100">
            <img src="${character.image}" class="card-img-top" alt="${character.name}" />
            <div class="card-body">
              <h5 class="card-title">${character.name}</h5>
              <p class="card-text">
                <p class="card-text"> 
                  <strong>Genero:</strong> ${character.gender} <br>
                  <strong>Especie:</strong> ${character.species} <br>
                   <strong>Origen:</strong> ${character.origin.name} <br>
                   <strong>Locación:</strong> ${character.location.name}</p>
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">${character.status}</small>
            </div>
        </div>`;

        $fragment.appendChild($colCard);

        $sectionCharacters.appendChild($fragment);
      });
    } catch (error) {
      let message = error.statusText || "Ocurrio un Error";
      $sectionCharacters.innerHTML = `Error ${error.status}: ${message}`;
    }
  };

  charactersAsync();
}

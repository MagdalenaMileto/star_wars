import swapi from './swapi';

export function getPlanetsPage() {
  return swapi.get('/api/planets').then(({ data }) => data);
}

function getPlanetsAtPage(page) {
  return swapi.get(`/api/planets/?page=${page}`).then(({ data }) => data.results);
}

function getId(resource) {
  const chunks = resource.url.split('/');
  return chunks[chunks.length - 2];
}

function withResidents(planet) {
  const r = planet.residents.map((url) => swapi.get(url)
    .then(({ data }) => data)
    .then((resident) => ({ ...resident, id: getId(resident) })));
  return Promise.all(r).then((residents) => ({ ...planet, residents }));
}

export function getPlanet(id) {
  return swapi.get(`/api/planets/${id}`)
    .then(({ data }) => data)
    .then(withResidents);
}

function withHomeworld(resident) {
  return swapi.get(resident.homeworld)
    .then(({ data }) => data)
    .then((homeworld) => ({
      ...resident,
      homeworld: {
        url: resident.homeworld,
        name: homeworld.name,
        id: getId(homeworld),
      },
    }));
}

export function getResidentDetails(id) {
  return swapi.get(`/api/people/${id}`)
    .then(({ data }) => data)
    .then(withHomeworld);
}

function planetsWithId(planets) {
  return planets.map((planet) => ({ ...planet, id: getId(planet) }));
}

function nextPlanets(firstPage) {
  const pages = firstPage.count / firstPage.results.length;
  return new Array(pages - 1)
    .fill(0)
    .map((_, index) => getPlanetsAtPage(index + 2));
}

export function getPlanets() {
  return getPlanetsPage().then((firstPage) => {
    const firstPlanets = firstPage.results;
    return Promise.all(nextPlanets(firstPage))
      .then((otherPlanets) => firstPlanets.concat(...otherPlanets))
      .then(planetsWithId);
  });
}

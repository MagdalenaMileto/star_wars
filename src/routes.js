export const routes = {
  planets: {
    route: '/planets',
    link() {
      return '/planets';
    },
    label() {
      return 'Planets';
    },
  },
  residents: {
    route: '/planets/:planetId/residents',
    link(planetId) {
      return `/planets/${planetId}/residents`;
    },
    label(planetName) {
      return `Planet ${planetName}`;
    },
  },
  resident: {
    route: '/planets/:planetId/residents/:residentId',
    link(planetId, residentId) {
      return `/planets/${planetId}/residents/${residentId}`;
    },
    label(residentName) {
      return `Resident ${residentName}`;
    },
  },
};

const roads = [
  'Alice-Bob',
  'Alice-Cabin',
  'Alice-PostOffice',
  'Bob-TownHall',
  'Daria-Ernie',
  'Daria-TownHall',
  'Ernie-Grete',
  'Grete-Farm',
  'Grete-Shop',
  'Marketplace-Farm',
  'Marketplace-PostOffice',
  'Marketplace-Shop',
  'Marketplace-TownHall',
  'Shop-TownHall',
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) graph[from] = [to];
    else graph[from].push(to);
  }
  for (let [from, to] of edges.map((r) => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
console.log('Road Graph->', roadGraph);

// console.log((new Object()).toString);
// console.log((Object.create(null)).toString);

class VillgeState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    // process.stdout.write(`\x1b[34m -> ${destination} \x1b[0m`);
    if (!roadGraph[this.place].includes(destination)) {
      console.error('\x1b[31m%s\x1b[0m', 'not moving');
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          //carrying the parcels from this.place
          // console.log(p);
          // console.log(this.place);
          if (p.place != this.place) {
            return p;
          } else {
            return { place: destination, address: p.address };
          }
        })
        //leaving the parcels at their destinations
        .filter((p) => p.address != p.place);
      return new VillgeState(destination, parcels);
    }
  }
}

// const first = new VillgeState('PostOffice', [
//   { place: 'Farm', address: 'Marketplace' },
//   { place: 'Marketplace', address: 'TownHall' },
//   { place: 'Shop', address: 'Marketplace' },
//   { place: 'Farm', address: 'Ernie' },
//   { place: 'TownHall', address: 'Ernie' },
//   { place: 'Marketplace', address: 'Grete' },
//   { place: 'Grete', address: 'Daria' },
//   { place: 'Marketplace', address: 'Grete' },
//   { place: 'Farm', address: 'PostOffice' },
// ]);

// let next;
// console.log('first-->', first);

//ACTION
// next = first.move('Marketplace');
// console.log('next-->', next);
// next = next.move('TownHall');
// console.log('next-->', next);
// next = next.move('Shop');
// console.log('next-->', next);
// next = next.move('Grete');
// console.log('next-->', next);

function runRobot(state, robot, memory) {
  for (let i = 0; ; i++) {
    if (state.parcels.length == 0) {
      // console.log(`-->>>> Done in ${i} moves`);
      return i;
    }
    const action = robot(state, memory);
    // console.log(`moving from ${state.place} --> ${action.direction}`);
    state = state.move(action.direction);
    // console.log(state.parcels.length);
    memory = action.memory;
  }
}

function randomPick(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function randomRobot(state, memory) {
  return { direction: randomPick(roadGraph[state.place]), memory: memory };
}

const mailTruckPath = [
  'Alice',
  'Cabin',
  'Alice',
  'Bob',
  'TownHall',
  'Daria',
  'Ernie',
  'Grete',
  'Shop',
  'Grete',
  'Farm',
  'Marketplace',
  'PostOffice',
];

function routeRobot(state, memory) {
  if (memory.length == 0) memory = mailTruckPath;
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  // console.log(`finding route from ${from} ----> ${to}`);
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        // console.log(work);
        // console.log('answer-->', route.concat(place));
        return route.concat(place);
      }
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

VillgeState.random = function (parcelCount = 10) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let place = randomPick(Object.keys(roadGraph));
    let address;
    do {
      address = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place: place, address: address });
  }
  return new VillgeState('PostOffice', parcels);
};

let randomRobotSolutions = [],
  routeRobotSolutions = [],
  goalOrientedRobotSolutions = [];

const testcases = 200;

for (let i = 0; i < testcases; i++) {
  const random = VillgeState.random(900);
  randomRobotSolutions.push(runRobot(random, randomRobot, null));
  goalOrientedRobotSolutions.push(runRobot(random, goalOrientedRobot, []));
  routeRobotSolutions.push(runRobot(random, routeRobot, []));
}

// console.log('randomRobot: ', randomRobotSolutions);
// console.log('routeRobot: ', routeRobotSolutions);
// console.log('goalOrientedRobot: ', goalOrientedRobotSolutions);

console.log('RobotDirector  \t Average Steps');
console.log('randomRobot  \t ', randomRobotSolutions.reduce((p, c) => p + c) / testcases);
console.log('routeRobot   \t ', routeRobotSolutions.reduce((p, c) => p + c) / testcases);
console.log('goalOriRobot\t ', goalOrientedRobotSolutions.reduce((p, c) => p + c) / testcases);

// OUTPUT FOR 2000 testcases
// RobotDirector  	Average Steps
// randomRobot  	 118.367
// routeRobot   	 24
// goalOriRobot	 33.7325

const places = [
  {
    xid: 'N1361341279',
    name: 'Кирило-Афанасиевский мужской монастырь',
    description: 'Спасо-Афанасиевский монастырь — мужской монастырь Ярославской епархии Русской православной церкви, расположенный в историческом центре Ярославля',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Ярославль',
    wikiId: 'Q4221355',
    latitude: 57.625294,
    longitude: 39.895275
  },
  {
    xid: 'N1361341111',
    name: 'Кондакова слобода',
    description: 'Кондакова слобода',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Ярославль',
    wikiId: 'Q4221111',
    latitude: 57.628227,
    longitude: 39.867276
  },
  {
    xid: 'N1361341000',
    name: 'улица Чайковского, 1А',
    description: 'улица Чайковского, 1А',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Ярославль',
    wikiId: 'Q4221000',
    latitude: 57.619539,
    longitude: 39.870658
  }
]

let coords
let names
let center
const markers = []
const isMobile = window.innerWidth < 900
let markersList
let markersWrapper

if (isMobile) {
  markersWrapper = document.getElementById('content__markers__wrapper-mobile')
  markersList = document.getElementById('content__markers__list-mobile')
} else {
  markersWrapper = document.getElementById('content__markers__wrapper-desktop')
  markersList = document.getElementById('content__markers__list-desktop')
}

markersWrapper.classList.add('content__markers__wrapper')
markersList.classList.add('content__markers__list')

fetchDetails()

function fetchDetails () {
  coords = []
  names = []

  for (let i = 0; i < places.length; i++) {
    coords.push([places[i].latitude, places[i].longitude])
    names.push(places[i].name)

    markers.push({
      xid: places[i].xid,
      title: places[i].name,
      description: places[i].description,
      categories: places[i].categories,
      city: places[i].city,
      wikiId: places[i].wikiId,
      coordinates: [places[i].longitude, places[i].latitude]
    })

    drawPlace(places[i].name, places[i].description)
  }

  center = [places[0].latitude, places[0].longitude]

  ymaps.ready(drawMap)
}

function drawMap () {
  const myMap = new ymaps.Map('map', {
    center: center,
    zoom: 14
  })
  drawRoute(myMap)
}

function drawRoute (myMap) {
  ymaps.route(coords, {
    mapStateAutoApply: true,
    multiRoute: true
  }).then(function (route) {
    route.getPaths().options.set({
      strokeColor: 'f00',
      opacity: 0.9
    })

    myMap.geoObjects.add(route)

    const points = route.getWayPoints()

    for (let i = 0; i < names.length; i++) {
      points.get(i).properties.set('iconContent', i + 1)
    }

    points.options.set('preset', 'twirl#redStretchyIcon')
  })
}

function drawPlace (name, description) {
  const itemDiv = document.createElement('li')
  itemDiv.classList.add('content__markers__list-item')

  itemDiv.innerHTML = `
        <h1 class="content__markers__title">${name}</h1>
        <p class="content__markers__description">${description}</p>
    `

  markersList.appendChild(itemDiv)
}

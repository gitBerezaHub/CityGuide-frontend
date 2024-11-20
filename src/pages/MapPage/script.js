const places = [
  {
    xid: 'N0000000001',
    name: 'Фонтан Шайба',
    description: 'Круглый фонтан, светится ночью',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000001',
    latitude: 52.286852,
    longitude: 104.272239
  },
  {
    xid: 'N0000000002',
    name: 'Фонтан на сквере Кирова',
    description: 'Фонтан на сквере Кирова',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000002',
    latitude: 52.28774,
    longitude: 104.28076
  },
  {
    xid: 'N0000000003',
    name: 'Фонтан',
    description: 'Фонтан на сквере им. Охлопкова',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000003',
    latitude: 52.277042,
    longitude: 104.280667
  },
  {
    xid: 'N0000000004',
    name: 'Фонтан у ДС Труд',
    description: '',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000004',
    latitude: 52.277443,
    longitude: 104.284431
  },
  {
    xid: 'N0000000005',
    name: 'Фонтан в ТЦ Модный',
    description: '',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000005',
    latitude: 52.273243,
    longitude: 104.290924
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

  ymaps.ready(() => drawMap('pedestrian'))
}

function drawMap (type) {
  const myMap = new ymaps.Map('map', {
    center: center,
    zoom: 14,
    controls: []
  })
  const pedestrianRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'pedestrian'
    }
  }, {
    boundsAutoApply: true
  })
  const masstransitRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'masstransit'
    }
  }, {
    boundsAutoApply: true
  })
  const autoRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'auto'
    }
  }, {
    boundsAutoApply: true
  })

  if (type === 'pedestrian') myMap.geoObjects.add(pedestrianRoute)
  if (type === 'masstransit') myMap.geoObjects.add(masstransitRoute)
  if (type === 'auto') myMap.geoObjects.add(autoRoute)
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

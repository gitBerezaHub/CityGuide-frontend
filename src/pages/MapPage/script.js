const places = [
  {
    xid: 'N0000000002',
    name: 'Труд',
    description: 'Дворец спорта',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000002',
    latitude: 52.277443,
    longitude: 104.284431
  },
  {
    xid: 'N0000000005',
    name: 'Модный квартал',
    description: 'Торгово-развлекательный комплекс',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000005',
    latitude: 52.273479,
    longitude: 104.290645
  },
  {
    xid: 'N0000000003',
    name: 'Фонтан у ДС Труд',
    description: 'Прямоугольный фонтан, который светится ночью',
    categories: [
      'religion',
      'monasteries',
      'interesting_places'
    ],
    city: 'Иркутск',
    wikiId: 'Q0000003',
    latitude: 52.276975,
    longitude: 104.283472
  }
]

let coords
let names
let center
const markers = []
const isMobile = window.innerWidth < 900
let markersList
let markersWrapper
let pedestrianRoute
let masstransitRoute
let autoRoute
let myMap

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
  myMap = new ymaps.Map('map', {
    center: center,
    zoom: 14,
    controls: []
  })
  pedestrianRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'pedestrian'
    }
  }, {
    boundsAutoApply: true
  })
  masstransitRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'masstransit'
    }
  }, {
    boundsAutoApply: true
  })
  autoRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: coords,
    params: {
      routingMode: 'auto'
    }
  }, {
    boundsAutoApply: true
  })

  myMap.geoObjects.add(pedestrianRoute)
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

const pdRadio = document.getElementById('pd')
const atRadio = document.getElementById('at')
const mtRadio = document.getElementById('mt')
pdRadio.addEventListener('change', () => {
  myMap.geoObjects.remove(autoRoute)
  myMap.geoObjects.remove(masstransitRoute)
  myMap.geoObjects.add(pedestrianRoute)
})
atRadio.addEventListener('change', () => {
  myMap.geoObjects.remove(pedestrianRoute)
  myMap.geoObjects.remove(masstransitRoute)
  myMap.geoObjects.add(autoRoute)
})
mtRadio.addEventListener('change', () => {
  myMap.geoObjects.remove(pedestrianRoute)
  myMap.geoObjects.remove(autoRoute)
  myMap.geoObjects.add(masstransitRoute)
})

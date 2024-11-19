import axios from 'axios'
import { useApiStore } from '@/store/useApiStore'
import { Place } from '@/types/types'

const URL_AI = 'http://127.0.0.1:5045/ai/places/'
const URL_PLACES = 'http://localhost:5008/places/get/batch'
type Mode = 'production' | 'development'
const mode: Mode = 'development'
const devData = [
  'N1361341279',
  'N1779665538'
]

export async function sendText (prompt: string, city: string) {
  if (mode === 'development') {
    const result = await getPlaces(devData)
    saveData(result)
    return result
  }
  const formData = new FormData()
  formData.append('prompt', prompt)
  formData.append('city', city)

  await axios
    .post(`${URL_AI}text`, formData)
    .then(async (response) => {
      const result = await getPlaces(response.data)
      saveData(result)
      return result
    })
    .catch((error) => {
      return error
    })
}

export async function sendPhoto (photo: object, city: string) {
  if (mode === 'development') {
    const result = await getPlaces(devData)
    saveData(result)
    return result
  }
  const formData = new FormData()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  formData.append('image', photo)
  formData.append('city', city)

  await axios
    .post(`${URL_AI}img`, formData)
    .then(async (response) => {
      const result = await getPlaces(response.data)
      saveData(result)
      return result
    })
    .catch((error) => {
      return error
    })
}

export async function getPlaces (IDs: string[]): Promise<Place[]> {
  let places: Place[] = []
  await axios
    .post(URL_PLACES, IDs)
    .then((response) => {
      places = response.data
    })
    .catch((error) => {
      return error
    })
  return places
}

function saveData (result: Place[]) {
  const store = useApiStore()
  const test = [
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

  if (mode === 'development') {
    store.places = test
    // localStorage.setItem('places', JSON.stringify(test))
  } else {
    store.places = result
    // localStorage.setItem('places', JSON.stringify(result))
  }
}

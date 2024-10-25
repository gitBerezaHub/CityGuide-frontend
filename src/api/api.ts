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
  store.places = result
}

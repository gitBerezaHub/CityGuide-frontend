import axios from 'axios'
import { Photo } from '@/types/types'

const URL_AI = 'http://127.0.0.1:5045/ai/places/'
const URL_PLACES = 'http://localhost:5008/places/get/batch'
type Mode = 'production' | 'development'
const mode: Mode = 'development'
const devData = [
  'N1361341279',
  'N1779665538'
]

export function sendText (prompt: string, city: string) {
  if (mode === 'development') {
    return getPlaces(devData)
  }
  const formData = new FormData()
  formData.append('prompt', prompt)
  formData.append('city', city)

  axios
    .post(`${URL_AI}text`, formData)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export function sendPhoto (photo: Photo, city: string) {
  console.log(photo)
  if (mode === 'development') {
    return getPlaces(devData)
  }

  const formData = new FormData()
  formData.append('image', photo)
  formData.append('city', city)

  axios
    .post(`${URL_AI}img`, formData)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export function getPlaces (IDs: string[]) {
  axios
    .post(URL_PLACES, IDs)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

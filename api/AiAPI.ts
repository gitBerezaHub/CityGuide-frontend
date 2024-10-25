import axios from 'axios'

export function sendText (prompt: string, city: string) {
  const formData = new FormData()
  formData.append('prompt', prompt)
  formData.append('city', city)

  axios
    .post('http://127.0.0.1:5045/ai/places/text', formData)
    .then(response => (console.log(response)))
    .catch(error => (console.log(error)))
}

export function sendPhoto (photo: object, city: string) {
  const formData = new FormData()
  formData.append('image', photo)
  formData.append('city', city)

  axios
    .post('http://127.0.0.1:5045/ai/places/img', formData)
    .then(response => (console.log(response)))
    .catch(error => (console.log(error)))
}

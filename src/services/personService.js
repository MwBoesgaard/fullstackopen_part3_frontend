import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletion = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }
const exportedObject = {
  getAll, create, update, deletion
}

export default exportedObject;
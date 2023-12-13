import axios from 'axios'
import { API_ROOT } from '~/utils/constant.js'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/api/v1/boards/${boardId}`)
  return response.data.data
}

export const updateBoardDetailsAPI = async (boardId, body) => {
  const response = await axios.put(`${API_ROOT}/api/v1/boards/${boardId}`, body)
  return response.data.data
}

export const createNewBoardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/api/v1/boards`, data)
  return response.data.data
}

export const createNewColumnAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/api/v1/columns`, data)
  return response.data.data
}

export const createNewCardAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/api/v1/cards`, data)
  return response.data.data
}

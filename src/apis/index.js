import { API_ROOT } from '~/utils/constant.js'
import axiosInstance from '~/apis/axios.util.js'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axiosInstance.get(`${API_ROOT}/api/v1/boards/${boardId}`)
  return getDataResponse(response)
}

const getDataResponse = (response) => response.data.data

export const updateBoardDetailsAPI = async (boardId, body) => {
  const response = await axiosInstance.put(`${API_ROOT}/api/v1/boards/${boardId}`, body)
  return getDataResponse(response)
}

export const updateColumnDetailsAPI = async (columnId, body) => {
  const response = await axiosInstance.put(`${API_ROOT}/api/v1/columns/${columnId}`, body)
  return getDataResponse(response)
}

export const moveCardToDifferentColumnAPI = async (body) => {
  const response = await axiosInstance.put(`${API_ROOT}/api/v1/boards/support/moving-cards`, body)
  return getDataResponse(response)
}

export const createNewBoardAPI = async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/api/v1/boards`, data)
  return getDataResponse(response)
}

export const createNewColumnAPI = async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/api/v1/columns`, data)
  return getDataResponse(response)
}

export const createNewCardAPI = async (data) => {
  const response = await axiosInstance.post(`${API_ROOT}/api/v1/cards`, data)
  return getDataResponse(response)
}

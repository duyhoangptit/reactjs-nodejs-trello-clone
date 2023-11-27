import axios from 'axios'
import { API_ROOT } from '~/utils/constant.js'

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/api/v1/boards/${boardId}`)
  return response.data.data
}

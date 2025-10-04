import { apiGet, apiPost } from './api.js'

export function listComments(ticketId){
  return apiGet(`/api/comments/ticket/${ticketId}`)
}

export function addComment(data){
  return apiPost('/api/comments', data)
}

import { apiGet, apiPost, apiPut, apiDelete } from './api.js'

export function listTickets(){
  return apiGet('/api/tickets')
}

export function createTicket(data){
  return apiPost('/api/tickets', data)
}

export function getTicket(id){
  return apiGet(`/api/tickets/${id}`)
}

export function updateTicket(id, data){
  return apiPut(`/api/tickets/${id}`, data)
}

export function deleteTicket(id){
  return apiDelete(`/api/tickets/${id}`)
}

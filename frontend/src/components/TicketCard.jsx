import { Link } from 'react-router-dom'

export default function TicketCard({ ticket }) {
  const due = ticket.sla_due_at ? new Date(ticket.sla_due_at) : null
  const overdue = due && due.getTime() < Date.now()
  return (
    <Link to={`/tickets/${ticket.id}`} className="block p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{ticket.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded ${ticket.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{ticket.status}</span>
      </div>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 line-clamp-2">{ticket.description}</p>
      <div className="text-xs mt-2 text-gray-500">Priority: {ticket.priority} {due && (<span className={overdue? 'text-red-600 font-medium' : ''}>• SLA: {due.toLocaleString()}</span>)}</div>
    </Link>
  )
}

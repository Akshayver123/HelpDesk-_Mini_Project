import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentBox from '../components/CommentBox.jsx'
import { getTicket, updateTicket } from '../services/tickets.js'
import { listComments, addComment } from '../services/comments.js'

export default function TicketDetail() {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const t = await getTicket(id)
      setTicket(t)
      const c = await listComments(id)
      setComments(c)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [id])

  async function onStatusChange(e){
    const updated = await updateTicket(id, { status: e.target.value })
    setTicket(updated)
  }

  async function onNewComment(text){
    await addComment({ ticket_id: id, content: text })
    const c = await listComments(id)
    setComments(c)
  }

  if (loading) return <div>Loading...</div>
  if (!ticket) return <div>Not found</div>

  return (
    <div className="space-y-6">
      <section className="p-4 border rounded bg-white dark:bg-gray-800 space-y-2">
        <h1 className="text-xl font-semibold">{ticket.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{ticket.description}</p>
        <div className="flex gap-3 items-center">
          <label className="text-sm">Status:</label>
          <select value={ticket.status} onChange={onStatusChange} className="border rounded p-1 bg-white dark:bg-gray-900">
            <option>open</option>
            <option>in_progress</option>
            <option>resolved</option>
            <option>closed</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Priority: {ticket.priority} • SLA: {ticket.sla_due_at && new Date(ticket.sla_due_at).toLocaleString()}</div>
      </section>

      <section className="p-4 border rounded bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-3">Comments</h2>
        <div className="space-y-3 mb-4">
          {comments.map(c => (
            <div key={c.id} className="border rounded p-2 bg-white dark:bg-gray-900">
              <div className="text-xs text-gray-500">{c.user_name || 'User'} • {new Date(c.created_at).toLocaleString()}</div>
              <div>{c.content}</div>
            </div>
          ))}
        </div>
        <CommentBox onSubmit={onNewComment} />
      </section>
    </div>
  )
}

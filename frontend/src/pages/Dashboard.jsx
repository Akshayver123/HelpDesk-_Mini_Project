import { useEffect, useState } from 'react'
import TicketCard from '../components/TicketCard.jsx'
import { listTickets, createTicket } from '../services/tickets.js'

export default function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', slaHours: 48 })

  async function load() {
    setLoading(true)
    try {
      const data = await listTickets()
      setTickets(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function onCreate(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    await createTicket(form)
    setForm({ title: '', description: '', priority: 'medium', slaHours: 48 })
    load()
  }

  return (
    <div className="space-y-6">
      <section className="p-4 border rounded bg-white dark:bg-gray-800">
        <h2 className="font-semibold mb-3">Create Ticket</h2>
        <form onSubmit={onCreate} className="grid gap-2 sm:grid-cols-2">
          <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="Title" className="border rounded p-2 bg-white dark:bg-gray-900" />
          <select value={form.priority} onChange={e=>setForm({...form, priority: e.target.value})} className="border rounded p-2 bg-white dark:bg-gray-900">
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>
          <input type="number" value={form.slaHours} onChange={e=>setForm({...form, slaHours: e.target.value})} placeholder="SLA hours" className="border rounded p-2 bg-white dark:bg-gray-900" />
          <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Description" className="border rounded p-2 sm:col-span-2 bg-white dark:bg-gray-900" />
          <button className="px-3 py-2 bg-blue-600 text-white rounded sm:col-span-2">Create</button>
        </form>
      </section>

      <section>
        <h2 className="font-semibold mb-3">Tickets</h2>
        {loading ? (<div>Loading...</div>) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {tickets.map(t => <TicketCard key={t.id} ticket={t} />)}
          </div>
        )}
      </section>
    </div>
  )
}

import { useState } from 'react'

export default function CommentBox({ onSubmit, loading }) {
  const [text, setText] = useState('')
  return (
    <form onSubmit={(e)=>{e.preventDefault(); if(!text.trim()) return; onSubmit(text).then(()=>setText(''))}} className="space-y-2">
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Add a comment" className="w-full border rounded p-2 h-24 bg-white dark:bg-gray-800" />
      <button disabled={loading} className="px-3 py-1.5 rounded bg-blue-600 text-white disabled:opacity-50">{loading? 'Posting...' : 'Post Comment'}</button>
    </form>
  )
}

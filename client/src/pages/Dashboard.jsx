import React, { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1' },
    { id: 2, title: 'Note 2' }
  ])

  const handleCreateNote = () => {
    toast.success('Create Note functionality coming soon!')
  }

  const handleDeleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
    toast.success('Note deleted successfully!')
  }

  const handleSignOut = () => {
    toast.success('Sign out functionality coming soon!')
  }

  return (
    <div className='flex items-center justify-center'>
    <div className="min-h-screen w-[50%] bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src="/icon.png" alt="" />
          </div>
          <span className="text-lg font-bold text-black">Dashboard</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium hover:text-blue-700"
        >
          Sign Out
        </button>
      </div>

             {/* Main Content */}
       <div className="px-4 py-6 space-y-6 w-full flex flex-col items-center">
                 {/* Welcome Card */}
         <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 w-full max-w-md">
           <h1 className="text-2xl font-bold text-black mb-2 text-center">
             Welcome, Jonas Kahnwald !
           </h1>
           <p className="text-black text-base text-center">
             Email: xxxxxx@xxx.com
           </p>
         </div>

         {/* Create Note Button */}
         <button
           onClick={handleCreateNote}
           className="w-full max-w-md bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
         >
           <Plus className="w-6 h-6" />
           <span>Create Note</span>
         </button>

         {/* Notes Section */}
         <div className="space-y-4 w-full max-w-md">
           <h2 className="text-xl font-bold text-black text-center">Notes</h2>
           
           {/* Notes List */}
           <div className="space-y-3">
             {notes.map((note) => (
               <div
                 key={note.id}
                 className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex justify-between items-center"
               >
                 <span className="text-black font-medium">{note.title}</span>
                 <button
                   onClick={() => handleDeleteNote(note.id)}
                   className="text-black hover:text-red-600 transition-colors duration-200"
                 >
                   <Trash2 className="w-5 h-5" />
                 </button>
               </div>
             ))}
           </div>

                     {/* Empty State */}
           {notes.length === 0 && (
             <div className="bg-white rounded-lg p-8 text-center border border-gray-200 w-full">
               <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
             </div>
           )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard

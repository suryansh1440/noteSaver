import React, { useEffect, useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'
import { useNoteStore } from '../store/useNoteStore'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [newNoteContent, setNewNoteContent] = useState(''); // State for new note input
  const { user, logout, isLogging } = useAuthStore();
  const { notes, addNote, deleteNote, getNotes, isAddingNote, isDeletingNote, isGettingNotes } = useNoteStore();
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, [getNotes]); // Add getNotes to dependency array

  if (!user) {
    navigate('/login');
    return null; // Prevent rendering if not authenticated
  }

  const handleCreateNote = async () => {
    if (!newNoteContent.trim()) {
      toast.error('Note content cannot be empty!');
      return;
    }
    await addNote({ content: newNoteContent });
      setNewNoteContent(''); 
  }

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
  }

  const handleSignOut = () => {
    logout();
    toast.success('Signed out successfully!');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200 w-full max-w-md sm:max-w-xl rounded-t-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/icon.png" alt="" />
          </div>
          <span className="text-lg font-bold text-black">Dashboard</span>
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLogging} // Assuming isLogging from auth store covers logout loading
          className="text-blue-600 font-medium hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLogging ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6 w-full max-w-md sm:max-w-xl bg-white rounded-b-lg shadow-sm">
        {/* Welcome Card */}
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <h1 className="text-2xl font-bold text-black mb-2 text-center">
            Welcome, {user?.name.toUpperCase()}!
          </h1>
          <p className="text-black text-base text-center">
            Email: {user?.email}
          </p>
        </div>

        {/* Create Note Section */}
        <div className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
            rows="3"
            placeholder="Write your new note here..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            disabled={isAddingNote}
          ></textarea>
          <button
            onClick={handleCreateNote}
            disabled={isAddingNote || !newNoteContent.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingNote ? 'Creating Note...' : (
              <>
                <Plus className="w-6 h-6" />
                <span>Create Note</span>
              </>
            )}
          </button>
        </div>

        {/* Notes Section */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <h2 className="text-xl font-bold text-black text-center">Your Notes</h2>
          
          {isGettingNotes ? (
            <div className="text-center text-gray-500">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-200">
              <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="bg-gray-100 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-black font-medium">{note.content}</span>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      disabled={isDeletingNote}
                      className="text-black hover:text-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeletingNote ? <span className="animate-spin">⚙️</span> : <Trash2 className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Created: {new Date(note.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

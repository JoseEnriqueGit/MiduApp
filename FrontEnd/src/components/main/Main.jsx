import React, { useState } from 'react';
// Component
import Title from '../Title';
import { BookMark, Trash } from './UI';

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (noteText.trim().length > 0) {
      setNotes([...notes, noteText]);
      setNoteText('');
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full max-w-screen-sm">
      <form className="flex flex-col gap-4 w-full">
        <Title />

        <textarea
          className="resize-none border rounded p-2"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddNote}
        >
          ADD NOTE
        </button>
        <ul className="flex flex-col gap-2">
          {notes.map((note, index) => (
            <li key={index} className="flex justify-between w-full">
              {note}
              <button className='flex justify-center items-center bg-blue-400 w-12 rounded'>
                <BookMark width={24} />
              </button>
              <button
                className="flex justify-center items-center bg-red-500 w-12 px-2 py-1 rounded"
                type="button"
                onClick={() => handleDeleteNote(index)}
              >
                <Trash width={24} />
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          // onClick={handleAddNote}
        >
          SEE ALL
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="button"
          // onClick={handleAddNote}
        >
          SEE FAVORITE
        </button>
      </form>
    </div>
  );
};

export default Main;

import React from 'react'
import { Note, Tag } from '../types';
import NoteForm from './NoteForm'
type NewNoteProps = {
  onAddNote: (data: Note) => void;
  availableTags: Tag[];
  onAddTag:(data:Tag)=>void
};
export const NewNote = ({ onAddNote, availableTags,onAddTag }: NewNoteProps) => {
  return (
    <>
      <h1 className="m-4 ">NewNote</h1>
      <NoteForm
        onSubmit={onAddNote}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

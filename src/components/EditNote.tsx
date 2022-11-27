import React from 'react'
import useNote from '../hooks/useNote';
import { Note, Tag } from '../types';
import NoteForm from './NoteForm';

type EditNoteProps = {
  onUpdateNote: (id:string,data: Note) => void;
  availableTags: Tag[];
  onAddTag: (data: Tag) => void;
};

export const EditNote = ({ onUpdateNote ,availableTags,onAddTag}: EditNoteProps) => {
  const note = useNote();
  return (
    <>
      <h1 className="m-4 ">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={data=>onUpdateNote(note.id,data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
};

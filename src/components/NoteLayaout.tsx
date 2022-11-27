import { useMemo } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom"
import { Note } from "../types"

type NoteLayaoutProps = {
  notes: Note[]
  
}

export function NoteLayaout({ notes }: NoteLayaoutProps) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id);
 
  
  if (note==null) return <Navigate to={'/'} replace />
  
  return <Outlet context={note}/>;
}
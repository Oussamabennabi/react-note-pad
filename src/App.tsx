import React, { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { EditNote } from "./components/EditNote";
import { NewNote } from "./components/NewNote";
import { NoteLayaout } from "./components/NoteLayaout";
import { Notes } from "./components/Notes";
import { ShowNote } from "./components/ShowNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { LocalStorageNote, Note, Tag } from "./types";




function App(): JSX.Element {
  const [notes, setNotes] = useLocalStorage<LocalStorageNote[]>("NOTES",[]);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  function onAddNote({tags,...data}:Note) {
    setNotes(prev => {
      return [...prev,{...data,tagIds:tags.map(tag=>tag.id)}]
    })
  }
  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }
 function onDeleteNote(id: string) {
   setNotes((prevNotes) => {
     return prevNotes.filter((note) => note.id !== id);
   });
 }

 function onUpdateNote(id: string, { tags, ...data }: Note) {
   setNotes((prevNotes) => {
     return prevNotes.map((note) => {
       if (note.id === id) {
         return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
       } else {
         return note;
       }
     });
   });
 }


  return (
    <Routes>
      <Route
        path="/"
        element={
          <Notes
            availableTags={tags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
            notes={notesWithTags}
          />
        }
      ></Route>
      <Route
        path="/createnote"
        element={
          <NewNote
            onAddTag={onAddTag}
            availableTags={tags}
            onAddNote={onAddNote}
          />
        }
      ></Route>
      <Route path="/:id" element={<NoteLayaout notes={notesWithTags} />}>
        <Route index element={<ShowNote onDelete={onDeleteNote} />} />
        <Route
          path="edit"
          element={
            <EditNote
              onAddTag={onAddTag}
              availableTags={tags}
              onUpdateNote={onUpdateNote}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} replace />}></Route>
    </Routes>
  );
}

export default App;
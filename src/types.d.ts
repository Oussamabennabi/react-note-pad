
export type Tag = {
  id: string
  label:string
};

export type Note = {
  id: string;
  title: string;
  markdown: string;
  tags: Tag[];
};
export type LocalStorageNote = {
  id: string;
  title: string;
  markdown: string;
  tagIds: string[];
};
// export type RawNote = {
//   id: string;
// } & RawNoteData;

// export type RawNoteData = {
//   title: string;
//   markdown: string;
//   tagIds: string[];
// };

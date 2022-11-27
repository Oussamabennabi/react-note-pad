import { useOutletContext } from "react-router-dom"
import { Note } from "../types"

const useNote = () => {
  return useOutletContext<Note>()
}

export default useNote
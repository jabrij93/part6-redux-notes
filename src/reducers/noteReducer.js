import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0)
)

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }

      console.log("NOW CURRENT",current(state))

      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    },
  },
})

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer

// export default noteReducer

// const noteReducer = (state = initialState, action) => {
//   console.log('ACTION: ', action)

//     switch(action.type) {
//       case 'NEW_NOTE':
//         return [...state, action.payload]
//       case 'TOGGLE_IMPORTANCE': {
//         const id = action.payload.id
//         const noteToChange = state.find(n => n.id === id)
//         const changedNote = { 
//           ...noteToChange, 
//           important: !noteToChange.important 
//         }
//         return state.map(note =>
//           note.id !== id ? note : changedNote 
//         )
//        }
//       default:
//         return state
//     }
// }

// export const createNote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId()
//     }
//   }
// }

// export const toggleImportanceOf = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: { id }
//   }
// }
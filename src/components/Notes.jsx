import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()

  const selected = useSelector(state => {
    console.log('Redux state:', state)
    return state
  })

  const notes = useSelector(({ filter, notes }) => {
    console.log('Selector - notes:', notes)  // add this
    console.log('Selector - filter:', filter)

    if (!Array.isArray(notes)) {
      console.error('notes is NOT an array:', notes)
      return []
    }

    if ( filter === 'ALL' ) {
        return notes
    }
    return filter  === 'IMPORTANT' 
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes
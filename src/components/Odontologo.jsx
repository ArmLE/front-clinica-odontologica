import { useState } from 'react'

export function Odontologo ({ id, name, lastname, license, onDelete, onEdit }) {
  const [edit, setEdit] = useState(false)
  return (
    <article>
      <div>{id}</div>
      <div className='odo-matri'>
        {edit ? <input type='text' placeholder='matricula' /> : license}
      </div>
      <div className='odo-name'>
        {edit ? <input type='text' placeholder='nombre' /> : name}
      </div>
      <div className='odo-lastname'>
        {edit ? <input type='text' placeholder='apellido' /> : lastname}
      </div>
      <button onClick={() => onDelete(id)}>Eliminar</button>
      <button onClick={() => {
        onEdit(id)
        setEdit(true)
      }}
      >Editar
      </button>
    </article>
  )
}

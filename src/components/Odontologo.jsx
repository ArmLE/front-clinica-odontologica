import { useState } from 'react'

export function Odontologo ({ id, name, lastname, license, onDelete, onEdit }) {
  const [edit, setEdit] = useState(false)
  console.log(edit)
  return (
    <article>
      <div>{id}</div>
      <div className='odo-matri'>
        {edit ? <input id={`${id}-matricula`} type='text' placeholder='matricula' /> : license}
      </div>
      <div className='odo-name'>
        {edit ? <input id={`${id}-nombre`} type='text' placeholder='nombre' /> : name}
      </div>
      <div className='odo-lastname'>
        {edit ? <input id={`${id}-apellido`} type='text' placeholder='apellido' /> : lastname}
      </div>
      <button onClick={() => onDelete(id)}>Eliminar</button>
      <button onClick={() => {
        if (edit) {
          onEdit(id)
          setEdit(false)
        } else {
          setEdit(true)
        }
      }}
      >{edit ? 'Actualizar' : 'Editar'}
      </button>
    </article>
  )
}

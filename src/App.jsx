import { useEffect, useState } from 'react'
import './App.css'
import { Odontologo } from './components/Odontologo'
export function App () {
  const [odontologo, setOdontologo] = useState([])
  const [createOdo, setCreateOdo] = useState(null)
  useEffect(() => {
    fetch('http://localhost:8080/odontologo')
      .then(res => res.json())
      .then(data => setOdontologo(data))
  }, [])

  console.log(odontologo)

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/odontologo/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setOdontologo(odontologo.filter(odontologo => odontologo.id !== id))
        }
      })
  }
  const handleEdit = (id) => {
    //
  }
  const handleCreate = () => {
    switch (createOdo) {
      case null: setCreateOdo(true)
        break
      case true: setCreateOdo(null)
        break
    }
  }
  return (
    <main>
      {
        createOdo !== null && (
          <section className='createOdo'>
            <div>
              <label htmlFor='matricula'>Nro Matricula</label>
              <input type='text' name='matricula' id='matricula' />
            </div>
            <div>
              <label htmlFor='nombre'>Nombre</label>
              <input type='text' name='nombre' id='nombre' />
            </div>
            <div>
              <label htmlFor='apellido'>Apellido</label>
              <input type='text' name='apellido' id='apellido' />
            </div>
          </section>
        )
      }
      <button onClick={handleCreate}> {createOdo ? 'Guardar ' : 'Crear '} Odontologo</button>
      {
        odontologo.map(
          ({ id, nroMatricula, nombre, apellido }) => (
            <Odontologo
              key={id}
              id={id}
              name={nombre}
              lastname={apellido}
              license={nroMatricula}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )
        )
      }
    </main>
    //<Odontologo odontologo={odontologo} />
  )
}

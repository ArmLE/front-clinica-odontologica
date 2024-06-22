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
  const fetchOdontologos = () => {
    fetch('http://localhost:8080/odontologo')
      .then(res => res.json())
      .then(data => setOdontologo(data))
  }
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
    const changeOdontologo = {
      id: Number(id),
      nroMatricula: document.getElementById(`${id}-matricula`).value,
      nombre: document.getElementById(`${id}-nombre`).value,
      apellido: document.getElementById(`${id}-apellido`).value
    }
    fetch('http://localhost:8080/odontologo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(changeOdontologo)
    }).then(res => {
      if (res.ok) {
        fetchOdontologos()
      }
    })
  }
  const handleCreate = (e) => {
    e.preventDefault()
    const newOdontologo = {
      nroMatricula: document.getElementById('matricula').value,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value
    }
    fetch('http://localhost:8080/odontologo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOdontologo)
    }).then(res => res.json())
      .then(data => {
        setOdontologo([...odontologo, data])
        setCreateOdo(null)
      })
  }
  const availableInput = (e) => {
    switch (createOdo) {
      case null: setCreateOdo(true)
        break
      case true: handleCreate(e)
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
      <button onClick={availableInput}> {createOdo ? 'Guardar ' : 'Crear '} Odontologo</button>
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

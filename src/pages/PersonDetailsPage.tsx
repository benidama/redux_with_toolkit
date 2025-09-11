
import type { RootState } from '../app/store/todoStore';

// import type { RootState } from '@reduxjs/toolkit/query'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, removePerson } from '../app/feature/todoslice'

const PersonDetailsPage = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState<number>(0)
    const [sex, setSex] = useState("")
     
    const distpatch = useDispatch()
    const persons = useSelector((state:RootState) => state.person.persons)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(name.trim() && age> 18 && sex.trim()){
            distpatch(addPerson({name,age,sex}));
            setName(""),
            setAge(0),
            setSex("")
        }
    }
    
  return (
    <div>
        <h1 className='text-center text-6xl m-5'>Person details listing</h1>
        <p className='text-center text-2xl text-gray-500 mb-10'>
            Add your details here and see them listed below
        </p>
        <form action="#" onSubmit={handleSubmit} 
        className='flex flex-col justify-center items-center shadow-md shadow-gray-300 space-y-5'>
            <div>
                
                <label htmlFor="name" className='text-2xl text-gray-900 pr-2'>Add your name:</label>
                <input type="text"  value={name} required onChange={e => setName(e.target.value)} className='py-2 px-5 border-2 border-gray-200'/>
                
            </div>
            <div>
                <label htmlFor="age" className='text-2xl text-gray-900 pr-2'>Add your age:</label>
            <input type="number"   value={age} required onChange={e => setAge(Number(e.target.value))} className='py-2 px-5 border-2 border-gray-200'/>
            </div>
            <div>
                <label htmlFor="sex" className='text-2xl text-gray-900 pr-2'>Add your sex:</label>
                <input type="text"  value={sex} required onChange={e => setSex(e.target.value)} className='py-2 px-5 border-2 border-gray-200'/>
            </div>
            <button className='text-white bg-blue-700 text-center px-5 m-5 py-2 rounded-md'>Add person</button>
        </form>

        {/* Listing my expenses */}
      
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-3 space-y-3 mt-10'>
       {persons.map((man) => (
    <div
      key={man.id}
      className="flex flex-col justify-center items-start px-5 py-5 gap-5 shadow-md shadow-gray-500"
    >
        <div>
            <h1 className='text-3xl'>{man.name}</h1>
      <p>{man.age}</p>
      <p>{man.sex}</p>
        </div>
      <button 
      onClick={() =>{
        distpatch(removePerson(man.id))
      }}
      className="text-white bg-red-600 p-2 rounded-md">
        Remove person
        </button>
    </div>
  ))}
</div>

    </div>
  )
}

export default PersonDetailsPage
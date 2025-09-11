import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface Person {
    id: number,
    name :string,
    age: number,
    sex: string
}
// Define the state structure for persons
interface Persontypes  {persons:Person[]}

//initial state
const initialState: Persontypes = {
    persons:[]
} 
// Create the person slice

const personSlice = createSlice({
    name: "peson",
    initialState,
    reducers: {
        addPerson: (
            state,
            action: PayloadAction<{name:string, age:number, sex:string }>
        ) => {
            // Add a new expense with an auto-generated ID
            state.persons.push({id: Date.now(), ...action.payload})
        },

        removePerson: (state, action: PayloadAction<number>) =>{
             // Remove an expense by ID
             state.persons = state.persons.filter(persn => persn.id !== action.payload)
        }
    },  
})

export const {addPerson, removePerson} = personSlice.actions
export default personSlice.reducer
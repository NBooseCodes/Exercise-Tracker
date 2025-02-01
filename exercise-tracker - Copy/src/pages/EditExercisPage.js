import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export const EditExercisePage = ({exerciseToEdit, setExerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const navigate = useNavigate();
    console.log('exerciseToEdit PAGE')
    console.log(exerciseToEdit)
    
    const editExercise = async() => {
        console.log(name, reps, weight, unit, date)
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise), 
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.status === 201){
            alert("Successfully edited exercies!");
        } else{
            alert(`Could not update exercise. Status code = ${response.status}`);
        }
        navigate("/");
    }

    return (
        <div>
            <h1>Edit Movie</h1>
            <input
                type="text"
                value={name}
                onChange={e=>setName(e.target.value)}/>
            <input
                type="text"
                value={reps}
                onChange={e=>setReps(e.target.value)}/>
            <input
                type="text"
                value={weight}
                onChange={e=>setWeight(e.target.value)}/>
            
            <select name="unit" onChange={e=>{setUnit(e.target.value)}}>
                <option value="select">Select a unit</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            
            </select>

            <input
                type="text"
                value={date}
                onChange={e=>setDate(e.target.value)}/>
            <button
                onClick={editExercise}/>
        </div>
    )
};
export default EditExercisePage
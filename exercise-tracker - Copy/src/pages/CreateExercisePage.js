import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


export const CreateExercisePage = () => {
    // Set up use states and ways to alter them/set them for each data point
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    // Initialize navigate var with useNavigate to send user back to home
    const navigate = useNavigate();


    // Function to add an exercise to our list
    const addExercise = async() =>{
        // Object that holds values for each trait of an exercise
        const newExercise = {name, reps, weight, unit, date};
        
        // Fetch request stored in a variable that asks to post/create a new exercise
        const response = await fetch('/exercises', {
                method: 'POST',
                body: JSON.stringify(newExercise),
                headers: {'Content-Type': 'application/json'}
            });
            // If it works, let the user know
            if (response.status===201){
                alert("Successfully saved exercise")
                // And if it doesn't work, let the user know
            }   else {
                    alert(`Failed to add exercise, status code = ${response.status}`);

            }
            // Send user back to home
            navigate("/");
    }
    // This is our html-type code
    return (
        <div>
        
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name of exercise here"
                value={name}
                onChange={e => setName(e.target.value)}/>
            <input
                type="text"
                value={reps}
                placeholder="Enter number of reps here"
                onChange={e => setReps(e.target.value)}/>
            <input
                type="text"
                value={weight}
                placeholder="Enter weight used here"
                onChange={e => setWeight(e.target.value)} />
            <select name="unit" onChange={e=>{setUnit(e.target.value)}}>
                <option value="select">Select a unit</option>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            
            </select>
            <input
                type="text"
                value={date}
                placeholder="Enter the date completed here"
                onChange={e => setDate(e.target.value)}/>
            <button
                onClick={addExercise}/>

        </div>

    )
}

export default CreateExercisePage
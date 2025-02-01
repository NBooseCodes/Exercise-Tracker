import React, {useState, useEffect, Link} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ExerciseList from "../components/ExerciseTable";
import { Route } from "react-router-dom";


// Main home page function that handles the appearance of the home page wrt what data is presented
function HomePage({exerciseToEdit, setExerciseToEdit}){

    // Initialize exercises and setExercises useState variables
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()
    /* Nested function that loads up exercises and uses them to alter useState for exercises
    Gets this from our rest-api get requests */

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    /* Nested function to handle when user wants to delete an exercise from the list*/ 
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete movie with id= ${_id}, status code = ${response.status}`);
        }
    }
    // 
    const onEdit = async exercise => {
        
        setExerciseToEdit(exercise);
        navigate("/edit");
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <div>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </div>
    )
}
export default HomePage
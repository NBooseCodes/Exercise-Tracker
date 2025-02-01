import React, {useEffect, useState} from "react";
import Exercise from "./ExerciseRow";


const ExerciseList= ({exercises, onDelete, onEdit}) => {
    /* Sets up headers for the table columns and also maps table data (exercise data) into each row in the table
        using the data retrieved from ExerciseRow component*/

        return (
            <table id="exercises">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Units</th>
                        <th>Date</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map((exercise, i)=> <Exercise exercise={exercise}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        key={i}/>)}
                </tbody>
            </table>
        )
}
export default ExerciseList
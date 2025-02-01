import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express, { Router } from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.post('/exercises', async (req, res) => {
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;
    let isValid = true;
    
    
    if (name === '' || name === null){
        isValid = false;
    };

    if (isNaN(parseInt(reps)) || parseInt(reps) < 0){
        
        isValid = false;
    };

    if (isNaN(parseInt(weight)) || weight <= 0){
        isValid = false;
    };

    if (unit !== 'kgs' && unit !== 'lbs'){  
        isValid = false;
    };
    if (!exercises.isDateValid(date)){
        isValid = false;
    };
    
    if (isValid === true){
        exercises.createExercise(name, reps, weight, unit, date)
            .then(exercise=> {
                res.setHeader('Content-type', 'application/json')
                res.status(201).json({exercise})
            })
            .catch(error => {
                if (isValid === false){
                    res.setHeader('Content-type', 'application/json');
                    res.status(400).json({Error: "Invalid Request..."});
                } else {
                    res.setHeader('Content-type', 'application/json')
                    
                    res.status(400).json({Error: 'Request failed'})
            }
            
        })
    } else {
        
        res.setHeader('Content-type', 'application/json');
        res.status(400).json({Error: "Invalid Request"});
    }
});

// Get all entries
app.get('/exercises', async(req, res) =>
{
    const allDocs = await exercises.findAllExercises({});
    res.setHeader('Content-type', 'application/json')
    res.status(200).json(allDocs);
});

// Get specific entry
app.get('/exercises/:_id', async(req, res) =>{
    
    const exerciseId = req.params._id;
    await exercises.findById(exerciseId)
            .then(exercise => {
            
            if (exercise === null) {
                res.status(404).json({Error: "Not found"});
            } else {
                res.status(200).json(exercise);
            }
        })
        .catch(error => {
            res.status(404).json({Error: "Not found"});
        })
})
// Updates/edits document
app.put('/exercises/:_id', async(req, res) =>{
    
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;
    const _id = req.params._id;
    let isValid = true;
    
    
    if (name === '' || name === null){
        isValid = false;
    };

    if (isNaN(parseInt(reps)) || parseInt(reps) < 0){
        
        isValid = false;
    };

    if (isNaN(parseInt(weight)) || weight <= 0){
        isValid = false;
    };

    if (unit !== 'kgs' && unit !== 'lbs'){  
        isValid = false;
    };
    if (!exercises.isDateValid(date)){
        isValid = false;
    };


    const docPresent = await exercises.findById(_id)
    

    if (docPresent === null){
        res.setHeader('Content-type', 'application/json');
        res.status(404).json({Error: "Not found"});
        return
    }

    const update = {name: name, reps: reps, weight: weight, unit: unit, date: date};
    if (isValid === true){
        await exercises.updateById(_id, update)
        .then(exercise => {
            res.status(201).json(exercise);
        })
    } else {
        res.status(400).json({Error: "Invalid request"});
    };
})






app.delete('/exercises/:_id', async (req, res) => {
    const _id = req.params._id;
    const response = await exercises.deleteById(_id);
    console.log(response);
    console.log(response.deletedCount);
    const deletedCount = response.deletedCount;
    if (deletedCount !== 1) {
        console.log('MISSS')
        console.log(deletedCount)
        console.log(typeof deletedCount);
        res.setHeader('Content-type', 'application/json');
        res.status(404).json({Error: "Not found"});
    } else {
        res.status(204).send();
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


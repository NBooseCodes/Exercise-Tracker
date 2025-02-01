import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
 
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},
    date: {type: String, required: true}},
    {collection: 'exercises'}
);

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exercisesSchema);

const createExercise = async(name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}
const findAllExercises = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

const findById = async(filter) => {

    const document = await Exercise.findOne({_id: filter});
    
    return document
    //return document.exec();
}

const updateById = async(filter, update) => {
    const result = await Exercise.findByIdAndUpdate(filter, update);
    return result;
}

const deleteById = async(_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    console.log(result);
    return result;
}
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

export {createExercise, findAllExercises, findById, updateById, isDateValid, deleteById}
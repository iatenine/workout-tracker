const router = require("express").Router();
const db = require("../models");

// API Routes (prefixed with /api/)

router.get("/workouts", async (req, res) => {
  try {
    // Get all workouts in database and return as JSON
    const workouts = await db.Workout.find({});
    res.json(workouts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/workouts", async (req, res) => {
  try {
    // Create a new workout in the database
    const newWorkout = await db.Workout.create(req.body);
    res.json(newWorkout);
  } catch (err) {
    console.log(err);
  }
});

router.put("/workouts/:id", async (req, res) => {
  // Update an existing workout in the database
  try {
    const updatedWorkout = await db.Workout.findByIdAndUpdate(
      req.params.id,
      { $push: { exercises: req.body.data } },
      { new: true } // Return the updated workout so it can be sent back to the client
    );
    res.json(updatedWorkout);
  } catch (err) {
    console.log(err);
  }
});

router.get("/workouts/range", async (req, res) => {
  try {
    const workoutAggregation = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);
    return res.json(workoutAggregation);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

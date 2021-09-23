const router = require("express").Router();
const path = require("path");
const db = require("../models");

// API Routes (prefixed with /api/)

router.get("/workouts", async (req, res) => {
  // Get all workouts in the database
  console.log(mongoose.models.Workout);
  try {
    const workouts = await mongoose.models.Workout.find({});
    console.log(workouts);
    // Send the workouts as JSON
    res.json(workouts);
  } catch (err) {
    console.log(err);
  }
});

router.get("/workouts/range", async (req, res) => {
  try {
    const workoutAggregation = await db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$workouts.duration" },
          totalWeight: { $sum: "$exercises.weight" },
          totalSets: { $sum: "$exercises.sets" },
          totalReps: { $sum: "$exercises.reps" },
          totalDistance: { $sum: "$exercises.distance" },
        },
      },
    ]);
    console.log(workoutAggregation);
    return res.json(workoutAggregation);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

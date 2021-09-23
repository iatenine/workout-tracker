const router = require("express").Router();
const db = require("../models");

// API Routes (prefixed with /api/)

router.get("/workouts", async (req, res) => {
  try {
    // Get all workouts in database and return as JSON
    const workouts = await db.Workouts.find({});
    res.json(workouts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/workouts", async (req, res) => {
  //What is this supposed to do?!?
  console.log("workout POST ", req.body);
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
    console.log(workoutAggregation);
    return res.json(workoutAggregation);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;

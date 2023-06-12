const express = require("express");
const router = express.Router();
const Movie = require("../models/Movies");

router.post("/create", async (req, res) => {
  const { title, description, genre, casts, imdbid, imdbrating } = req.body;

  if (!title || !description || !genre || !casts || !imdbid || !imdbrating) {
    return res.status(422).json("Please fill all the required fields");
  }

  try {
    const existingMovie = await Movie.findOne({ title: title });
    console.log(existingMovie);

    if (existingMovie) {
      return res.status(422).json("This movie is already present");
    } else {
      const addMovie = new Movie({
        title,
        description,
        genre,
        casts,
        imdbid,
        imdbrating,
      });

      await addMovie.save();
      console.log(addMovie);
      return res.status(201).json(addMovie);
    }
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.get("/view", async (req, res) => {
  try {
    const movieView = await Movie.find();
    console.log(movieView);
    return res.status(200).json(movieView);
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.get("/view/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const movieIndividual = await Movie.findByTitle(title);
    console.log(movieIndividual);
    if (movieIndividual) {
      return res.status(200).json(movieIndividual);
    } else {
      return res.status(404).json("Movie not found");
    }
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.patch("/updatemovie/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const updatedMovie = await Movie.findByTitleAndUpdate(title, req.body, {
      new: true,
    });
    console.log(updatedMovie);
    if (updatedMovie) {
      return res.status(200).json(updatedMovie);
    } else {
      return res.status(404).json("Movie not found");
    }
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.delete("/deletemovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);
    console.log(deleteMovie);
    if (deleteMovie) {
      return res.status(200).json(deleteMovie);
    } else {
      return res.status(404).json("Movie not found");
    }
  } catch (error) {
    return res.status(422).json(error);
  }
});

module.exports = router;

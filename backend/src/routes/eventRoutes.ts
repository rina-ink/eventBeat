import express from "express";

import {
    getAllEvents,
    getOneEvent,
    createEvent,
    deleteEvent,
} from "../controllers/eventController.ts";

const api = express.Router();

api.route("/")
    .get(getAllEvents)
    .post(createEvent);

api.route("/:id")
    .get(getOneEvent)
    .delete(deleteEvent);

export default api;
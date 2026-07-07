import type { Request, Response } from "express";
import Event from "../models/Event.ts";

export const getAllEvents = async (
    req: Request,
    res: Response
) => {
    try {
        const events = await Event.find();
        
        res.status(200).json({
            results: events,
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getOneEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                msg: "Event not found",
            });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const event = await Event.create(req.body);
        
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteEvent = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;
        
        const event = await Event.findByIdAndDelete(id);
        
        if (!event) {
            return res.status(404).json({
                msg: "Event not found",
            });
    }
    
    res.status(200).json({
        msg: "Event deleted",
    });
    } catch (error) {
        res.status(500).json(error);
    }
};
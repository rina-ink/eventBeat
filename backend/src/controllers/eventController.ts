import type { Request, Response } from "express";
import Event from "../models/Event.ts";   // imports Mongoose Event model

export const getAllEvents = async (
    req: Request,
    res: Response
) => {
    try {
        const events = await Event.find();
        
        res.status(200).json({
            results: events,   // controller sends the answer back to the client
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
        const { id } = req.params;   // req.params contains dynamic pieces of the URL

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
        const event = await Event.create(req.body);   //   req.body contains the JSON data sent by the frontend
        
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
        const { id } = req.params;   //   uses object destructuring
        
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

/* This file is a controller of the events.
Its job is not to  define what an event looks like. That happens in the model.
Its job is not to decide which URL calls which function. That happens in the router.
Its job is to stay in the middle and say:
"A request has arrived. I will understand what it wants, communicate with the database, and send an appropriate response."

| Function     | HTTP Method |
|--------------|-------------|
| getAllEvents | GET (read)  | 
| createEvent  | POST        | 

CRUD

Express gives the controller two objects: res & req

Request contains info coming from the client: (URL parameters, request body, query parameters, headers, authentication information).
Request describes the object coming into the server.
It tells TypeScript that req may contain things such as: req.params, req.body, req.query, req.headers.

Response: (URL parameters, request body, query parameters, headers, authentication information).
Response describes the object the server uses to send something back to the client.
It tells TypeScript that res has Express methods such as: res.status(), res.json(), res.send(), res.redirect()

Express provides the request and response objects to the controller whenever an HTTP request arrives.

Imagine TypeScript as an editor checking a theatre script.
req is an Express request.
res is an Express response.
Those notes help everyone prepare correctly, but they are removed before the actual performance. 
There is no Request or Response type in the final JavaScript because JavaScript does not use TypeScript types.

The Event model is the gateway to the events collection in MongoDB.

- (when sth is exported, another file can import it)

.

The function async communicates with the database. Database operations take time, MongoDB may be on another server, another machine, or another continent.
JavaScript therefore does not receive the answer instantly.

try block means:
"Attempt this operation. It may succeed, but it may also fail."
Possible reasons may be: MongoDB is unavailable, the network connection breaks, the query is invalid, the database credentials are wrong, the server has an internal problem.

The try...catch structure prevents the app from crashing unexpectedly.

find() returns a promise because the database answer arrives asynchronously.

await means:
"Pause this function here until MongoDB finishes answering."
Not pause the whole Node server—only this execution of the function.
Other requests can still be processed.

The result is stored in: const events

HTTP status code 200 is the standard success response.

.json(...) converts the JavaScript object into JSON and sends it. 

return res.status(404).json({
    msg: "Event not found",
});   -  The return is important. Without it, JavaScript could continue and try to send another response later.

Event.create(req.body)   -  creates a new Mongoose document, applies the schema, runs schema validation, sends an insert operation to MongoDB, returns the saved document.
Mongoose should reject the operation, when it differs from the Schema.

The controller decides: "What should happen when the request arrives?"

.

In getOneEvent
use:
req.params.id - because the identity of the event comes from the URL

In createEvent
use:
req.body
because the new event data comes from the request body

In deleteEvent
req.params.id
because the event to delete is identified in the URL

req.params → information inside the URL path
req.query  → filters and options after ?
req.body   → data sent inside the request
req.headers → metadata, tokens, content type

Why all functions are asynchronous?
Every function contains database operations:

Event.find()
Event.findById()
Event.create()
Event.findByIdAndDelete() 

These do not complete instantly.

use:
async

and:
await

A metaphor is ordering coffee.
Without await, you place the order and immediately walk away expecting the coffee to already be in your hand.
With await, you say: "I will continue this function when the coffee is ready."
Meanwhile, the café can still serve other customers.
Node.js does not freeze the entire server.

A controller translates between two worlds.
It turns intention into operation—and then turns the database result into a clear HTTP response.

*/
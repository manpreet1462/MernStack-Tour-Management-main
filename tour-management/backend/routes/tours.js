import express from 'express'
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js'   
import {verifyAdmin} from '../utils/verifyToken.js'
const router=express.Router();
//create a new tour
router.post('/',verifyAdmin ,createTour);
//update a tour
router.put('/:id',verifyAdmin, updateTour);
//delete a tour
router.delete('/:id',verifyAdmin, deleteTour);
//get a single tour
router.get('/:id',getSingleTour);
//get all tours detail
router.get('/',getAllTour);

//get tour by search
router.get('/search/getTourBySearch',getTourBySearch);
//get festured tour
router.get('/search/getFeaturedTours',getFeaturedTour);
//get tour count
router.get('/search/getTourCount',getTourCount);


export default router;
import Booking from "../models/Booking.js"

//create new booking
export const createBooking=async(req,res)=>{
    const newBooking=new Booking(req.body)
    try {
        const savedBooking=await newBooking.save();
        res.status(200).json({success:true,message:'Your tour is booked',data:savedBooking})
    } catch (error) {
        res.status(500).json({success:false,message:'Internal server error'})
        
    }
};


//get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id; // Corrected parameter extraction
    try {
      const book = await Booking.findById(id); // Corrected method syntax
      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Successful",
        data: book,
      });
    } catch (err) {
      res.status(500).json({success: false,message: "Not found",
    error: err.message, // Helps in debugging
      });
    }
  };
  
//get all booking
export const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message, // Helps in debugging
    });
  }
};

import Room from "../models/room";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// get all room => /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {
  const rooms = await Room.find();

  res.status(200).json({
    sucess: true,
    count: rooms.length,
    rooms,
  });
});

// create new room => /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(200).json({
    success: true,
    room,
  });
});
// get room details => /api/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("room not found with this ID", 404));
  }
  res.status(200).json({
    sucess: true,
    room,
  });
});

// update a room details
const updateRoom = catchAsyncErrors(async (req, res, next) => {
  let room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("room not found with this ID", 404));
  }

  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    sucess: true,
    room,
  });
});

// delete a room
const deleteRoom = catchAsyncErrors(async (req, res) => {
  const room = await Room.findById(req.query.id);

  if (!room) {
    return next(new ErrorHandler("room not found with this ID", 404));
  }

  await room.remove();
  res.status(200).json({
    sucess: true,
    message: "Room removed successfully",
  });
});

export { allRooms, newRoom, getSingleRoom, updateRoom, deleteRoom };

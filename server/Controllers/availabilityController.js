const Availability = require('../Model/Availability');

exports.setAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime, isRecurring, dayOfWeek } = req.body;
    const newAvailability = await Availability.create({
      user: req.user._id,
      date,
      startTime,
      endTime,
      isRecurring,
      dayOfWeek
    });

    res.status(201).json({
      status: 'success',
      data: {
        availability: newAvailability
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const availabilities = await Availability.find({ user: req.user._id });
    res.status(200).json({
      status: 'success',
      data: {
        availabilities
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!availability) {
      return res.status(404).json({
        status: 'fail',
        message: 'No availability found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        availability
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!availability) {
      return res.status(404).json({
        status: 'fail',
        message: 'No availability found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
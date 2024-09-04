const Session = require('../Model/Session');
const User = require('../Model/user');

exports.createSession = async (req, res) => {
  try {
    const { participants, startTime, endTime, title, description } = req.body;
    const newSession = await Session.create({
      host: req.user._id,
      participants,
      startTime,
      endTime,
      title,
      description
    });

    res.status(201).json({
      status: 'success',
      data: {
        session: newSession
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [
        { host: req.user._id },
        { participants: req.user._id }
      ]
    }).populate('host participants', 'username email');

    res.status(200).json({
      status: 'success',
      data: {
        sessions
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, host: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(404).json({
        status: 'fail',
        message: 'No session found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        session
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({ _id: req.params.id, host: req.user._id });

    if (!session) {
      return res.status(404).json({
        status: 'fail',
        message: 'No session found with that ID'
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
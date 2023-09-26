const Todo = require("../model/todo.model");

const bcrypt = require("bcryptjs/dist/bcrypt");

const index = async (req, res) => {
  try {
    const userid = req.user.id;
    const todos = await Todo.query().where('user_id', userid);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: todos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const userid = req.user.id;

    const todo = await Todo.query().insert({
      user_id: userid,
      task: req.body.task,
      checked: 0,
      group_id: req.body.group_id,
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const todo = await Todo.query()
      .findById(req.params.id);

      const newChecked = todo.checked === 0 ? 1 : 0;

      await todo.$query().patch({
        checked: newChecked,
      });

      res.status(200).json({
        status: 200,
        message: "OK",
        data: todo,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const todo = await Todo.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK",
      data: todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  update,
  destroy,
};

const AuthRouter = require("./auth");
const UserRouter = require("./user");
const TodoRouter = require("./todo");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, TodoRouter);
};

module.exports = routes;

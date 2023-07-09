"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.Client = exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("../models/user");
const client_1 = require("../models/client");
const todo_1 = require("../models/todo");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let database = process.env.DB_NAME;
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: `./${database}.db`,
});
exports.sequelize = sequelize;
const User = user_1.UserModel.initialize(sequelize);
exports.User = User;
const Client = client_1.ClientModel.initialize(sequelize);
exports.Client = Client;
const Todo = todo_1.TodoModel.initialize(sequelize);
exports.Todo = Todo;
todo_1.TodoModel.associate({ User: user_1.UserModel, Client: client_1.ClientModel });
client_1.ClientModel.associate({ Todo: todo_1.TodoModel });
user_1.UserModel.associate({ Todo: todo_1.TodoModel });
sequelize.sync();

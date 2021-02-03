"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_connection_service_1 = require("./services/database-connection.service");
const users_collection_database_1 = require("./database/users-collection.database");
const entry_middleware_1 = require("./middlewares/entry.middleware");
const auth_user_middleware_1 = require("./middlewares/auth-user.middleware");
const language_middleware_1 = require("./middlewares/language.middleware");
const controller_middleware_1 = require("./middlewares/controller.middleware");
const avatars_middleware_1 = require("./middlewares/avatars.middleware");
const active_space_middleware_1 = require("./middlewares/active-space.middleware");
const auth_router_1 = require("./routers/auth.router");
const users_router_1 = require("./routers/users.router");
const avatars_router_1 = require("./routers/avatars.router");
const spaces_router_1 = require("./routers/spaces.router");
const pages_router_1 = require("./routers/pages.router");
const app_1 = require("./app");
const user_files_service_1 = require("./services/user-files.service");
const constants_1 = require("./constants");
dotenv_1.default.config();
database_connection_service_1.DatabaseConnectionService.init().connect()
    .then(() => {
    users_collection_database_1.UsersCollectionDatabase.create();
})
    .then(() => {
    user_files_service_1.UserFilesService.init();
})
    .then(() => {
    const appOptions = {
        port: process.env.PORT || constants_1.DEFAULT_PORT,
        routers: [
            new auth_router_1.AuthRouter(),
            new users_router_1.UsersRouter(),
            new avatars_router_1.AvatarsRouter(),
            new spaces_router_1.SpacesRouter(),
            new pages_router_1.PagesRouter(),
        ],
        middlewares: [
            body_parser_1.default.json(),
        ],
        appMiddlewares: [
            new entry_middleware_1.EntryMiddleware(),
            new auth_user_middleware_1.AuthUserMiddleware(),
            new avatars_middleware_1.AvatarsMiddleware(),
            new controller_middleware_1.ControllerMiddleware(),
            new active_space_middleware_1.ActiveSpaceMiddleware(),
            new language_middleware_1.LanguageMiddleware(),
        ],
    };
    app_1.App.init(appOptions).listen();
})
    .catch((error) => {
    console.log(error);
});

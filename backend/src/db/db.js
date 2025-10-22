"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
var pool = new pg_1.Pool({
    connectionString: process.env.DB_URL,
});
exports.default = pool;

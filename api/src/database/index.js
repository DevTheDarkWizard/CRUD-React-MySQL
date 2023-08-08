import mysql from "mysql";
import config from "../config/database.json" assert { type: "json" };

export const database = mysql.createConnection(config);
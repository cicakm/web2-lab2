import express from "express";
import path from "path";
import { getUsers, createUser } from "./db";
import { sha256 } from "js-sha256";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const hostname = "0.0.0.0";

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4200;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(express.static(path.join(__dirname)));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/vuln-xss", (req, res) => {
  res.render("vuln-xss");
});

app.get("/vuln-data", async (req, res) => {
  var result = await getUsers();
  res.render("vuln-data", { result: result });
});

app.post("/vuln-data", async (req, res) => {
  if (req.body.checkbox) {
    createUser(req.body.username, req.body.password, false);
  } else {
    createUser(req.body.username, sha256(req.body.password), true);
  }
  res.status(201).redirect("/vuln-data");
});

app.listen(port, () => {
  console.log(`Server running at https://${hostname}:${port}`);
});

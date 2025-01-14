"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_body_parser = __toESM(require("body-parser"));

// src/controller/item-control.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var safeResponse = (res, callback) => __async(void 0, null, function* () {
  try {
    const data = yield callback();
    if (!res.headersSent) {
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Ocorreu um erro inesperado" });
    }
  }
});
var getItems = (req, res) => {
  safeResponse(res, () => __async(void 0, null, function* () {
    return prisma.item.findMany();
  }));
};
var addItem = (req, res) => {
  safeResponse(res, () => __async(void 0, null, function* () {
    const { title } = req.body;
    yield prisma.item.create({ data: { title } });
    return prisma.item.findMany;
  }));
};
var deleteItem = (req, res) => {
  safeResponse(res, () => __async(void 0, null, function* () {
    const { id } = req.params;
    const itemId = parseInt(id, 10);
    yield prisma.item.findUnique({ where: { id: itemId } });
    yield prisma.item.delete({ where: { id: itemId } });
    return prisma.item.findMany();
  }));
};

// src/server.ts
var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(cors());
app.use(import_body_parser.default.json());
app.get("/", getItems);
app.post("/add", addItem);
app.delete("/:id", deleteItem);
var PORT = 5e3;
app.listen(PORT, () => {
  console.log(`HTTP is running on port:${PORT}`);
});

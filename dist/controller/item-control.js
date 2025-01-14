"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/controller/item-control.ts
var item_control_exports = {};
__export(item_control_exports, {
  addItem: () => addItem,
  deleteItem: () => deleteItem,
  getItems: () => getItems
});
module.exports = __toCommonJS(item_control_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addItem,
  deleteItem,
  getItems
});

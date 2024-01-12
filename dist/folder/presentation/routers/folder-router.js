"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function FoldersRouter(getFoldersUseCase, createFolderUseCase, moveFolderUseCase, renameFolderUseCase, deleteFolderUseCase) {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const folders = yield getFoldersUseCase.execute();
            res.send(folders);
        }
        catch (err) {
            res.status(500).send({ message: "Error fetching folders" });
        }
    }));
    router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield createFolderUseCase.execute(req.body);
            res.statusCode = 201;
            res.json({ message: "Created" });
        }
        catch (err) {
            res.status(500).send({ message: "Error creating folder" });
        }
    }));
    router.put("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield renameFolderUseCase.execute(Number(req.params.id), req.body.name);
            res.statusCode = 204;
            res.json({ message: "Updated" });
        }
        catch (err) {
            res.status(500).send({ message: "Error renaming folder" });
        }
    }));
    router.put("/:id/move", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield moveFolderUseCase.execute(Number(req.params.id), req.body.parentFolder);
            res.statusCode = 204;
            res.json({ message: "Moved" });
        }
        catch (err) {
            res.status(500).send({ message: "Error moving folder" });
        }
    }));
    router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield deleteFolderUseCase.execute(Number(req.params.id));
            res.statusCode = 204;
            res.json({ message: "Deleted" });
        }
        catch (err) {
            res.status(500).send({ message: "Error deleting folder" });
        }
    }));
    return router;
}
exports.default = FoldersRouter;

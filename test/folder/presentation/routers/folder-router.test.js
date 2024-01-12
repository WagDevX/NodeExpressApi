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
const supertest_1 = __importDefault(require("supertest"));
const folder_router_1 = __importDefault(require("../../../../src/folder/presentation/routers/folder-router"));
const server_1 = __importDefault(require("../../../../src/server"));
class MockGetFoldersUseCase {
    execute() {
        throw new Error("Method not implemented.");
    }
}
class MockCreateFolderUseCase {
    execute(folder) {
        throw new Error("Method not implemented.");
    }
}
class MockRenameFolderUseCase {
    execute(id, name) {
        throw new Error("Method not implemented.");
    }
}
class MockDeleteFolderUseCase {
    execute(id) {
        throw new Error("Method not implemented.");
    }
}
class MockMoveFolderUseCase {
    execute(id, parentFolder) {
        throw new Error("Method not implemented.");
    }
}
describe("FolderRouter", () => {
    let mockCreateFolderUseCase;
    let mockGetFoldersUseCase;
    let mockrenameFolderUseCase;
    let mockdeleteFolderUseCase;
    let mockmoveFolderUseCase;
    beforeAll(() => {
        mockCreateFolderUseCase = new MockCreateFolderUseCase();
        mockGetFoldersUseCase = new MockGetFoldersUseCase();
        mockrenameFolderUseCase = new MockRenameFolderUseCase();
        mockdeleteFolderUseCase = new MockDeleteFolderUseCase();
        mockmoveFolderUseCase = new MockMoveFolderUseCase();
        server_1.default.use("/folder", (0, folder_router_1.default)(mockGetFoldersUseCase, mockCreateFolderUseCase, mockmoveFolderUseCase, mockrenameFolderUseCase, mockdeleteFolderUseCase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("GET /folder", () => {
        test("should return 200 with data", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [{ id: 1, name: "Folder 1", owner: 1 }];
            jest
                .spyOn(mockGetFoldersUseCase, "execute")
                .mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).get("/folder");
            expect(response.status).toBe(200);
            expect(mockGetFoldersUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
    });
});

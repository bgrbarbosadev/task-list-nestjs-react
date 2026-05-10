"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
var common_1 = require("@nestjs/common");
var task_entity_1 = require("./entities/task.entity");
var TasksService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TasksService = _classThis = /** @class */ (function () {
        function TasksService_1() {
            this.taskList = [
                {
                    id: 1,
                    title: 'Criar estrutura do projeto',
                    description: 'Configurar NestJS com as dependências iniciais.',
                    status: task_entity_1.TaskStatus.DONE,
                    createdAt: new Date('2025-01-01T08:00:00'),
                    updatedAt: new Date('2025-01-01T10:00:00'),
                },
                {
                    id: 2,
                    title: 'Modelar entidades do banco',
                    description: 'Criar as entidades Task e User com TypeORM.',
                    status: task_entity_1.TaskStatus.DONE,
                    createdAt: new Date('2025-01-02T09:00:00'),
                    updatedAt: new Date('2025-01-02T11:30:00'),
                },
                {
                    id: 3,
                    title: 'Implementar CRUD de tarefas',
                    description: 'Criar os endpoints GET, POST, PATCH e DELETE para tasks.',
                    status: task_entity_1.TaskStatus.IN_PROGRESS,
                    createdAt: new Date('2025-01-03T08:00:00'),
                    updatedAt: new Date('2025-01-03T08:00:00'),
                },
                {
                    id: 4,
                    title: 'Adicionar autenticação JWT',
                    description: 'Proteger as rotas com guards e tokens JWT.',
                    status: task_entity_1.TaskStatus.PENDING,
                    createdAt: new Date('2025-01-04T08:00:00'),
                    updatedAt: new Date('2025-01-04T08:00:00'),
                },
                {
                    id: 5,
                    title: 'Documentar API com Swagger',
                    description: 'Anotar controllers e DTOs com decorators do @nestjs/swagger.',
                    status: task_entity_1.TaskStatus.PENDING,
                    createdAt: new Date('2025-01-05T08:00:00'),
                    updatedAt: new Date('2025-01-05T08:00:00'),
                }
            ];
        }
        TasksService_1.prototype.create = function (createTaskDto) {
            var _a, _b;
            var newTask = {
                id: this.taskList.length + 1,
                title: createTaskDto.title,
                description: (_a = createTaskDto.description) !== null && _a !== void 0 ? _a : '',
                status: (_b = createTaskDto.status) !== null && _b !== void 0 ? _b : task_entity_1.TaskStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            this.taskList.push(newTask);
            return newTask;
        };
        TasksService_1.prototype.findAll = function () {
            return this.taskList;
        };
        TasksService_1.prototype.findOne = function (id) {
            var task = this.taskList.find(function (task) { return task.id === id; });
            return task;
        };
        TasksService_1.prototype.update = function (id, updateTaskDto) {
            var _a, _b, _c;
            var taskIndex = this.taskList.findIndex(function (task) { return task.id === id; });
            if (taskIndex === -1) {
                throw new common_1.NotFoundException("Task #".concat(id, " n\u00E3o encontrada."));
            }
            var taskOriginal = this.taskList[taskIndex];
            var taskAtualizada = {
                id: taskOriginal.id,
                title: (_a = updateTaskDto.title) !== null && _a !== void 0 ? _a : taskOriginal.title,
                description: (_b = updateTaskDto.description) !== null && _b !== void 0 ? _b : taskOriginal.description,
                status: (_c = updateTaskDto.status) !== null && _c !== void 0 ? _c : taskOriginal.status,
                createdAt: taskOriginal.createdAt,
                updatedAt: new Date(),
            };
            this.taskList[taskIndex] = taskAtualizada;
            return taskAtualizada;
        };
        TasksService_1.prototype.remove = function (id) {
            var index = this.taskList.findIndex(function (task) { return task.id === id; });
            if (index === -1) {
                throw new common_1.NotFoundException("Task #".concat(id, " n\u00E3o encontrada."));
            }
            var removed = this.taskList.splice(index, 1)[0];
            return this.taskList;
        };
        return TasksService_1;
    }());
    __setFunctionName(_classThis, "TasksService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TasksService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TasksService = _classThis;
}();
exports.TasksService = TasksService;

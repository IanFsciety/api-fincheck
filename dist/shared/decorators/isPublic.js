"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublic = exports.IS_PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'IS_PUBLIC';
const isPublic = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.isPublic = isPublic;
//# sourceMappingURL=isPublic.js.map
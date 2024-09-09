"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalEnumUUIDPipe = void 0;
const common_1 = require("@nestjs/common");
class OptionalEnumUUIDPipe extends common_1.ParseEnumPipe {
    transform(value, metadata) {
        if (typeof value === 'undefined') {
            return undefined;
        }
        return super.transform(value, metadata);
    }
}
exports.OptionalEnumUUIDPipe = OptionalEnumUUIDPipe;
//# sourceMappingURL=OptionalParseEnumPipe.js.map
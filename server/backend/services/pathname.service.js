"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathnameService = void 0;
const constants_1 = require("../constants");
class PathnameService {
    replaceSpaces(value) {
        return value.toLowerCase().replace(/\s+/g, constants_1.MINUS_REPLACE_STRING);
    }
    appendCount(pathname, count) {
        return (count === constants_1.INITIAL_PATHNAME_COUNT)
            ? pathname + count
            : pathname.replace(/\d+$/, `${count}`);
    }
}
exports.PathnameService = PathnameService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function getRandomString(length) {
    let result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
function getRandomFileName() {
    return getRandomString(8);
}
exports.getRandomFileName = getRandomFileName;
//# sourceMappingURL=getRandomFileName.js.map
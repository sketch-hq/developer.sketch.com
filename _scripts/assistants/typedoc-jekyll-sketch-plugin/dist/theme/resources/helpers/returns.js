"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returns = void 0;
const models_1 = require("typedoc/dist/lib/models");
const property_table_1 = require("./property-table");
const type_1 = require("./type");
function returns() {
    const md = [`**Returns:** \`${type_1.type.call(this, 'object')}\`{:.language-ts}`];
    if (this instanceof models_1.ReflectionType &&
        this.declaration &&
        this.declaration.children) {
        md.push(property_table_1.propertyTable.call(this.declaration.children));
    }
    return md.join('\n\n');
}
exports.returns = returns;
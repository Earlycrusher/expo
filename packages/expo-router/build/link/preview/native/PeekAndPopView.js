"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PeekAndPopNativeView;
const expo_1 = require("expo");
const NativeView = (0, expo_1.requireNativeView)('ExpoRouterPeekAndPop', 'PeekAndPopView');
function PeekAndPopNativeView(props) {
    return <NativeView {...props}/>;
}
//# sourceMappingURL=PeekAndPopView.js.map
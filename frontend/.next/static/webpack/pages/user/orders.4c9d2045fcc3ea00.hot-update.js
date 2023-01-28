"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/user/orders",{

/***/ "./pages/user/orders.js":
/*!******************************!*\
  !*** ./pages/user/orders.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Orders; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subcomponents/_navbar */ \"./pages/subcomponents/_navbar.js\");\n/* harmony import */ var _subcomponents_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subcomponents/_button */ \"./pages/subcomponents/_button.js\");\n/* harmony import */ var _subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../subcomponents/_accountmenu */ \"./pages/subcomponents/_accountmenu.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Orders() {\n    _s();\n    const [expand, setExpand] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const initialOrderObj = {\n        orderemail: \"\",\n        ordernumber: \"\"\n    };\n    const [credentials, setCredentials] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialOrderObj);\n    const onchange = (e)=>{\n        setCredentials({\n            ...credentials,\n            [e.target.name]: e.target.value\n        });\n    };\n    const { orderemail , ordernumber  } = credentials;\n    const disabler = ()=>{\n        if (!orderemail || !ordernumber) {\n            return true;\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"bg-gray-100 w-full h-screen font_futuraLT\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    setExpand: setExpand\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 27,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                    className: \"bg-gray-100 \".concat(expand === true ? \"lg:w-3/4\" : \"w-full lg:w-[95%]\", \" h-full lg:fixed right-0 flex transition-all duration-700\"),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 29,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                            className: \"w-full lg:w-[67%] font_futuraLT text-left p-9 pl-7 lg:pr-16 overflow-y-scroll scroll-py-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: \"text-3xl mb-4\",\n                                    children: \"Track Your Order\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 31,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    className: \"mt-16 pb-20 font_futuraLT space-y-10\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: \"text-xl\",\n                                            children: \"Enter Your Order Information\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 33,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"Enter your email address and order number in the space below and we will provide you with a list of the items you ordered and the relevant shipping information. If you have only just confirmed your order, this information w0ill appear in a few minutes.\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 34,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"email\",\n                                                name: \"orderemail\",\n                                                id: \"orderemail\",\n                                                onChange: onchange,\n                                                placeholder: \"Order Email*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 36,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 35,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"flex flex-col justify-end\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                        className: \"bg-transparent outline-none border-none\",\n                                                        type: \"number\",\n                                                        name: \"ordernumber\",\n                                                        id: \"ordernumber\",\n                                                        onChange: onchange,\n                                                        placeholder: \"Order Number*\"\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                        lineNumber: 40,\n                                                        columnNumber: 37\n                                                    }, this)\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                    lineNumber: 39,\n                                                    columnNumber: 33\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"small\", {\n                                                    className: \"self-end text-gray-500 my-3\",\n                                                    children: \"9 to 20 digits, no spaces\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                    lineNumber: 42,\n                                                    columnNumber: 33\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 38,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \" w-full my-10 space-y-5\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    children: \"Urban Fits processes the data collected to enable you to manage your information to facilitate your order. To find out more about how we manage your personal data and exercise your rights please refer to our privacy policy.\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                    lineNumber: 45,\n                                                    columnNumber: 33\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    children: \"Mandatory information : If you choose not to consent to the collection of mandatory data (with an asterisk). You will not be able to manage your information.\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                    lineNumber: 46,\n                                                    columnNumber: 33\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 44,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full flex justify-end space-x-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                                disabled: disabler(),\n                                                value: \"Continue\",\n                                                type: \"submit\",\n                                                classes: \"w-full md:w-2/12\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 49,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 48,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 32,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 30,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 28,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n            lineNumber: 26,\n            columnNumber: 13\n        }, this)\n    }, void 0, false);\n}\n_s(Orders, \"tFbSMbRKmfMRRE00Vh2zXFEA6Sc=\");\n_c = Orders;\nvar _c;\n$RefreshReg$(_c, \"Orders\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyL29yZGVycy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQXVDO0FBQ1g7QUFDa0I7QUFDQTtBQUNTO0FBRXhDLFNBQVNNLFNBQVM7O0lBQzdCLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHUCwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzFDLE1BQU1RLGtCQUFrQjtRQUNwQkMsWUFBWTtRQUNaQyxhQUFhO0lBQ2pCO0lBQ0EsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdaLCtDQUFRQSxDQUFDUTtJQUMvQyxNQUFNSyxXQUFXLENBQUNDLElBQU07UUFDcEJGLGVBQWU7WUFBRSxHQUFHRCxXQUFXO1lBQUUsQ0FBQ0csRUFBRUMsTUFBTSxDQUFDQyxJQUFJLENBQUMsRUFBRUYsRUFBRUMsTUFBTSxDQUFDRSxLQUFLO1FBQUM7SUFDckU7SUFFQSxNQUFNLEVBQUNSLFdBQVUsRUFBRUMsWUFBVyxFQUFDLEdBQUdDO0lBQ2xDLE1BQU1PLFdBQVcsSUFBTTtRQUNuQixJQUFJLENBQUNULGNBQWMsQ0FBQ0MsYUFBYTtZQUM3QixPQUFPLElBQUk7UUFDZixDQUFDO0lBQ0w7SUFDQSxxQkFDSTtrQkFDSSw0RUFBQ1M7WUFBS0MsV0FBVTs7OEJBQ1osOERBQUNsQiw2REFBTUE7b0JBQUNLLFdBQVdBOzs7Ozs7OEJBQ25CLDhEQUFDYztvQkFBUUQsV0FBVyxlQUFrRSxPQUFuRGQsV0FBVyxJQUFJLEdBQUcsYUFBYSxtQkFBbUIsRUFBQzs7c0NBQ2xGLDhEQUFDRixrRUFBV0E7Ozs7O3NDQUNaLDhEQUFDaUI7NEJBQVFELFdBQVU7OzhDQUNmLDhEQUFDRTtvQ0FBR0YsV0FBVTs4Q0FBZ0I7Ozs7Ozs4Q0FDOUIsOERBQUNHO29DQUFLSCxXQUFVOztzREFDWiw4REFBQ0k7NENBQUdKLFdBQVU7c0RBQVU7Ozs7OztzREFDeEIsOERBQUNLO3NEQUFFOzs7Ozs7c0RBQ0gsOERBQUNDOzRDQUFJTixXQUFVO3NEQUNYLDRFQUFDTztnREFBTVAsV0FBVTtnREFBMENRLE1BQUs7Z0RBQVFaLE1BQUs7Z0RBQWFhLElBQUc7Z0RBQWFDLFVBQVVqQjtnREFBVWtCLGFBQVk7Ozs7Ozs7Ozs7O3NEQUU5SSw4REFBQ0w7NENBQUlOLFdBQVU7OzhEQUNYLDhEQUFDTTtvREFBSU4sV0FBVTs4REFDWCw0RUFBQ087d0RBQU1QLFdBQVU7d0RBQTBDUSxNQUFLO3dEQUFTWixNQUFLO3dEQUFjYSxJQUFHO3dEQUFjQyxVQUFVakI7d0RBQVVrQixhQUFZOzs7Ozs7Ozs7Ozs4REFFakosOERBQUNDO29EQUFNWixXQUFVOzhEQUErQjs7Ozs7Ozs7Ozs7O3NEQUVwRCw4REFBQ007NENBQUlOLFdBQVU7OzhEQUNYLDhEQUFDSzs4REFBRTs7Ozs7OzhEQUNILDhEQUFDQTs4REFBRTs7Ozs7Ozs7Ozs7O3NEQUVQLDhEQUFDQzs0Q0FBSU4sV0FBVTtzREFDWCw0RUFBQ2pCLDZEQUFNQTtnREFBQzhCLFVBQVVmO2dEQUFZRCxPQUFNO2dEQUFXVyxNQUFLO2dEQUFTTSxTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRckcsQ0FBQztHQWxEdUI3QjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy91c2VyL29yZGVycy5qcz83MzI4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fbmF2YmFyJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9zdWJjb21wb25lbnRzL19idXR0b24nO1xyXG5pbXBvcnQgQWNjb3VudE1lbnUgZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fYWNjb3VudG1lbnUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcmRlcnMoKSB7XHJcbiAgICBjb25zdCBbZXhwYW5kLCBzZXRFeHBhbmRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgICBjb25zdCBpbml0aWFsT3JkZXJPYmogPSB7XHJcbiAgICAgICAgb3JkZXJlbWFpbDogJycsXHJcbiAgICAgICAgb3JkZXJudW1iZXI6ICcnXHJcbiAgICB9XHJcbiAgICBjb25zdCBbY3JlZGVudGlhbHMsIHNldENyZWRlbnRpYWxzXSA9IHVzZVN0YXRlKGluaXRpYWxPcmRlck9iailcclxuICAgIGNvbnN0IG9uY2hhbmdlID0gKGUpID0+IHtcclxuICAgICAgICBzZXRDcmVkZW50aWFscyh7IC4uLmNyZWRlbnRpYWxzLCBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qge29yZGVyZW1haWwsIG9yZGVybnVtYmVyfSA9IGNyZWRlbnRpYWxzXHJcbiAgICBjb25zdCBkaXNhYmxlciA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIW9yZGVyZW1haWwgfHwgIW9yZGVybnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCB3LWZ1bGwgaC1zY3JlZW4gZm9udF9mdXR1cmFMVFwiPlxyXG4gICAgICAgICAgICAgICAgPE5hdmJhciBzZXRFeHBhbmQ9e3NldEV4cGFuZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YGJnLWdyYXktMTAwICR7ZXhwYW5kID09PSB0cnVlID8gJ2xnOnctMy80JyA6ICd3LWZ1bGwgbGc6dy1bOTUlXSd9IGgtZnVsbCBsZzpmaXhlZCByaWdodC0wIGZsZXggdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFjY291bnRNZW51IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPSd3LWZ1bGwgbGc6dy1bNjclXSBmb250X2Z1dHVyYUxUIHRleHQtbGVmdCBwLTkgcGwtNyBsZzpwci0xNiBvdmVyZmxvdy15LXNjcm9sbCBzY3JvbGwtcHktMTAnID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIG1iLTRcIj5UcmFjayBZb3VyIE9yZGVyPC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPVwibXQtMTYgcGItMjAgZm9udF9mdXR1cmFMVCBzcGFjZS15LTEwXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGxcIj5FbnRlciBZb3VyIE9yZGVyIEluZm9ybWF0aW9uPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkVudGVyIHlvdXIgZW1haWwgYWRkcmVzcyBhbmQgb3JkZXIgbnVtYmVyIGluIHRoZSBzcGFjZSBiZWxvdyBhbmQgd2Ugd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgbGlzdCBvZiB0aGUgaXRlbXMgeW91IG9yZGVyZWQgYW5kIHRoZSByZWxldmFudCBzaGlwcGluZyBpbmZvcm1hdGlvbi4gSWYgeW91IGhhdmUgb25seSBqdXN0IGNvbmZpcm1lZCB5b3VyIG9yZGVyLCB0aGlzIGluZm9ybWF0aW9uIHcwaWxsIGFwcGVhciBpbiBhIGZldyBtaW51dGVzLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGRhdGFfZmllbGQgZmxleCBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLWItZ3JheS00MDAgZm9jdXM6Ym9yZGVyLXllbGxvdy03MDAgaG92ZXI6Ym9yZGVyLXllbGxvdy02MDAgdHJhbnNpdGlvbiBweS0yIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIGJvcmRlci1ub25lXCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cIm9yZGVyZW1haWxcIiBpZD1cIm9yZGVyZW1haWxcIiBvbkNoYW5nZT17b25jaGFuZ2V9IHBsYWNlaG9sZGVyPVwiT3JkZXIgRW1haWwqXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZGF0YV9maWVsZCBmbGV4IGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItYi1ncmF5LTQwMCBmb2N1czpib3JkZXIteWVsbG93LTcwMCBob3Zlcjpib3JkZXIteWVsbG93LTYwMCB0cmFuc2l0aW9uIHB5LTIgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIGJvcmRlci1ub25lXCIgdHlwZT1cIm51bWJlclwiIG5hbWU9XCJvcmRlcm51bWJlclwiIGlkPVwib3JkZXJudW1iZXJcIiBvbkNoYW5nZT17b25jaGFuZ2V9IHBsYWNlaG9sZGVyPVwiT3JkZXIgTnVtYmVyKlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsIGNsYXNzTmFtZT0nc2VsZi1lbmQgdGV4dC1ncmF5LTUwMCBteS0zJyA+OSB0byAyMCBkaWdpdHMsIG5vIHNwYWNlczwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIHctZnVsbCBteS0xMCBzcGFjZS15LTVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5VcmJhbiBGaXRzIHByb2Nlc3NlcyB0aGUgZGF0YSBjb2xsZWN0ZWQgdG8gZW5hYmxlIHlvdSB0byBtYW5hZ2UgeW91ciBpbmZvcm1hdGlvbiB0byBmYWNpbGl0YXRlIHlvdXIgb3JkZXIuIFRvIGZpbmQgb3V0IG1vcmUgYWJvdXQgaG93IHdlIG1hbmFnZSB5b3VyIHBlcnNvbmFsIGRhdGEgYW5kIGV4ZXJjaXNlIHlvdXIgcmlnaHRzIHBsZWFzZSByZWZlciB0byBvdXIgcHJpdmFjeSBwb2xpY3kuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPk1hbmRhdG9yeSBpbmZvcm1hdGlvbiA6IElmIHlvdSBjaG9vc2Ugbm90IHRvIGNvbnNlbnQgdG8gdGhlIGNvbGxlY3Rpb24gb2YgbWFuZGF0b3J5IGRhdGEgKHdpdGggYW4gYXN0ZXJpc2spLiBZb3Ugd2lsbCBub3QgYmUgYWJsZSB0byBtYW5hZ2UgeW91ciBpbmZvcm1hdGlvbi48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmQgc3BhY2UteC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBkaXNhYmxlZD17ZGlzYWJsZXIoKX0gdmFsdWU9XCJDb250aW51ZVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzc2VzPVwidy1mdWxsIG1kOnctMi8xMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiTmF2YmFyIiwiQnV0dG9uIiwiQWNjb3VudE1lbnUiLCJPcmRlcnMiLCJleHBhbmQiLCJzZXRFeHBhbmQiLCJpbml0aWFsT3JkZXJPYmoiLCJvcmRlcmVtYWlsIiwib3JkZXJudW1iZXIiLCJjcmVkZW50aWFscyIsInNldENyZWRlbnRpYWxzIiwib25jaGFuZ2UiLCJlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwiZGlzYWJsZXIiLCJtYWluIiwiY2xhc3NOYW1lIiwic2VjdGlvbiIsImgyIiwiZm9ybSIsImgzIiwicCIsImRpdiIsImlucHV0IiwidHlwZSIsImlkIiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInNtYWxsIiwiZGlzYWJsZWQiLCJjbGFzc2VzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/user/orders.js\n"));

/***/ })

});
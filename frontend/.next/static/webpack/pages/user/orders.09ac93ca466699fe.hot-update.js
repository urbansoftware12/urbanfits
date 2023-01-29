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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Orders; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subcomponents/_navbar */ \"./pages/subcomponents/_navbar.js\");\n/* harmony import */ var _subcomponents_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subcomponents/_button */ \"./pages/subcomponents/_button.js\");\n/* harmony import */ var _subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../subcomponents/_accountmenu */ \"./pages/subcomponents/_accountmenu.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Orders() {\n    _s();\n    const [expand, setExpand] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const initialFormObj = {\n        username: \"\",\n        email: \"\",\n        phone: \"\",\n        password: \"\"\n    };\n    const [credentials, setCredentials] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFormObj);\n    const onchange = (e)=>{\n        setCredentials({\n            ...credentials,\n            [e.target.name]: e.target.value\n        });\n        console.log(credentials);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"bg-gray-100 w-full h-screen font_futuraLT\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    setExpand: setExpand\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 23,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                    className: \"bg-gray-100 \".concat(expand === true ? \"lg:w-3/4\" : \"w-full lg:w-[95%]\", \" h-full lg:fixed right-0 flex transition-all duration-700\"),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 25,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                            className: \"w-full lg:w-[67%] font_futuraLT text-left p-9 pl-7 overflow-y-scroll scroll-py-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: \"text-3xl mb-4\",\n                                    children: \"Track Your Order\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 27,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    className: \"mt-16 pb-20 font_futuraLT space-y-10\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: \"text-xl\",\n                                            children: \"Enter Your Order Information\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 29,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"Enter your email address and order number in the space below and we will provide you with a list of the items you ordered and the relevant shipping information. If you have only just confirmed your order, this information w0ill appear in a few minutes.\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 30,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"email\",\n                                                name: \"orderemail\",\n                                                id: \"orderemail\",\n                                                onChange: onchange,\n                                                placeholder: \"Order Email*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 32,\n                                                columnNumber: 37\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 31,\n                                            columnNumber: 33\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"number\",\n                                                name: \"ordernumber\",\n                                                id: \"ordernumber\",\n                                                onChange: onchange,\n                                                placeholder: \"Order Number*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 35,\n                                                columnNumber: 37\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 34,\n                                            columnNumber: 33\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"small\", {\n                                            className: \"text-gray-500 my-4\",\n                                            children: \"9 to 20 digits, no spaces\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 37,\n                                            columnNumber: 33\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full flex justify-end space-x-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                                value: \"Continue\",\n                                                type: \"submit\",\n                                                classes: \"w-full md:w-2/12\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 39,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 38,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 28,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 26,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 24,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n            lineNumber: 22,\n            columnNumber: 13\n        }, this)\n    }, void 0, false);\n}\n_s(Orders, \"2JzAXHlCT9T4mih8eLb1ajH+c4M=\");\n_c = Orders;\nvar _c;\n$RefreshReg$(_c, \"Orders\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyL29yZGVycy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQXVDO0FBQ1g7QUFDa0I7QUFDQTtBQUNTO0FBRXhDLFNBQVNNLFNBQVM7O0lBQzdCLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHUCwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzFDLE1BQU1RLGlCQUFpQjtRQUNuQkMsVUFBVTtRQUNWQyxPQUFPO1FBQ1BDLE9BQU87UUFDUEMsVUFBVTtJQUNkO0lBQ0EsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdkLCtDQUFRQSxDQUFDUTtJQUMvQyxNQUFNTyxXQUFXLENBQUNDLElBQU07UUFDcEJGLGVBQWU7WUFBRSxHQUFHRCxXQUFXO1lBQUUsQ0FBQ0csRUFBRUMsTUFBTSxDQUFDQyxJQUFJLENBQUMsRUFBRUYsRUFBRUMsTUFBTSxDQUFDRSxLQUFLO1FBQUM7UUFDakVDLFFBQVFDLEdBQUcsQ0FBQ1I7SUFDaEI7SUFDQSxxQkFDSTtrQkFDSSw0RUFBQ1M7WUFBS0MsV0FBVTs7OEJBQ1osOERBQUNyQiw2REFBTUE7b0JBQUNLLFdBQVdBOzs7Ozs7OEJBQ25CLDhEQUFDaUI7b0JBQVFELFdBQVcsZUFBa0UsT0FBbkRqQixXQUFXLElBQUksR0FBRyxhQUFhLG1CQUFtQixFQUFDOztzQ0FDbEYsOERBQUNGLGtFQUFXQTs7Ozs7c0NBQ1osOERBQUNvQjs0QkFBUUQsV0FBVTs7OENBQ2YsOERBQUNFO29DQUFHRixXQUFVOzhDQUFnQjs7Ozs7OzhDQUM5Qiw4REFBQ0c7b0NBQUtILFdBQVU7O3NEQUNaLDhEQUFDSTs0Q0FBR0osV0FBVTtzREFBVTs7Ozs7O3NEQUN4Qiw4REFBQ0s7c0RBQUU7Ozs7OztzREFDQyw4REFBQ0M7NENBQUlOLFdBQVU7c0RBQ1gsNEVBQUNPO2dEQUFNUCxXQUFVO2dEQUEwQ1EsTUFBSztnREFBUWIsTUFBSztnREFBYWMsSUFBRztnREFBYUMsVUFBVWxCO2dEQUFVbUIsYUFBWTs7Ozs7Ozs7Ozs7c0RBRTlJLDhEQUFDTDs0Q0FBSU4sV0FBVTtzREFDWCw0RUFBQ087Z0RBQU1QLFdBQVU7Z0RBQTBDUSxNQUFLO2dEQUFTYixNQUFLO2dEQUFjYyxJQUFHO2dEQUFjQyxVQUFVbEI7Z0RBQVVtQixhQUFZOzs7Ozs7Ozs7OztzREFFakosOERBQUNDOzRDQUFNWixXQUFVO3NEQUFxQjs7Ozs7O3NEQUMxQyw4REFBQ007NENBQUlOLFdBQVU7c0RBQ1gsNEVBQUNwQiw2REFBTUE7Z0RBQUNnQixPQUFNO2dEQUFXWSxNQUFLO2dEQUFTSyxTQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRL0UsQ0FBQztHQXhDdUIvQjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy91c2VyL29yZGVycy5qcz83MzI4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fbmF2YmFyJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9zdWJjb21wb25lbnRzL19idXR0b24nO1xyXG5pbXBvcnQgQWNjb3VudE1lbnUgZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fYWNjb3VudG1lbnUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPcmRlcnMoKSB7XHJcbiAgICBjb25zdCBbZXhwYW5kLCBzZXRFeHBhbmRdID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgICBjb25zdCBpbml0aWFsRm9ybU9iaiA9IHtcclxuICAgICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgICAgZW1haWw6ICcnLFxyXG4gICAgICAgIHBob25lOiAnJyxcclxuICAgICAgICBwYXNzd29yZDogJycsXHJcbiAgICB9XHJcbiAgICBjb25zdCBbY3JlZGVudGlhbHMsIHNldENyZWRlbnRpYWxzXSA9IHVzZVN0YXRlKGluaXRpYWxGb3JtT2JqKVxyXG4gICAgY29uc3Qgb25jaGFuZ2UgPSAoZSkgPT4ge1xyXG4gICAgICAgIHNldENyZWRlbnRpYWxzKHsgLi4uY3JlZGVudGlhbHMsIFtlLnRhcmdldC5uYW1lXTogZS50YXJnZXQudmFsdWUgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyhjcmVkZW50aWFscylcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiYmctZ3JheS0xMDAgdy1mdWxsIGgtc2NyZWVuIGZvbnRfZnV0dXJhTFRcIj5cclxuICAgICAgICAgICAgICAgIDxOYXZiYXIgc2V0RXhwYW5kPXtzZXRFeHBhbmR9IC8+XHJcbiAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9e2BiZy1ncmF5LTEwMCAke2V4cGFuZCA9PT0gdHJ1ZSA/ICdsZzp3LTMvNCcgOiAndy1mdWxsIGxnOnctWzk1JV0nfSBoLWZ1bGwgbGc6Zml4ZWQgcmlnaHQtMCBmbGV4IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMGB9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxBY2NvdW50TWVudSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT0ndy1mdWxsIGxnOnctWzY3JV0gZm9udF9mdXR1cmFMVCB0ZXh0LWxlZnQgcC05IHBsLTcgb3ZlcmZsb3cteS1zY3JvbGwgc2Nyb2xsLXB5LTEwJyA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBtYi00XCI+VHJhY2sgWW91ciBPcmRlcjwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGNsYXNzTmFtZT1cIm10LTE2IHBiLTIwIGZvbnRfZnV0dXJhTFQgc3BhY2UteS0xMFwiID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsXCI+RW50ZXIgWW91ciBPcmRlciBJbmZvcm1hdGlvbjwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5FbnRlciB5b3VyIGVtYWlsIGFkZHJlc3MgYW5kIG9yZGVyIG51bWJlciBpbiB0aGUgc3BhY2UgYmVsb3cgYW5kIHdlIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGxpc3Qgb2YgdGhlIGl0ZW1zIHlvdSBvcmRlcmVkIGFuZCB0aGUgcmVsZXZhbnQgc2hpcHBpbmcgaW5mb3JtYXRpb24uIElmIHlvdSBoYXZlIG9ubHkganVzdCBjb25maXJtZWQgeW91ciBvcmRlciwgdGhpcyBpbmZvcm1hdGlvbiB3MGlsbCBhcHBlYXIgaW4gYSBmZXcgbWludXRlcy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZGF0YV9maWVsZCBmbGV4IGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItYi1ncmF5LTQwMCBmb2N1czpib3JkZXIteWVsbG93LTcwMCBob3Zlcjpib3JkZXIteWVsbG93LTYwMCB0cmFuc2l0aW9uIHB5LTIgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIGJvcmRlci1ub25lXCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cIm9yZGVyZW1haWxcIiBpZD1cIm9yZGVyZW1haWxcIiBvbkNoYW5nZT17b25jaGFuZ2V9IHBsYWNlaG9sZGVyPVwiT3JkZXIgRW1haWwqXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBkYXRhX2ZpZWxkIGZsZXggaXRlbXMtY2VudGVyIGJvcmRlci1iIGJvcmRlci1iLWdyYXktNDAwIGZvY3VzOmJvcmRlci15ZWxsb3ctNzAwIGhvdmVyOmJvcmRlci15ZWxsb3ctNjAwIHRyYW5zaXRpb24gcHktMiBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmVcIiB0eXBlPVwibnVtYmVyXCIgbmFtZT1cIm9yZGVybnVtYmVyXCIgaWQ9XCJvcmRlcm51bWJlclwiIG9uQ2hhbmdlPXtvbmNoYW5nZX0gcGxhY2Vob2xkZXI9XCJPcmRlciBOdW1iZXIqXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTUwMCBteS00XCI+OSB0byAyMCBkaWdpdHMsIG5vIHNwYWNlczwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kIHNwYWNlLXgtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gdmFsdWU9XCJDb250aW51ZVwiIHR5cGU9XCJzdWJtaXRcIiBjbGFzc2VzPVwidy1mdWxsIG1kOnctMi8xMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiTmF2YmFyIiwiQnV0dG9uIiwiQWNjb3VudE1lbnUiLCJPcmRlcnMiLCJleHBhbmQiLCJzZXRFeHBhbmQiLCJpbml0aWFsRm9ybU9iaiIsInVzZXJuYW1lIiwiZW1haWwiLCJwaG9uZSIsInBhc3N3b3JkIiwiY3JlZGVudGlhbHMiLCJzZXRDcmVkZW50aWFscyIsIm9uY2hhbmdlIiwiZSIsInRhcmdldCIsIm5hbWUiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJtYWluIiwiY2xhc3NOYW1lIiwic2VjdGlvbiIsImgyIiwiZm9ybSIsImgzIiwicCIsImRpdiIsImlucHV0IiwidHlwZSIsImlkIiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInNtYWxsIiwiY2xhc3NlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/user/orders.js\n"));

/***/ })

});
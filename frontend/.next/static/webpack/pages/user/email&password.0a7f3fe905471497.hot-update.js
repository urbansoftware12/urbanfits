"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/user/email&password",{

/***/ "./pages/user/email&password.js":
/*!**************************************!*\
  !*** ./pages/user/email&password.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ EmailPassword; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subcomponents/_navbar */ \"./pages/subcomponents/_navbar.js\");\n/* harmony import */ var _subcomponents_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subcomponents/_button */ \"./pages/subcomponents/_button.js\");\n/* harmony import */ var _subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../subcomponents/_accountmenu */ \"./pages/subcomponents/_accountmenu.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction EmailPassword() {\n    _s();\n    const [expand, setExpand] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const initialFormObj = {\n        username: \"\",\n        email: \"\",\n        phone: \"\",\n        password: \"\"\n    };\n    const [credentials, setCredentials] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFormObj);\n    const onchange = (e)=>{\n        setCredentials({\n            ...credentials,\n            [e.target.name]: e.target.value\n        });\n        console.log(credentials);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"bg-gray-100 w-full h-screen font_futuraLT\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    setExpand: setExpand\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                    lineNumber: 23,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                    className: \"bg-gray-100 \".concat(expand === true ? \"lg:w-3/4\" : \"w-full lg:w-[95%]\", \" h-full lg:fixed right-0 flex transition-all duration-700\"),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                            lineNumber: 25,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                            className: \"w-full lg:w-[67%] font_futuraLT text-left p-9 pl-7 overflow-y-scroll scroll-py-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: \"text-3xl mb-4\",\n                                    children: \"My Account\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                    lineNumber: 27,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-sm\",\n                                    children: [\n                                        \"Welcome !\",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 28,\n                                            columnNumber: 58\n                                        }, this),\n                                        \"Save your card details and address in this area to complete your future  purchases faster.\"\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                    lineNumber: 28,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    className: \"mt-10 font_futuraLT space-y-10\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                            className: \"text-xl\",\n                                            children: \"Change Email\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 30,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \" w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"email\",\n                                                name: \"email\",\n                                                id: \"email\",\n                                                onChange: onchange,\n                                                placeholder: \"Email*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                                lineNumber: 32,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 31,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \" w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"email\",\n                                                name: \"email\",\n                                                id: \"email\",\n                                                onChange: onchange,\n                                                placeholder: \"Confirm Email*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                                lineNumber: 35,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 34,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \" w-full data_field flex justify-between items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                    className: \"bg-transparent outline-none border-none\",\n                                                    type: \"password\",\n                                                    name: \"password\",\n                                                    id: \"password\",\n                                                    onChange: onchange,\n                                                    placeholder: \"Password*\"\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                                    lineNumber: 38,\n                                                    columnNumber: 33\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                                    href: \"/resetpassword\",\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"i\", {\n                                                        class: \"material-symbols-outlined\",\n                                                        children: \"edit_square\"\n                                                    }, void 0, false, {\n                                                        fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                                        lineNumber: 38,\n                                                        columnNumber: 213\n                                                    }, this)\n                                                }, void 0, false, {\n                                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                                    lineNumber: 38,\n                                                    columnNumber: 184\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 37,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                    lineNumber: 29,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full flex justify-end space-x-4\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                            value: \"Cancel\",\n                                            bg: \"bg-gray-200 text-black\",\n                                            classes: \"w-full md:w-1/3\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 42,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                            value: \"Save New Email\",\n                                            classes: \"w-full md:w-1/3\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                            lineNumber: 43,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                                    lineNumber: 41,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                            lineNumber: 26,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n                    lineNumber: 24,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\email&password.js\",\n            lineNumber: 22,\n            columnNumber: 13\n        }, this)\n    }, void 0, false);\n}\n_s(EmailPassword, \"2JzAXHlCT9T4mih8eLb1ajH+c4M=\");\n_c = EmailPassword;\nvar _c;\n$RefreshReg$(_c, \"EmailPassword\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyL2VtYWlsJnBhc3N3b3JkLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFBdUM7QUFDWDtBQUNrQjtBQUNBO0FBQ1M7QUFFeEMsU0FBU00sZ0JBQWdCOztJQUNwQyxNQUFNLENBQUNDLFFBQVFDLFVBQVUsR0FBR1AsK0NBQVFBLENBQUMsS0FBSztJQUMxQyxNQUFNUSxpQkFBaUI7UUFDbkJDLFVBQVU7UUFDVkMsT0FBTztRQUNQQyxPQUFPO1FBQ1BDLFVBQVU7SUFDZDtJQUNBLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHZCwrQ0FBUUEsQ0FBQ1E7SUFDL0MsTUFBTU8sV0FBVyxDQUFDQyxJQUFNO1FBQ3BCRixlQUFlO1lBQUUsR0FBR0QsV0FBVztZQUFFLENBQUNHLEVBQUVDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLEVBQUVGLEVBQUVDLE1BQU0sQ0FBQ0UsS0FBSztRQUFDO1FBQ2pFQyxRQUFRQyxHQUFHLENBQUNSO0lBQ2hCO0lBQ0EscUJBQ0k7a0JBQ0ksNEVBQUNTO1lBQUtDLFdBQVU7OzhCQUNaLDhEQUFDckIsNkRBQU1BO29CQUFDSyxXQUFXQTs7Ozs7OzhCQUNuQiw4REFBQ2lCO29CQUFRRCxXQUFXLGVBQWtFLE9BQW5EakIsV0FBVyxJQUFJLEdBQUcsYUFBYSxtQkFBbUIsRUFBQzs7c0NBQ2xGLDhEQUFDRixrRUFBV0E7Ozs7O3NDQUNaLDhEQUFDb0I7NEJBQVFELFdBQVU7OzhDQUNmLDhEQUFDRTtvQ0FBR0YsV0FBVTs4Q0FBZ0I7Ozs7Ozs4Q0FDOUIsOERBQUNHO29DQUFFSCxXQUFVOzt3Q0FBVztzREFBUyw4REFBQ0k7Ozs7O3dDQUFLOzs7Ozs7OzhDQUN2Qyw4REFBQ0M7b0NBQUtMLFdBQVU7O3NEQUNaLDhEQUFDTTs0Q0FBR04sV0FBVTtzREFBVzs7Ozs7O3NEQUN6Qiw4REFBQ087NENBQUlQLFdBQVU7c0RBQ1gsNEVBQUNRO2dEQUFNUixXQUFVO2dEQUEwQ1MsTUFBSztnREFBUWQsTUFBSztnREFBUWUsSUFBRztnREFBUUMsVUFBVW5CO2dEQUFVb0IsYUFBWTs7Ozs7Ozs7Ozs7c0RBRXBJLDhEQUFDTDs0Q0FBSVAsV0FBVTtzREFDWCw0RUFBQ1E7Z0RBQU1SLFdBQVU7Z0RBQTBDUyxNQUFLO2dEQUFRZCxNQUFLO2dEQUFRZSxJQUFHO2dEQUFRQyxVQUFVbkI7Z0RBQVVvQixhQUFZOzs7Ozs7Ozs7OztzREFFcEksOERBQUNMOzRDQUFJUCxXQUFVOzs4REFDWCw4REFBQ1E7b0RBQU1SLFdBQVU7b0RBQTBDUyxNQUFLO29EQUFXZCxNQUFLO29EQUFXZSxJQUFHO29EQUFXQyxVQUFVbkI7b0RBQVVvQixhQUFZOzs7Ozs7OERBQWMsOERBQUNsQyxrREFBSUE7b0RBQUNtQyxNQUFLOzhEQUFrQiw0RUFBQ0M7d0RBQUVDLE9BQU07a0VBQTRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FHak8sOERBQUNSO29DQUFJUCxXQUFVOztzREFDWCw4REFBQ3BCLDZEQUFNQTs0Q0FBQ2dCLE9BQU07NENBQVNvQixJQUFHOzRDQUF5QkMsU0FBUTs7Ozs7O3NEQUMzRCw4REFBQ3JDLDZEQUFNQTs0Q0FBQ2dCLE9BQU07NENBQWlCcUIsU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9uRSxDQUFDO0dBM0N1Qm5DO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3VzZXIvZW1haWwmcGFzc3dvcmQuanM/NDcxMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xyXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL3N1YmNvbXBvbmVudHMvX25hdmJhcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fYnV0dG9uJztcclxuaW1wb3J0IEFjY291bnRNZW51IGZyb20gJy4uL3N1YmNvbXBvbmVudHMvX2FjY291bnRtZW51J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRW1haWxQYXNzd29yZCgpIHtcclxuICAgIGNvbnN0IFtleHBhbmQsIHNldEV4cGFuZF0gPSB1c2VTdGF0ZShmYWxzZSlcclxuICAgIGNvbnN0IGluaXRpYWxGb3JtT2JqID0ge1xyXG4gICAgICAgIHVzZXJuYW1lOiAnJyxcclxuICAgICAgICBlbWFpbDogJycsXHJcbiAgICAgICAgcGhvbmU6ICcnLFxyXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgIH1cclxuICAgIGNvbnN0IFtjcmVkZW50aWFscywgc2V0Q3JlZGVudGlhbHNdID0gdXNlU3RhdGUoaW5pdGlhbEZvcm1PYmopXHJcbiAgICBjb25zdCBvbmNoYW5nZSA9IChlKSA9PiB7XHJcbiAgICAgICAgc2V0Q3JlZGVudGlhbHMoeyAuLi5jcmVkZW50aWFscywgW2UudGFyZ2V0Lm5hbWVdOiBlLnRhcmdldC52YWx1ZSB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGNyZWRlbnRpYWxzKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgICA8bWFpbiBjbGFzc05hbWU9XCJiZy1ncmF5LTEwMCB3LWZ1bGwgaC1zY3JlZW4gZm9udF9mdXR1cmFMVFwiPlxyXG4gICAgICAgICAgICAgICAgPE5hdmJhciBzZXRFeHBhbmQ9e3NldEV4cGFuZH0gLz5cclxuICAgICAgICAgICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT17YGJnLWdyYXktMTAwICR7ZXhwYW5kID09PSB0cnVlID8gJ2xnOnctMy80JyA6ICd3LWZ1bGwgbGc6dy1bOTUlXSd9IGgtZnVsbCBsZzpmaXhlZCByaWdodC0wIGZsZXggdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwYH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPEFjY291bnRNZW51IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPSd3LWZ1bGwgbGc6dy1bNjclXSBmb250X2Z1dHVyYUxUIHRleHQtbGVmdCBwLTkgcGwtNyBvdmVyZmxvdy15LXNjcm9sbCBzY3JvbGwtcHktMTAnID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIG1iLTRcIj5NeSBBY2NvdW50PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LXNtJyA+V2VsY29tZSAhPGJyIC8+U2F2ZSB5b3VyIGNhcmQgZGV0YWlscyBhbmQgYWRkcmVzcyBpbiB0aGlzIGFyZWEgdG8gY29tcGxldGUgeW91ciBmdXR1cmUgIHB1cmNoYXNlcyBmYXN0ZXIuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJtdC0xMCBmb250X2Z1dHVyYUxUIHNwYWNlLXktMTBcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPSd0ZXh0LXhsJyA+Q2hhbmdlIEVtYWlsPC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIHctZnVsbCBkYXRhX2ZpZWxkIGZsZXggaXRlbXMtY2VudGVyIGJvcmRlci1iIGJvcmRlci1iLWdyYXktNDAwIGZvY3VzOmJvcmRlci15ZWxsb3ctNzAwIGhvdmVyOmJvcmRlci15ZWxsb3ctNjAwIHRyYW5zaXRpb24gcHktMiBtYi00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJnLXRyYW5zcGFyZW50IG91dGxpbmUtbm9uZSBib3JkZXItbm9uZVwiIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBvbkNoYW5nZT17b25jaGFuZ2V9IHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgdy1mdWxsIGRhdGFfZmllbGQgZmxleCBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLWItZ3JheS00MDAgZm9jdXM6Ym9yZGVyLXllbGxvdy03MDAgaG92ZXI6Ym9yZGVyLXllbGxvdy02MDAgdHJhbnNpdGlvbiBweS0yIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiYmctdHJhbnNwYXJlbnQgb3V0bGluZS1ub25lIGJvcmRlci1ub25lXCIgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgaWQ9XCJlbWFpbFwiIG9uQ2hhbmdlPXtvbmNoYW5nZX0gcGxhY2Vob2xkZXI9XCJDb25maXJtIEVtYWlsKlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIHctZnVsbCBkYXRhX2ZpZWxkIGZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBib3JkZXItYiBib3JkZXItYi1ncmF5LTQwMCBmb2N1czpib3JkZXIteWVsbG93LTcwMCBob3Zlcjpib3JkZXIteWVsbG93LTYwMCB0cmFuc2l0aW9uIHB5LTIgbWItNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCBvdXRsaW5lLW5vbmUgYm9yZGVyLW5vbmVcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgb25DaGFuZ2U9e29uY2hhbmdlfSBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkKlwiIC8+PExpbmsgaHJlZj0nL3Jlc2V0cGFzc3dvcmQnID48aSBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5lZGl0X3NxdWFyZTwvaT48L0xpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGp1c3RpZnktZW5kIHNwYWNlLXgtNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YWx1ZT1cIkNhbmNlbFwiIGJnPVwiYmctZ3JheS0yMDAgdGV4dC1ibGFja1wiIGNsYXNzZXM9XCJ3LWZ1bGwgbWQ6dy0xLzNcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YWx1ZT1cIlNhdmUgTmV3IEVtYWlsXCIgY2xhc3Nlcz1cInctZnVsbCBtZDp3LTEvM1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPC9tYWluPlxyXG4gICAgICAgIDwvPlxyXG4gICAgKVxyXG59Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJMaW5rIiwiTmF2YmFyIiwiQnV0dG9uIiwiQWNjb3VudE1lbnUiLCJFbWFpbFBhc3N3b3JkIiwiZXhwYW5kIiwic2V0RXhwYW5kIiwiaW5pdGlhbEZvcm1PYmoiLCJ1c2VybmFtZSIsImVtYWlsIiwicGhvbmUiLCJwYXNzd29yZCIsImNyZWRlbnRpYWxzIiwic2V0Q3JlZGVudGlhbHMiLCJvbmNoYW5nZSIsImUiLCJ0YXJnZXQiLCJuYW1lIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwibWFpbiIsImNsYXNzTmFtZSIsInNlY3Rpb24iLCJoMiIsInAiLCJiciIsImZvcm0iLCJoMSIsImRpdiIsImlucHV0IiwidHlwZSIsImlkIiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsImhyZWYiLCJpIiwiY2xhc3MiLCJiZyIsImNsYXNzZXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/user/email&password.js\n"));

/***/ })

});
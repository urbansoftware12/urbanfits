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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Orders; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../subcomponents/_navbar */ \"./pages/subcomponents/_navbar.js\");\n/* harmony import */ var _subcomponents_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subcomponents/_button */ \"./pages/subcomponents/_button.js\");\n/* harmony import */ var _subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../subcomponents/_accountmenu */ \"./pages/subcomponents/_accountmenu.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Orders() {\n    _s();\n    const [expand, setExpand] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const initialFormObj = {\n        username: \"\",\n        email: \"\",\n        phone: \"\",\n        password: \"\"\n    };\n    const [credentials, setCredentials] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFormObj);\n    const onchange = (e)=>{\n        setCredentials({\n            ...credentials,\n            [e.target.name]: e.target.value\n        });\n        console.log(credentials);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            className: \"bg-gray-100 w-full h-screen font_futuraLT\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_navbar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    setExpand: setExpand\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 23,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                    className: \"bg-gray-100 \".concat(expand === true ? \"lg:w-3/4\" : \"w-full lg:w-[95%]\", \" h-full lg:fixed right-0 flex transition-all duration-700\"),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_accountmenu__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 25,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                            className: \"w-full lg:w-[67%] font_futuraLT text-left p-9 pl-7 overflow-y-scroll scroll-py-10\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                    className: \"text-3xl mb-4\",\n                                    children: \"Track Your Order\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 27,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                                    className: \"mt-16 pb-20 font_futuraLT space-y-10\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                            className: \"text-xl\",\n                                            children: \"Enter Your Order Information\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 29,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                            children: \"Enter your email address and order number in the space below and we will provide you with a list of the items you ordered and the relevant shipping information. If you have only just confirmed your order, this information w0ill appear in a few minutes.\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 30,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"lastname\",\n                                                name: \"tlastname\",\n                                                id: \"tlastname\",\n                                                onChange: onchange,\n                                                placeholder: \"Last Name\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 32,\n                                                columnNumber: 37\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 31,\n                                            columnNumber: 33\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full data_field flex items-center border-b border-b-gray-400 focus:border-yellow-700 hover:border-yellow-600 transition py-2 mb-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                                className: \"bg-transparent outline-none border-none\",\n                                                type: \"email\",\n                                                name: \"email\",\n                                                id: \"email\",\n                                                onChange: onchange,\n                                                placeholder: \"Email*\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 35,\n                                                columnNumber: 37\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 34,\n                                            columnNumber: 33\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"w-full flex justify-end space-x-4\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_subcomponents_button__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                                value: \"Continue\",\n                                                type: \"submit\",\n                                                classes: \"w-full md:w-2/12\"\n                                            }, void 0, false, {\n                                                fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                                lineNumber: 38,\n                                                columnNumber: 33\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                            lineNumber: 37,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                                    lineNumber: 28,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                            lineNumber: 26,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n                    lineNumber: 24,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\binar\\\\My Projects\\\\Client Projects\\\\project Urbanfits\\\\Urbanfits\\\\frontend\\\\pages\\\\user\\\\orders.js\",\n            lineNumber: 22,\n            columnNumber: 13\n        }, this)\n    }, void 0, false);\n}\n_s(Orders, \"2JzAXHlCT9T4mih8eLb1ajH+c4M=\");\n_c = Orders;\nvar _c;\n$RefreshReg$(_c, \"Orders\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyL29yZGVycy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQXVDO0FBQ1g7QUFDa0I7QUFDQTtBQUNTO0FBRXhDLFNBQVNNLFNBQVM7O0lBQzdCLE1BQU0sQ0FBQ0MsUUFBUUMsVUFBVSxHQUFHUCwrQ0FBUUEsQ0FBQyxLQUFLO0lBQzFDLE1BQU1RLGlCQUFpQjtRQUNuQkMsVUFBVTtRQUNWQyxPQUFPO1FBQ1BDLE9BQU87UUFDUEMsVUFBVTtJQUNkO0lBQ0EsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdkLCtDQUFRQSxDQUFDUTtJQUMvQyxNQUFNTyxXQUFXLENBQUNDLElBQU07UUFDcEJGLGVBQWU7WUFBRSxHQUFHRCxXQUFXO1lBQUUsQ0FBQ0csRUFBRUMsTUFBTSxDQUFDQyxJQUFJLENBQUMsRUFBRUYsRUFBRUMsTUFBTSxDQUFDRSxLQUFLO1FBQUM7UUFDakVDLFFBQVFDLEdBQUcsQ0FBQ1I7SUFDaEI7SUFDQSxxQkFDSTtrQkFDSSw0RUFBQ1M7WUFBS0MsV0FBVTs7OEJBQ1osOERBQUNyQiw2REFBTUE7b0JBQUNLLFdBQVdBOzs7Ozs7OEJBQ25CLDhEQUFDaUI7b0JBQVFELFdBQVcsZUFBa0UsT0FBbkRqQixXQUFXLElBQUksR0FBRyxhQUFhLG1CQUFtQixFQUFDOztzQ0FDbEYsOERBQUNGLGtFQUFXQTs7Ozs7c0NBQ1osOERBQUNvQjs0QkFBUUQsV0FBVTs7OENBQ2YsOERBQUNFO29DQUFHRixXQUFVOzhDQUFnQjs7Ozs7OzhDQUM5Qiw4REFBQ0c7b0NBQUtILFdBQVU7O3NEQUNaLDhEQUFDSTs0Q0FBR0osV0FBVTtzREFBVTs7Ozs7O3NEQUN4Qiw4REFBQ0s7c0RBQUU7Ozs7OztzREFDQyw4REFBQ0M7NENBQUlOLFdBQVU7c0RBQ1gsNEVBQUNPO2dEQUFNUCxXQUFVO2dEQUEwQ1EsTUFBSztnREFBV2IsTUFBSztnREFBWWMsSUFBRztnREFBWUMsVUFBVWxCO2dEQUFVbUIsYUFBWTs7Ozs7Ozs7Ozs7c0RBRS9JLDhEQUFDTDs0Q0FBSU4sV0FBVTtzREFDWCw0RUFBQ087Z0RBQU1QLFdBQVU7Z0RBQTBDUSxNQUFLO2dEQUFRYixNQUFLO2dEQUFRYyxJQUFHO2dEQUFRQyxVQUFVbEI7Z0RBQVVtQixhQUFZOzs7Ozs7Ozs7OztzREFFeEksOERBQUNMOzRDQUFJTixXQUFVO3NEQUNYLDRFQUFDcEIsNkRBQU1BO2dEQUFDZ0IsT0FBTTtnREFBV1ksTUFBSztnREFBU0ksU0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUS9FLENBQUM7R0F2Q3VCOUI7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdXNlci9vcmRlcnMuanM/NzMyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xyXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL3N1YmNvbXBvbmVudHMvX25hdmJhcic7XHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vc3ViY29tcG9uZW50cy9fYnV0dG9uJztcclxuaW1wb3J0IEFjY291bnRNZW51IGZyb20gJy4uL3N1YmNvbXBvbmVudHMvX2FjY291bnRtZW51J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT3JkZXJzKCkge1xyXG4gICAgY29uc3QgW2V4cGFuZCwgc2V0RXhwYW5kXSA9IHVzZVN0YXRlKGZhbHNlKVxyXG4gICAgY29uc3QgaW5pdGlhbEZvcm1PYmogPSB7XHJcbiAgICAgICAgdXNlcm5hbWU6ICcnLFxyXG4gICAgICAgIGVtYWlsOiAnJyxcclxuICAgICAgICBwaG9uZTogJycsXHJcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxyXG4gICAgfVxyXG4gICAgY29uc3QgW2NyZWRlbnRpYWxzLCBzZXRDcmVkZW50aWFsc10gPSB1c2VTdGF0ZShpbml0aWFsRm9ybU9iailcclxuICAgIGNvbnN0IG9uY2hhbmdlID0gKGUpID0+IHtcclxuICAgICAgICBzZXRDcmVkZW50aWFscyh7IC4uLmNyZWRlbnRpYWxzLCBbZS50YXJnZXQubmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coY3JlZGVudGlhbHMpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxtYWluIGNsYXNzTmFtZT1cImJnLWdyYXktMTAwIHctZnVsbCBoLXNjcmVlbiBmb250X2Z1dHVyYUxUXCI+XHJcbiAgICAgICAgICAgICAgICA8TmF2YmFyIHNldEV4cGFuZD17c2V0RXhwYW5kfSAvPlxyXG4gICAgICAgICAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPXtgYmctZ3JheS0xMDAgJHtleHBhbmQgPT09IHRydWUgPyAnbGc6dy0zLzQnIDogJ3ctZnVsbCBsZzp3LVs5NSVdJ30gaC1mdWxsIGxnOmZpeGVkIHJpZ2h0LTAgZmxleCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03MDBgfT5cclxuICAgICAgICAgICAgICAgICAgICA8QWNjb3VudE1lbnUgLz5cclxuICAgICAgICAgICAgICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9J3ctZnVsbCBsZzp3LVs2NyVdIGZvbnRfZnV0dXJhTFQgdGV4dC1sZWZ0IHAtOSBwbC03IG92ZXJmbG93LXktc2Nyb2xsIHNjcm9sbC1weS0xMCcgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0zeGwgbWItNFwiPlRyYWNrIFlvdXIgT3JkZXI8L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9XCJtdC0xNiBwYi0yMCBmb250X2Z1dHVyYUxUIHNwYWNlLXktMTBcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bFwiPkVudGVyIFlvdXIgT3JkZXIgSW5mb3JtYXRpb248L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+RW50ZXIgeW91ciBlbWFpbCBhZGRyZXNzIGFuZCBvcmRlciBudW1iZXIgaW4gdGhlIHNwYWNlIGJlbG93IGFuZCB3ZSB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBsaXN0IG9mIHRoZSBpdGVtcyB5b3Ugb3JkZXJlZCBhbmQgdGhlIHJlbGV2YW50IHNoaXBwaW5nIGluZm9ybWF0aW9uLiBJZiB5b3UgaGF2ZSBvbmx5IGp1c3QgY29uZmlybWVkIHlvdXIgb3JkZXIsIHRoaXMgaW5mb3JtYXRpb24gdzBpbGwgYXBwZWFyIGluIGEgZmV3IG1pbnV0ZXMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGRhdGFfZmllbGQgZmxleCBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLWItZ3JheS00MDAgZm9jdXM6Ym9yZGVyLXllbGxvdy03MDAgaG92ZXI6Ym9yZGVyLXllbGxvdy02MDAgdHJhbnNpdGlvbiBweS0yIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJnLXRyYW5zcGFyZW50IG91dGxpbmUtbm9uZSBib3JkZXItbm9uZVwiIHR5cGU9XCJsYXN0bmFtZVwiIG5hbWU9XCJ0bGFzdG5hbWVcIiBpZD1cInRsYXN0bmFtZVwiIG9uQ2hhbmdlPXtvbmNoYW5nZX0gcGxhY2Vob2xkZXI9XCJMYXN0IE5hbWVcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGRhdGFfZmllbGQgZmxleCBpdGVtcy1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLWItZ3JheS00MDAgZm9jdXM6Ym9yZGVyLXllbGxvdy03MDAgaG92ZXI6Ym9yZGVyLXllbGxvdy02MDAgdHJhbnNpdGlvbiBweS0yIG1iLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImJnLXRyYW5zcGFyZW50IG91dGxpbmUtbm9uZSBib3JkZXItbm9uZVwiIHR5cGU9XCJlbWFpbFwiIG5hbWU9XCJlbWFpbFwiIGlkPVwiZW1haWxcIiBvbkNoYW5nZT17b25jaGFuZ2V9IHBsYWNlaG9sZGVyPVwiRW1haWwqXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXgganVzdGlmeS1lbmQgc3BhY2UteC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiB2YWx1ZT1cIkNvbnRpbnVlXCIgdHlwZT1cInN1Ym1pdFwiIGNsYXNzZXM9XCJ3LWZ1bGwgbWQ6dy0yLzEyXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8L21haW4+XHJcbiAgICAgICAgPC8+XHJcbiAgICApXHJcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkxpbmsiLCJOYXZiYXIiLCJCdXR0b24iLCJBY2NvdW50TWVudSIsIk9yZGVycyIsImV4cGFuZCIsInNldEV4cGFuZCIsImluaXRpYWxGb3JtT2JqIiwidXNlcm5hbWUiLCJlbWFpbCIsInBob25lIiwicGFzc3dvcmQiLCJjcmVkZW50aWFscyIsInNldENyZWRlbnRpYWxzIiwib25jaGFuZ2UiLCJlIiwidGFyZ2V0IiwibmFtZSIsInZhbHVlIiwiY29uc29sZSIsImxvZyIsIm1haW4iLCJjbGFzc05hbWUiLCJzZWN0aW9uIiwiaDIiLCJmb3JtIiwiaDMiLCJwIiwiZGl2IiwiaW5wdXQiLCJ0eXBlIiwiaWQiLCJvbkNoYW5nZSIsInBsYWNlaG9sZGVyIiwiY2xhc3NlcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/user/orders.js\n"));

/***/ })

});
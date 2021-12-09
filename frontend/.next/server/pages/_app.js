"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 510:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);



function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                        rel: "stylesheet",
                        href: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("script", {
                        // import { Link } from "react-router-dom"
                        // import { useState } from "react"
                        // export default function signIn() {
                        //     const [email,setEmail] = useState('')
                        //     const [password,setPassword] = useState('')
                        //        const handleSubmit = async (e)=>{
                        //         e.preventDefault()
                        //         try{
                        //           const result = await auth.signInWithEmailAndPassword(email,password)
                        //           M.toast({html: `welcome ${result.user.displayName}`,classes:"green"})  
                        //         }catch(err){
                        //           M.toast({html: err.message,classes:"red"})    
                        //         }
                        //      }
                        //     return (
                        //         <div className="container center">
                        //         <h3>Plase Login!!</h3>
                        //          <form onSubmit={(e)=>handleSubmit(e)}>
                        //              <div className="input-field">
                        //                  <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        //                  <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        //              </div>
                        //              <button type="submit" className="btn #fb8c00 orange darken-1">Login</button>
                        //             <Link href="/signup"><a><h5>Dont Have a account</h5></a></Link>
                        //          </form>
                        //     </div>
                        //     )
                        // }
                        defer: true,
                        src: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                ...pageProps
            })
        ]
    }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);


/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(510));
module.exports = __webpack_exports__;

})();
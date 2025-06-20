/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/login/route";
exports.ids = ["app/api/auth/login/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/login/route.ts":
/*!*************************************!*\
  !*** ./app/api/auth/login/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function POST(request) {\n    try {\n        const { username, password } = await request.json();\n        // Validate credentials\n        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {\n            // Create JWT token\n            const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n                username,\n                authenticated: true\n            }, process.env.JWT_SECRET, {\n                expiresIn: '24h'\n            });\n            // Create response with token in httpOnly cookie\n            const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: 'Login successful'\n            }, {\n                status: 200\n            });\n            response.cookies.set('auth-token', token, {\n                httpOnly: true,\n                secure: false,\n                sameSite: 'lax',\n                maxAge: 24 * 60 * 60,\n                path: '/'\n            });\n            return response;\n        } else {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid credentials'\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        console.error('Login error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvbG9naW4vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUF3RDtBQUN6QjtBQUV4QixlQUFlRSxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1GLFFBQVFHLElBQUk7UUFFakQsdUJBQXVCO1FBQ3ZCLElBQ0VGLGFBQWFHLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYyxJQUN2Q0osYUFBYUUsUUFBUUMsR0FBRyxDQUFDRSxjQUFjLEVBQ3ZDO1lBQ0EsbUJBQW1CO1lBQ25CLE1BQU1DLFFBQVFWLHdEQUFRLENBQ3BCO2dCQUFFRztnQkFBVVMsZUFBZTtZQUFLLEdBQ2hDTixRQUFRQyxHQUFHLENBQUNNLFVBQVUsRUFDdEI7Z0JBQUVDLFdBQVc7WUFBTTtZQUdyQixnREFBZ0Q7WUFDaEQsTUFBTUMsV0FBV2hCLHFEQUFZQSxDQUFDTSxJQUFJLENBQ2hDO2dCQUFFVyxTQUFTO1lBQW1CLEdBQzlCO2dCQUFFQyxRQUFRO1lBQUk7WUFHaEJGLFNBQVNHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGNBQWNULE9BQU87Z0JBQ3hDVSxVQUFVO2dCQUNWQyxRQUFRO2dCQUNSQyxVQUFVO2dCQUNWQyxRQUFRLEtBQUssS0FBSztnQkFDbEJDLE1BQU07WUFDUjtZQUVBLE9BQU9UO1FBQ1QsT0FBTztZQUNMLE9BQU9oQixxREFBWUEsQ0FBQ00sSUFBSSxDQUN0QjtnQkFBRW9CLE9BQU87WUFBc0IsR0FDL0I7Z0JBQUVSLFFBQVE7WUFBSTtRQUVsQjtJQUNGLEVBQUUsT0FBT1EsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsZ0JBQWdCQTtRQUM5QixPQUFPMUIscURBQVlBLENBQUNNLElBQUksQ0FDdEI7WUFBRW9CLE9BQU87UUFBd0IsR0FDakM7WUFBRVIsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuXG4gICAgLy8gVmFsaWRhdGUgY3JlZGVudGlhbHNcbiAgICBpZiAoXG4gICAgICB1c2VybmFtZSA9PT0gcHJvY2Vzcy5lbnYuQURNSU5fVVNFUk5BTUUgJiZcbiAgICAgIHBhc3N3b3JkID09PSBwcm9jZXNzLmVudi5BRE1JTl9QQVNTV09SRFxuICAgICkge1xuICAgICAgLy8gQ3JlYXRlIEpXVCB0b2tlblxuICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcbiAgICAgICAgeyB1c2VybmFtZSwgYXV0aGVudGljYXRlZDogdHJ1ZSB9LFxuICAgICAgICBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISxcbiAgICAgICAgeyBleHBpcmVzSW46ICcyNGgnIH1cbiAgICAgICk7XG5cbiAgICAgIC8vIENyZWF0ZSByZXNwb25zZSB3aXRoIHRva2VuIGluIGh0dHBPbmx5IGNvb2tpZVxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcgfSxcbiAgICAgICAgeyBzdGF0dXM6IDIwMCB9XG4gICAgICApO1xuXG4gICAgICByZXNwb25zZS5jb29raWVzLnNldCgnYXV0aC10b2tlbicsIHRva2VuLCB7XG4gICAgICAgIGh0dHBPbmx5OiB0cnVlLFxuICAgICAgICBzZWN1cmU6IGZhbHNlLCAvLyBBbGxvdyBIVFRQIGluIGRldmVsb3BtZW50XG4gICAgICAgIHNhbWVTaXRlOiAnbGF4JywgLy8gQ2hhbmdlZCBmcm9tICdzdHJpY3QnIHRvICdsYXgnIGZvciBiZXR0ZXIgY29tcGF0aWJpbGl0eVxuICAgICAgICBtYXhBZ2U6IDI0ICogNjAgKiA2MCwgLy8gMjQgaG91cnNcbiAgICAgICAgcGF0aDogJy8nLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnSW52YWxpZCBjcmVkZW50aWFscycgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJqd3QiLCJQT1NUIiwicmVxdWVzdCIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJqc29uIiwicHJvY2VzcyIsImVudiIsIkFETUlOX1VTRVJOQU1FIiwiQURNSU5fUEFTU1dPUkQiLCJ0b2tlbiIsInNpZ24iLCJhdXRoZW50aWNhdGVkIiwiSldUX1NFQ1JFVCIsImV4cGlyZXNJbiIsInJlc3BvbnNlIiwibWVzc2FnZSIsInN0YXR1cyIsImNvb2tpZXMiLCJzZXQiLCJodHRwT25seSIsInNlY3VyZSIsInNhbWVTaXRlIiwibWF4QWdlIiwicGF0aCIsImVycm9yIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_luismerk_Library_CloudStorage_OneDrive_Perso_nlich_DHBW_Semester_4_Praxisprojekte_Karteikarten_Erstellung_karteikarten_webapp_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/login/route.ts */ \"(rsc)/./app/api/auth/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/login/route\",\n        pathname: \"/api/auth/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/login/route\"\n    },\n    resolvedPagePath: \"/Users/luismerk/Library/CloudStorage/OneDrive-Persönlich/DHBW/Semester 4/Praxisprojekte/Karteikarten-Erstellung/karteikarten-webapp/app/api/auth/login/route.ts\",\n    nextConfigOutput,\n    userland: _Users_luismerk_Library_CloudStorage_OneDrive_Perso_nlich_DHBW_Semester_4_Praxisprojekte_Karteikarten_Erstellung_karteikarten_webapp_app_api_auth_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGbG9naW4lMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmx1aXNtZXJrJTJGTGlicmFyeSUyRkNsb3VkU3RvcmFnZSUyRk9uZURyaXZlLVBlcnNvJUNDJTg4bmxpY2glMkZESEJXJTJGU2VtZXN0ZXIlMjA0JTJGUHJheGlzcHJvamVrdGUlMkZLYXJ0ZWlrYXJ0ZW4tRXJzdGVsbHVuZyUyRmthcnRlaWthcnRlbi13ZWJhcHAlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbHVpc21lcmslMkZMaWJyYXJ5JTJGQ2xvdWRTdG9yYWdlJTJGT25lRHJpdmUtUGVyc28lQ0MlODhubGljaCUyRkRIQlclMkZTZW1lc3RlciUyMDQlMkZQcmF4aXNwcm9qZWt0ZSUyRkthcnRlaWthcnRlbi1FcnN0ZWxsdW5nJTJGa2FydGVpa2FydGVuLXdlYmFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0g7QUFDN0w7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9sb2dpblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9sb2dpbi9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvYXBwL2FwaS9hdXRoL2xvZ2luL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Flogin%2Froute&page=%2Fapi%2Fauth%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Flogin%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
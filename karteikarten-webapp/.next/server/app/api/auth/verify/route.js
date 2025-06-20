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
exports.id = "app/api/auth/verify/route";
exports.ids = ["app/api/auth/verify/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/verify/route.ts":
/*!**************************************!*\
  !*** ./app/api/auth/verify/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nasync function GET() {\n    try {\n        const user = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyAuth)();\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Not authenticated'\n            }, {\n                status: 401\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: 'Authenticated',\n            user: {\n                username: user.username\n            }\n        }, {\n            status: 200\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Authentication verification failed'\n        }, {\n            status: 401\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvdmVyaWZ5L3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNIO0FBRWpDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1GLHFEQUFVQTtRQUU3QixJQUFJLENBQUNFLE1BQU07WUFDVCxPQUFPSCxxREFBWUEsQ0FBQ0ksSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFvQixHQUM3QjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsT0FBT04scURBQVlBLENBQUNJLElBQUksQ0FDdEI7WUFBRUcsU0FBUztZQUFpQkosTUFBTTtnQkFBRUssVUFBVUwsS0FBS0ssUUFBUTtZQUFDO1FBQUUsR0FDOUQ7WUFBRUYsUUFBUTtRQUFJO0lBRWxCLEVBQUUsT0FBT0QsT0FBTztRQUNkLE9BQU9MLHFEQUFZQSxDQUFDSSxJQUFJLENBQ3RCO1lBQUVDLE9BQU87UUFBcUMsR0FDOUM7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyB2ZXJpZnlBdXRoIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHZlcmlmeUF1dGgoKTtcbiAgICBcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ05vdCBhdXRoZW50aWNhdGVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiAnQXV0aGVudGljYXRlZCcsIHVzZXI6IHsgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUgfSB9LFxuICAgICAgeyBzdGF0dXM6IDIwMCB9XG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiAnQXV0aGVudGljYXRpb24gdmVyaWZpY2F0aW9uIGZhaWxlZCcgfSxcbiAgICAgIHsgc3RhdHVzOiA0MDEgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJ2ZXJpZnlBdXRoIiwiR0VUIiwidXNlciIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIm1lc3NhZ2UiLCJ1c2VybmFtZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/verify/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireAuth: () => (/* binding */ requireAuth),\n/* harmony export */   verifyAuth: () => (/* binding */ verifyAuth)\n/* harmony export */ });\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function verifyAuth() {\n    try {\n        const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const token = cookieStore.get('auth-token')?.value;\n        if (!token) {\n            return null;\n        }\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(token, process.env.JWT_SECRET);\n        return decoded;\n    } catch (error) {\n        return null;\n    }\n}\nasync function requireAuth() {\n    const user = await verifyAuth();\n    if (!user) {\n        throw new Error('Authentication required');\n    }\n    return user;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUErQjtBQUNRO0FBT2hDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxjQUFjLE1BQU1GLHFEQUFPQTtRQUNqQyxNQUFNRyxRQUFRRCxZQUFZRSxHQUFHLENBQUMsZUFBZUM7UUFFN0MsSUFBSSxDQUFDRixPQUFPO1lBQ1YsT0FBTztRQUNUO1FBRUEsTUFBTUcsVUFBVVAsMERBQVUsQ0FBQ0ksT0FBT0ssUUFBUUMsR0FBRyxDQUFDQyxVQUFVO1FBQ3hELE9BQU9KO0lBQ1QsRUFBRSxPQUFPSyxPQUFPO1FBQ2QsT0FBTztJQUNUO0FBQ0Y7QUFFTyxlQUFlQztJQUNwQixNQUFNQyxPQUFPLE1BQU1aO0lBQ25CLElBQUksQ0FBQ1ksTUFBTTtRQUNULE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1QiLCJzb3VyY2VzIjpbIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvbGliL2F1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aFVzZXIge1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5QXV0aCgpOiBQcm9taXNlPEF1dGhVc2VyIHwgbnVsbD4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xuICAgIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KCdhdXRoLXRva2VuJyk/LnZhbHVlO1xuXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQhKSBhcyBBdXRoVXNlcjtcbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWlyZUF1dGgoKTogUHJvbWlzZTxBdXRoVXNlcj4ge1xuICBjb25zdCB1c2VyID0gYXdhaXQgdmVyaWZ5QXV0aCgpO1xuICBpZiAoIXVzZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJyk7XG4gIH1cbiAgcmV0dXJuIHVzZXI7XG59XG4iXSwibmFtZXMiOlsiand0IiwiY29va2llcyIsInZlcmlmeUF1dGgiLCJjb29raWVTdG9yZSIsInRva2VuIiwiZ2V0IiwidmFsdWUiLCJkZWNvZGVkIiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJlcnJvciIsInJlcXVpcmVBdXRoIiwidXNlciIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_luismerk_Library_CloudStorage_OneDrive_Perso_nlich_DHBW_Semester_4_Praxisprojekte_Karteikarten_Erstellung_karteikarten_webapp_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/verify/route.ts */ \"(rsc)/./app/api/auth/verify/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/verify/route\",\n        pathname: \"/api/auth/verify\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/verify/route\"\n    },\n    resolvedPagePath: \"/Users/luismerk/Library/CloudStorage/OneDrive-Persönlich/DHBW/Semester 4/Praxisprojekte/Karteikarten-Erstellung/karteikarten-webapp/app/api/auth/verify/route.ts\",\n    nextConfigOutput,\n    userland: _Users_luismerk_Library_CloudStorage_OneDrive_Perso_nlich_DHBW_Semester_4_Praxisprojekte_Karteikarten_Erstellung_karteikarten_webapp_app_api_auth_verify_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZhdXRoJTJGdmVyaWZ5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRnZlcmlmeSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmx1aXNtZXJrJTJGTGlicmFyeSUyRkNsb3VkU3RvcmFnZSUyRk9uZURyaXZlLVBlcnNvJUNDJTg4bmxpY2glMkZESEJXJTJGU2VtZXN0ZXIlMjA0JTJGUHJheGlzcHJvamVrdGUlMkZLYXJ0ZWlrYXJ0ZW4tRXJzdGVsbHVuZyUyRmthcnRlaWthcnRlbi13ZWJhcHAlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGbHVpc21lcmslMkZMaWJyYXJ5JTJGQ2xvdWRTdG9yYWdlJTJGT25lRHJpdmUtUGVyc28lQ0MlODhubGljaCUyRkRIQlclMkZTZW1lc3RlciUyMDQlMkZQcmF4aXNwcm9qZWt0ZSUyRkthcnRlaWthcnRlbi1FcnN0ZWxsdW5nJTJGa2FydGVpa2FydGVuLXdlYmFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUg7QUFDOUw7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9sdWlzbWVyay9MaWJyYXJ5L0Nsb3VkU3RvcmFnZS9PbmVEcml2ZS1QZXJzb8yIbmxpY2gvREhCVy9TZW1lc3RlciA0L1ByYXhpc3Byb2pla3RlL0thcnRlaWthcnRlbi1FcnN0ZWxsdW5nL2thcnRlaWthcnRlbi13ZWJhcHAvYXBwL2FwaS9hdXRoL3ZlcmlmeS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL3ZlcmlmeVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC92ZXJpZnkvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvbHVpc21lcmsvTGlicmFyeS9DbG91ZFN0b3JhZ2UvT25lRHJpdmUtUGVyc2/MiG5saWNoL0RIQlcvU2VtZXN0ZXIgNC9QcmF4aXNwcm9qZWt0ZS9LYXJ0ZWlrYXJ0ZW4tRXJzdGVsbHVuZy9rYXJ0ZWlrYXJ0ZW4td2ViYXBwL2FwcC9hcGkvYXV0aC92ZXJpZnkvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fverify%2Froute&page=%2Fapi%2Fauth%2Fverify%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fverify%2Froute.ts&appDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fluismerk%2FLibrary%2FCloudStorage%2FOneDrive-Perso%CC%88nlich%2FDHBW%2FSemester%204%2FPraxisprojekte%2FKarteikarten-Erstellung%2Fkarteikarten-webapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();
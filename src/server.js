
// initial code in project

// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         "Content-Type": "text/plain"
//     });

//     res.end("Welcome to Buna Cafe Backend!");
// });

// server.listen(3000, () => {
//     console.log("Buna Café server running at http://localhost:3000");
// });





// second code in project copy paste from chatGpT



// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;

// const server = http.createServer((req, res) => {

//     if (req.url === "/") {

//         const filePath = path.join(
//             __dirname,
//             "../public/index.html"
//         );

//         fs.readFile(filePath, (error, data) => {

//             if (error) {

//                 res.writeHead(500, {
//                     "Content-Type": "text/plain"
//                 });

//                 res.end("Internal Server Error");

//                 return;
//             }

//             res.writeHead(200, {
//                 "Content-Type": "text/html"
//             });

//             res.end(data);
//         });

//         return;
//     }

//     res.writeHead(404, {
//         "Content-Type": "text/plain"
//     });

//     res.end("Page Not Found");
// });

// server.listen(PORT, () => {

//     console.log(
//         `Buna Café server running at http://localhost:${PORT}`
//     );

// });



// Third editing the code (our improved server)


// const http = require("http");
// const fs = require("fs");
// const path = require("path");

// const PORT = 3000;

// const publicDirectory = path.join(
//     __dirname,
//     "../public"
// );


// function getContentType(filePath) {

//     const extension = path.extname(filePath);

//     const contentTypes = {

//         ".html": "text/html",
//         ".css": "text/css",
//         ".js": "text/javascript",
//         ".json": "application/json",
//         ".png": "image/png",
//         ".jpg": "image/jpeg",
//         ".jpeg": "image/jpeg",
//         ".svg": "image/svg+xml"

//     };

//     return contentTypes[extension]
//         || "application/octet-stream";
// }


// const server = http.createServer((req, res) => {

//     let requestedPath = req.url;

//     if (requestedPath === "/") {
//         requestedPath = "/index.html";
//     }
   

//     const filePath = path.join(
//         publicDirectory,
//         requestedPath
//     );


//     fs.readFile(filePath, (error, data) => {

//         if (error) {

//             res.writeHead(404, {
//                 "Content-Type": "text/plain"
//             });

//             res.end("404 - File Not Found");

//             return;
//         }


//         const contentType = getContentType(filePath);


//         res.writeHead(200, {
//             "Content-Type": contentType
//         });


//         res.end(data);

//     });

// });


// server.listen(PORT, () => {

//     console.log(
//         `Buna Café server running at http://localhost:${PORT}`
//     );

// });





// 3 part

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = 3000;

const publicDirectory = path.join(
    __dirname,
    "../public"
);


function getContentType(filePath) {

    const extension = path.extname(filePath);

    const contentTypes = {

        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".svg": "image/svg+xml"

    };

    return (
        contentTypes[extension] ||
        "application/octet-stream"
    );
}


function sendJSON(res, statusCode, data) {

    res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });

    res.end(JSON.stringify(data));
}


function getMenu(res) {

    const menuPath = path.join(
        __dirname,
        "../data/menu.json"
    );

    fs.readFile(
        menuPath,
        "utf-8",
        (error, data) => {

            if (error) {

                sendJSON(res, 500, {
                    success: false,
                    message: "Unable to load menu."
                });

                return;
            }


            try {

                const menu = JSON.parse(data);

                sendJSON(res, 200, {
                    success: true,
                    count: menu.length,
                    data: menu
                });

            } catch (error) {

                sendJSON(res, 500, {
                    success: false,
                    message: "Menu data is invalid."
                });

            }

        }
    );
}


const server = http.createServer(
    (req, res) => {

        const requestUrl = new URL(
            req.url,
            `http://${req.headers.host}`
        );


        // =========================
        // API ROUTES
        // =========================

        if (
            req.method === "GET" &&
            requestUrl.pathname === "/api/menu"
        ) {

            getMenu(res);

            return;
        }


        // =========================
        // STATIC FILES
        // =========================

        let requestedPath = requestUrl.pathname;

        if (requestedPath === "/") {
            requestedPath = "/index.html";
        }


        const filePath = path.join(
            publicDirectory,
            requestedPath
        );


        fs.readFile(
            filePath,
            (error, data) => {

                if (error) {

                    res.writeHead(404, {
                        "Content-Type":
                            "text/plain"
                    });

                    res.end(
                        "404 - File Not Found"
                    );

                    return;
                }


                const contentType =
                    getContentType(filePath);


                res.writeHead(200, {
                    "Content-Type":
                        contentType
                });


                res.end(data);

            }
        );

    }
);


server.listen(
    PORT,
    () => {

        console.log(
            `Buna Café server running at http://localhost:${PORT}`
        );

    }
);


// The most important diagram so far to understand the code

            //         CUSTOMER
            //            │
            //            │
            //            ↓
            //      Web Browser
            //            │
            //            │
            //      GET /api/menu
            //            │
            //            ↓
            //   ┌────────────────┐
            //   │  http module   │
            //   └───────┬────────┘
            //           │
            //           ↓
            //      req.method
            //          GET
            //           │
            //           ↓
            //   URL Core Module
            //           │
            //           ↓
            //   /api/menu
            //           │
            //           ↓
            //     Route Match
            //           │
            //           ↓
            //      getMenu()
            //           │
            //           ↓
            //    path.join()
            //           │
            //           ↓
            //     menu.json
            //           │
            //           ↓
            //      fs.readFile
            //           │
            //           ↓
            //     JSON.parse()
            //           │
            //           ↓
            //    sendJSON()
            //           │
            //           ↓
            //      HTTP 200
            //           │
            //           ↓
            //       Browser
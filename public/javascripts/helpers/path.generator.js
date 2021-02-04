const path = require("path");

const generatePath = (path) => {
    let pathArr = path.split("\\");
    pathArr.shift();
    return pathArr.join("/");
}

module.exports = { generatePath }


(async () => {
    await require("./models/db").syncPromise;
    require("./importer/importer");
    require("./frontend/server");
})();
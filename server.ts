(async () => {
    await require("./models/db").syncPromise;
    require("./frontend/server");
})();
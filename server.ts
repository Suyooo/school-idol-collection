(async () => {
    await require("./models/db").awaitSync;
    require("./frontend/server");
})();
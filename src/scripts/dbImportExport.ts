import fs from "fs";
import DBPromise, { modelList } from "$models/db.js";

/* Run with env variable TEST=true to allow DB access */

(async () => {
	if (process.argv.length < 3 || (process.argv[2] !== "import" && process.argv[2] !== "export")) {
		console.error("TEST=true vite-node src/scripts/dbImportExport.ts [import/export]");
		process.exit(1);
	}

	const DB = await DBPromise;

	if (process.argv[2] === "import") {
		const importData: Record<string, any[]> = JSON.parse(fs.readFileSync("db.json").toString());
		DB.transaction(async (transaction) => {
			for (const model of modelList) {
				const tableName = model.getTableName().tableName;

				for (const row of importData[tableName]) {
					// Use queryInterface to circumvent the validation methods defined in the models
					await DB.queryInterface.upsert(tableName, row, row, {}, { model, transaction });
				}
			}
		});
	} else {
		const exportData: Record<string, any[]> = {};
		for (const model of modelList) {
			const data = [];

			for (const row of await model.findAll()) {
				data.push(row.get({ plain: true }));
			}

			exportData[model.getTableName().tableName] = data;
		}
		fs.writeFileSync("db.json", JSON.stringify(exportData, null, "\t"));
	}
})();

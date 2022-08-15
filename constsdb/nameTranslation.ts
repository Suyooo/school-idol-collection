import DB from "../utils/db";

const nameTranslationStmt = DB.prepare("SELECT eng FROM table_names WHERE jpn = ?");

export default function NameTranslation(jpn: string): string | undefined {
    return nameTranslationStmt.get(jpn)?.eng;
}
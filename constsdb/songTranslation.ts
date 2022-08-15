import DB from "../utils/db";

const songTranslationStmt = DB.prepare("SELECT eng FROM table_songs WHERE jpn = ?");

export default function SongTranslation(jpn: string): string | undefined {
    return songTranslationStmt.get(jpn)?.eng;
}
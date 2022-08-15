CREATE TRIGGER block_cards_type_update BEFORE UPDATE OF type ON cards
WHEN OLD.type != NEW.type
BEGIN
	SELECT RAISE(FAIL, "can't update card type, please delete and re-insert");
END;
CREATE TRIGGER check_member_idolizable BEFORE INSERT ON cards_members_idolizedpieces
WHEN NEW.members_m_cardno NOT IN (SELECT cards_m_cardno FROM cards_members WHERE idolize_type=2)
BEGIN
	SELECT RAISE(FAIL, "that card is not idolizable with piece bonus (according to the cards_members table");
END;
CREATE TRIGGER check_card_type_member BEFORE INSERT ON cards_members
WHEN NEW.cards_m_cardno NOT IN (SELECT cardno FROM cards WHERE type=0)
BEGIN
	SELECT RAISE(FAIL, "that card is not a member card (according to the cards table");
END;
CREATE TRIGGER check_card_type_song BEFORE INSERT ON cards_songs
WHEN NEW.cards_m_cardno NOT IN (SELECT cardno FROM cards WHERE type=1)
BEGIN
	SELECT RAISE(FAIL, "that card is not a song card (according to the cards table)");
END;
CREATE TRIGGER check_req_type_any BEFORE INSERT ON cards_songs_anyreq
WHEN NEW.songs_m_cardno NOT IN (SELECT cards_m_cardno FROM cards_songs WHERE req_type=0)
BEGIN
	SELECT RAISE(FAIL, "that song does not have an any piece requirement (according to the cards_songs table");
END;
CREATE TRIGGER check_req_type_attr BEFORE INSERT ON cards_songs_attrreq
WHEN NEW.songs_m_cardno NOT IN (SELECT cards_m_cardno FROM cards_songs WHERE req_type=1)
BEGIN
	SELECT RAISE(FAIL, "that song does not have an attribute piece requirement (according to the cards_songs table");
END;
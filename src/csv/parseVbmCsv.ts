// Bezeichnung Auftragskonto;
// IBAN Auftragskonto;
// BIC Auftragskonto;
// Bankname Auftragskonto;
// Buchungstag;
// Valutadatum;
// Name Zahlungsbeteiligter;
// IBAN Zahlungsbeteiligter;
// BIC (SWIFT-Code) Zahlungsbeteiligter;
// Buchungstext;
// Verwendungszweck;
// Betrag;
// Waehrung;
// Saldo nach Buchung;
// Bemerkung;
// Kategorie;
// Steuerrelevant;
// Glaeubiger ID;
// Mandatsreferenz

export function parseVbmCsv(content: string) {
    const lines = content.split("\n")
    return lines
        .map(line => line.split(";"))
        .filter((line, idx) => line.length == 19 && idx !== 0)
        .map(f => {
            return {
                date: f[4],
                account: f[6],
                purpose: f[10],
                value: parseInt(f[11].replace(',', ""))
            }
        })
}
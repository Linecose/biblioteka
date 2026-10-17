# ndihmes.es - funksione te vogla ndihmese (porti i utils/date_format.dart)

konstante MUAJT = ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nen", "Dhj"]

# Kthen daten si tekst, p.sh. "12 Tet 2026"
funksion formato_daten(data) {
    kthe `${data.getDate()} ${MUAJT[data.getMonth()]} ${data.getFullYear()}`
}

# Vetem data (pa ore) ne UTC: diferenca ne dite del e sakte edhe kur ndryshon ora verore.
funksion vetem_data(data) {
    kthe Date.UTC(data.getFullYear(), data.getMonth(), data.getDate())
}

funksion ditet_midis(nga, deri) {
    kthe Math.round((vetem_data(deri) - vetem_data(nga)) / 86400000)
}

module.exports = { formato_daten, vetem_data, ditet_midis }

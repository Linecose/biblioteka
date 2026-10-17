# stili.es - ngjyrat dhe stilet e perbashketa (porti i app/theme.dart)
# Nese duam te ndryshojme pamjen e aplikacionit, e ndryshojme vetem ketu.

konstante NGJYRAT = {
    primare: "#2F4B8C",
    primare_erret: "#1B2D5E",
    theksi: "#F2A93B",
    sfondi: "#F4F6FB",
    kufiri: "#E4E7F0",
    sukses: "#2E9E6B",
    paralajmerim: "#E08A00",
    rrezik: "#D64545",
    tekst: "#1F2437",
    tekst_i_zbehte: "#6B7287"
}

# "#RRGGBB" + alfa 0-255  ->  "rgba(r, g, b, a)"  (si Color.withAlpha ne Flutter)
funksion rgba(hex, alfa) {
    konstante r = parseInt(hex.slice(1, 3), 16)
    konstante g = parseInt(hex.slice(3, 5), 16)
    konstante b = parseInt(hex.slice(5, 7), 16)
    kthe `rgba(${r}, ${g}, ${b}, ${alfa})`
}

# Ngjyra e perzier me te zezen (si Color.lerp(c, zi, sasia))
funksion erresoje(hex, sasia) {
    konstante pjesa = (nga) => {
        konstante v = parseInt(hex.slice(nga, nga + 2), 16)
        kthe Math.round(v * (1 - sasia)).toString(16).padStart(2, "0")
    }
    kthe "#" + pjesa(1) + pjesa(3) + pjesa(5)
}

# Ikona: NodeGui s'ka ikona Material, ndaj perdorim simbole Unicode/emoji.
konstante IKONA = {
    kreu: "🏠", librat: "📚", njoftime: "🔔", profili: "👤",
    liber: "📖", karte: "🪪", qr: "▦", afati: "📅", historiku: "🕘",
    paralajmerim: "⚠", alarm: "⏰", marrje: "⬇", kthim: "✔", info: "ℹ",
    kthehu: "‹", mbrapa: "←", emaili: "✉", telefoni: "☎", id: "#", dil: "⎋",
    klasa: "🎓", emri: "👤", statusi: "✔", mbyllur: "🔒", shigjeta: "›"
}

# Stili global i dritares: sfondi dhe ngjyra baze e tekstit.
konstante STILI_GLOBAL = `
    QMainWindow, QWidget#eagle-rrenja { background-color: ${NGJYRAT.sfondi}; }
    QLabel { background: transparent; color: ${NGJYRAT.tekst}; font-size: 14px; }
    QLineEdit {
        background: white; border: 1px solid ${NGJYRAT.kufiri}; border-radius: 12px;
        padding: 12px 14px; font-size: 14px; color: ${NGJYRAT.tekst};
    }
    QLineEdit:focus { border: 2px solid ${NGJYRAT.primare}; }
    QScrollArea { border: none; background: transparent; }
    QScrollArea > QWidget > QWidget { background: transparent; }
`

module.exports = { NGJYRAT, IKONA, STILI_GLOBAL, rgba, erresoje }

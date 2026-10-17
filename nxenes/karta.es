# karta.es - karta digjitale e plote (porti i library_card_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesi_aktual } = perfshi("../te_dhenat.es")
konstante {
    tekst, karta_digjitale, karte_ime, rresht_info, ndares, buton_primar, buton_dytesor, faqe_me_titull
} = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante nxenesi = nxenesi_aktual
    konstante faqja = faqe_me_titull("Karta digjitale", () => navigimi.kthehu())
    konstante p = faqja.permbajtja

    p.shto(karta_digjitale(nxenesi))
    p.shto_hapesire(8)
    p.shto(buton_primar(IKONA.qr + "  Shfaq QR-ne time", () => navigimi.shko("qr")))
    p.shto(buton_dytesor("Shto ne Wallet", () => shfaq_mesazh("Demo", "Shtimi ne Wallet - funksion i ardhshem.")))

    konstante info = karte_ime("vertikal")
    info.vendos_hapesira(6)
    info.shto(rresht_info(IKONA.emri, "Emri", nxenesi.emri_i_plote))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.klasa, "Klasa", nxenesi.klasa_emri))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.statusi, "Statusi", "Aktive"))
    p.shto(info)

    p.shto(tekst("Kjo karte eshte digjitale. Tregoja QR-ne bibliotekares sa here qe do te marresh ose kthesh nje liber.", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

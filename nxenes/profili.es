# profili.es - skeda "Profili" e nxenesit (porti i student_profile_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesi_aktual } = perfshi("../te_dhenat.es")
konstante { tekst, avatar, karte_ime, rresht_info, ne_mes, buton_dytesor, faqe_pa_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante nxenesi = nxenesi_aktual
    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja

    p.shto(ne_mes(avatar(nxenesi, 88)))
    p.shto(tekst(nxenesi.emri_i_plote, { madhesia: 22, trashe: vertete, rreshtim: "qender" }))
    p.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))

    konstante info = karte_ime("vertikal")
    info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
    info.shto(rresht_info(IKONA.emaili, "Email", nxenesi.emaili))
    info.shto(rresht_info(IKONA.telefoni, "Telefon", nxenesi.telefoni))
    p.shto(info)

    # Nje rresht i menuse (ikone + tekst + shigjete)
    konstante rresht_menuje = (ikona, etiketa, onKlik) => {
        konstante k = karte_ime("horizontal", { margina: [16, 14, 16, 14], onKlik })
        k.vendos_hapesira(14)
        k.shto(tekst(ikona, { madhesia: 18, ngjyra: NGJYRAT.primare, mbulo: gabim_val }))
        k.shto(tekst(etiketa, { trashe: vertete }), 1)
        k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val }))
        kthe k
    }
    p.shto(rresht_menuje(IKONA.karte, "Karta ime digjitale", () => navigimi.shko("karta")))
    p.shto(rresht_menuje(IKONA.qr, "QR-ja ime", () => navigimi.shko("qr")))
    p.shto(rresht_menuje(IKONA.afati, "Afati i kthimit", () => navigimi.shko("afatet")))
    p.shto(rresht_menuje("✎", "Ndrysho profilin", () => shfaq_mesazh("Demo", "Ndryshimi i profilit - funksion i ardhshem.")))

    # "Dil" -> kthehu te ekrani i pare dhe fshi historikun
    p.shto(buton_dytesor(IKONA.dil + "  Dil", () => navigimi.shko_dhe_fshi("welcome"), NGJYRAT.rrezik))
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

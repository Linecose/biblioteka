# qr_im.es - QR-ja personale e nxenesit (porti i my_qr_screen.dart)
# DEMO: QR-ja eshte vetem imazh dekorativ (placeholder), jo kod real.

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { nxenesi_aktual } = perfshi("../te_dhenat.es")
konstante { tekst, qr, ne_mes, karte_ime, buton_dytesor, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante nxenesi = nxenesi_aktual
    konstante faqja = faqe_me_titull("QR-ja ime", () => navigimi.kthehu())
    konstante p = faqja.permbajtja
    p.vendos_hapesira(14)

    p.shto_shtrirje()
    konstante karta = karte_ime("vertikal", { margina: 20 })
    karta.vendos_hapesira(10)
    karta.shto(ne_mes(qr(nxenesi.id, 260)))
    karta.shto(tekst(nxenesi.emri_i_plote, { madhesia: 20, trashe: vertete, rreshtim: "qender" }))
    karta.shto(tekst(`${nxenesi.id} · ${nxenesi.klasa_emri}`, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto(karta)

    p.shto(tekst("Tregoja kete kod bibliotekares per te marre ose kthyer nje liber.", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto(tekst("QR demonstrues — nuk eshte kod real dhe nuk skanohet.", { madhesia: 12, trashe: vertete, ngjyra: NGJYRAT.paralajmerim, rreshtim: "qender" }))
    p.shto_shtrirje()
    p.shto(buton_dytesor("⬇  Ruaj si imazh", () => shfaq_mesazh("Demo", "Ruajtja e QR-se - funksion i ardhshem.")))
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

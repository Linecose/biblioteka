# detaje_libri.es - detajet e nje libri, pamja e nxenesit (porti i student_book_details_screen.dart)
# Libri vjen si argument: navigimi.shko("detaje_libri", libri) -> therret hap(libri).

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesi_aktual, huazimet_aktive_te } = perfshi("../te_dhenat.es")
konstante { formato_daten } = perfshi("./../ndihmes.es")
konstante {
    tekst, karte_ime, kopertina, chip_disponueshmerie, chip_huazimi, kuti_fakti, seksion, rresht_info,
    ne_mes, buton_dytesor, faqe_me_titull
} = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Detajet e librit", () => navigimi.kthehu())

    # Ndertohet nga e para sa here qe hapet, sepse varet nga libri i zgjedhur.
    funksion hap(libri) {
        konstante p = faqja.permbajtja
        p.pastro()

        # A e ka huazuar nxenesi aktual kete liber?
        konstante huazimi_im = huazimet_aktive_te(nxenesi_aktual).find((h) => h.libri.id === libri.id)

        p.shto(ne_mes(kopertina(libri, 150)))
        p.shto(tekst(libri.titulli, { madhesia: 22, trashe: vertete, rreshtim: "qender" }))
        p.shto(tekst(libri.autori, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
        p.shto(ne_mes(chip_disponueshmerie(libri)))

        konstante faktet = kontejner("horizontal")
        faktet.vendos_hapesira(10)
        faktet.shto(kuti_fakti("▤", libri.kategoria, "Kategoria"), 1)
        faktet.shto(kuti_fakti(IKONA.afati, libri.viti, "Viti"), 1)
        faktet.shto(kuti_fakti(IKONA.liber, libri.faqe, "Faqe"), 1)
        p.shto(faktet)

        # Karte me afatin - vetem nese nxenesi e ka huazuar librin
        nese (huazimi_im) {
            konstante k = karte_ime("vertikal")
            k.vendos_hapesira(8)
            konstante koka = kontejner("horizontal")
            koka.shto(tekst("Huazimi im", { madhesia: 16, trashe: vertete }), 1)
            koka.shto(chip_huazimi(huazimi_im))
            k.shto(koka)
            k.shto(rresht_info("⇥", "Marre me", formato_daten(huazimi_im.data_marrjes)))
            k.shto(rresht_info("📅", "Afati", formato_daten(huazimi_im.afati)))
            p.shto(k)
            p.shto(buton_dytesor("Shiko te gjitha afatet", () => navigimi.shko("afatet")))
        }

        p.shto(seksion("Pershkrimi"))
        p.shto(tekst(libri.pershkrimi))

        konstante te_dhenat = karte_ime("vertikal")
        te_dhenat.shto(rresht_info(IKONA.qr, "Kodi i librit", libri.id))
        te_dhenat.shto(rresht_info("⌖", "Vendndodhja", libri.vendndodhja))
        p.shto(te_dhenat)
        p.shto_shtrirje()
    }

    kthe { widget: faqja.widget, hap }
}

module.exports = { krijo }

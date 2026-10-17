# detaje_libri.es (admin) - statusi i librit, QR-ja e tij dhe kush e ka huazuar
# (porti i admin_book_details_screen.dart). Libri vjen si argument: navigimi.shko("admin_libri", libri)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { huazimi_aktiv_i_librit } = perfshi("../te_dhenat.es")
konstante { formato_daten } = perfshi("../ndihmes.es")
konstante {
    tekst, karte_ime, kopertina, qr, chip_disponueshmerie, chip_huazimi, kuti_fakti, rresht_info, seksion, buton_primar, majtas, faqe_me_titull
} = perfshi("../komponente.es")
konstante { karte_nxenesi } = perfshi("./komponente_admin.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Detajet e librit", () => navigimi.kthehu())

    funksion hap(libri) {
        konstante p = faqja.permbajtja
        p.pastro()
        konstante huazimi = huazimi_aktiv_i_librit(libri)      # asnje nese libri eshte i lire

        # Koka: kopertina + titulli, autori, statusi
        konstante koka = kontejner("horizontal")
        koka.vendos_hapesira(16)
        koka.shto(kopertina(libri, 100))
        konstante kolona = kontejner("vertikal")
        kolona.vendos_hapesira(4)
        kolona.shto(tekst(libri.titulli, { madhesia: 20, trashe: vertete }))
        kolona.shto(tekst(libri.autori, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        kolona.shto_hapesire(6)
        kolona.shto(majtas(chip_disponueshmerie(libri)))
        kolona.shto_shtrirje()
        koka.shto(kolona, 1)
        p.shto(koka)

        konstante faktet = kontejner("horizontal")
        faktet.vendos_hapesira(10)
        faktet.shto(kuti_fakti("▤", libri.kategoria, "Kategoria"), 1)
        faktet.shto(kuti_fakti(IKONA.afati, libri.viti, "Viti"), 1)
        faktet.shto(kuti_fakti(IKONA.liber, libri.faqe, "Faqe"), 1)
        p.shto(faktet)

        # QR e librit (placeholder) + kodi dhe vendndodhja
        konstante karta_qr = karte_ime("horizontal")
        karta_qr.vendos_hapesira(16)
        karta_qr.shto(qr(libri.id, 96))
        konstante te_dhenat = kontejner("vertikal")
        te_dhenat.vendos_hapesira(4)
        te_dhenat.shto(tekst("QR e librit", { trashe: vertete }))
        te_dhenat.shto(tekst(libri.id, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        te_dhenat.shto(tekst(libri.vendndodhja, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        te_dhenat.shto_shtrirje()
        karta_qr.shto(te_dhenat, 1)
        p.shto(karta_qr)

        p.shto(seksion("Pershkrimi"))
        p.shto(tekst(libri.pershkrimi))

        # Kush e ka huazuar aktualisht (vetem nese libri eshte i huazuar)
        nese (huazimi) {
            p.shto(seksion("Huazuar nga"))
            p.shto(karte_nxenesi(huazimi.nxenesi, () => navigimi.shko("admin_nxenesi", huazimi.nxenesi)))
            konstante k = karte_ime("vertikal")
            k.shto(rresht_info("⇥", "Marre me", formato_daten(huazimi.data_marrjes)))
            k.shto(rresht_info("📅", "Afati", formato_daten(huazimi.afati)))
            k.shto(majtas(chip_huazimi(huazimi)))
            p.shto(k)
        }

        # Butoni ndryshon sipas gjendjes se librit
        p.shto(buton_primar(
            libri.i_lire ? "+  Huazo kete liber" : "↩  Regjistro kthimin",
            () => navigimi.shko("admin_huazim", {
                libri,
                nxenesi: huazimi ? huazimi.nxenesi : asnje,
                eshte_huazim: libri.i_lire
            })
        ))
        p.shto_shtrirje()
    }

    kthe { widget: faqja.widget, hap }
}

module.exports = { krijo }

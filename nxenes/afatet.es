# afatet.es - afati i kthimit: libra te marre me daten dhe shirit progresi (porti i due_dates_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { rgba } = perfshi("../stili.es")
konstante { nxenesi_aktual, huazimet_aktive_te } = perfshi("../te_dhenat.es")
konstante { formato_daten } = perfshi("../ndihmes.es")
konstante { tekst, karte_ime, kopertina, chip_huazimi, ngjyra_e_gjendjes, ekran_i_bosh, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Afati i kthimit", () => navigimi.kthehu())

    # Nje karte per cdo huazim: kopertina, titulli, afati, shiriti i progresit
    konstante karte_afati = (huazimi) => {
        konstante ngjyra = ngjyra_e_gjendjes(huazimi.gjendja())
        # Sa pjese e afatit ka kaluar (0 - 100) per shiritin e progresit
        konstante gjithsej = huazimi.ditet_gjithsej() <= 0 ? 1 : huazimi.ditet_gjithsej()
        konstante kaluar = Math.min(gjithsej, Math.max(0, gjithsej - huazimi.ditet_e_mbetura()))

        konstante k = karte_ime("vertikal", { onKlik: () => navigimi.shko("detaje_libri", huazimi.libri) })
        k.vendos_hapesira(10)

        konstante koka = kontejner("horizontal")
        koka.vendos_hapesira(12)
        koka.shto(kopertina(huazimi.libri, 44))
        konstante kolona = kontejner("vertikal")
        kolona.vendos_hapesira(2)
        kolona.shto(tekst(huazimi.libri.titulli, { madhesia: 15, trashe: vertete }))
        kolona.shto(tekst("Afati: " + formato_daten(huazimi.afati), { ngjyra: NGJYRAT.tekst_i_zbehte }))
        koka.shto(kolona, 1)
        koka.shto(chip_huazimi(huazimi))
        k.shto(koka)

        konstante shiriti = progres(0, 100)
        shiriti.vendos_vlere(Math.round(kaluar / gjithsej * 100))
        shiriti.vendos_format("")          # pa tekst brenda shiritit
        shiriti.vendos_madhesi_maksimale(16777215, 8)
        shiriti.vendos_stil(`
            QProgressBar { background-color: ${rgba(ngjyra, 30)}; border: none; border-radius: 4px; }
            QProgressBar::chunk { background-color: ${ngjyra}; border-radius: 4px; }
        `)
        k.shto(shiriti)
        k.shto(tekst(huazimi.etiketa_e_afatit(), { trashe: vertete, ngjyra: ngjyra }))
        kthe k
    }

    # Ndertohet çdo here qe hapet (te dhenat mund te kene ndryshuar)
    funksion hap() {
        konstante p = faqja.permbajtja
        p.pastro()
        konstante huazimet = huazimet_aktive_te(nxenesi_aktual)
        nese (huazimet.length === 0) {
            p.shto(ekran_i_bosh(IKONA.afati, "Nuk ke libra per t'u kthyer."))
        } ndryshe {
            p.shto(tekst("Do te marresh njoftim para çdo afati. Kthe librat ne kohe!", { ngjyra: NGJYRAT.tekst_i_zbehte }))
            per (konstante h te huazimet) { p.shto(karte_afati(h)) }
        }
        p.shto_shtrirje()
    }

    kthe { widget: faqja.widget, hap }
}

module.exports = { krijo }

# librat.es (admin) - lista e librave me kerkim dhe filtër Te gjithe / Te lire / Te huazuar
# (porti i books_list_screen.dart)

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { librat } = perfshi("../te_dhenat.es")
konstante { tekst, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
konstante { karte_libri, ndrues } = perfshi("./komponente_admin.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    leje kerkimi = ""
    leje filtri = 0          # 0 = te gjithe, 1 = te lire, 2 = te huazuar

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    p.shto(tekst("Librat", { madhesia: 26, trashe: vertete }))

    konstante fusha = fushe_teksti("Kerko titull, autor ose kod...")
    fusha.kur_ndryshon((vlera) => { kerkimi = vlera.toLowerCase(); rifresko() })
    p.shto(fusha)

    p.shto(ndrues(["Te gjithe", "Te lire", "Te huazuar"], 0, (i) => { filtri = i; rifresko() }).widget)

    konstante lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    funksion rifresko() {
        konstante te_gjetur = librat.filter((l) => {
            konstante pershtat_tekstin = l.titulli.toLowerCase().includes(kerkimi) ||
                l.autori.toLowerCase().includes(kerkimi) || l.id.toLowerCase().includes(kerkimi)
            konstante pershtat_filtrin = filtri === 0 || (filtri === 1 && l.i_lire) || (filtri === 2 && !l.i_lire)
            kthe pershtat_tekstin && pershtat_filtrin
        })
        lista.pastro()
        nese (te_gjetur.length === 0) {
            lista.shto(ekran_i_bosh("⌕", "Nuk u gjet asnje liber."))
        } ndryshe {
            per (konstante l te te_gjetur) {
                lista.shto(karte_libri(l, () => navigimi.shko("admin_libri", l)))
            }
        }
    }
    rifresko()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

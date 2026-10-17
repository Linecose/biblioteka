# nxenesit.es - lista e nxenesve me kerkim sipas emrit, klases ose ID-se (porti i students_list_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesit } = perfshi("../te_dhenat.es")
konstante { tekst, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
konstante { karte_nxenesi } = perfshi("./komponente_admin.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    leje kerkimi = ""

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    p.shto(tekst("Nxenesit", { madhesia: 26, trashe: vertete }))

    konstante fusha = fushe_teksti("Kerko nxenes...")
    fusha.kur_ndryshon((vlera) => { kerkimi = vlera.toLowerCase(); rifresko() })
    p.shto(fusha)

    konstante lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    # Rindërton listën sipas kerkimit (si ne Flutter me setState)
    funksion rifresko() {
        konstante te_gjetur = nxenesit.filter((n) =>
            n.emri_i_plote.toLowerCase().includes(kerkimi) ||
            n.klasa_emri.toLowerCase().includes(kerkimi) ||
            n.id.toLowerCase().includes(kerkimi)
        )
        lista.pastro()
        nese (te_gjetur.length === 0) {
            lista.shto(ekran_i_bosh("⌕", "Nuk u gjet asnje nxenes."))
        } ndryshe {
            per (konstante n te te_gjetur) {
                lista.shto(karte_nxenesi(n, () => navigimi.shko("admin_nxenesi", n)))
            }
        }
    }
    rifresko()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

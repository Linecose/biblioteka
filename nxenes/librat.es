# librat.es - skeda "Librat": librat e marre (aktive) dhe historiku (porti i borrowed_books_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesi_aktual, huazimet_aktive_te, huazimet_e_kthyera_te } = perfshi("../te_dhenat.es")
konstante { tekst, karte_huazimi, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    leje tregoAktivet = vertete        # vertete = "Te marre", gabim_val = "Historiku"

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    p.shto(tekst("Librat e mi", { madhesia: 26, trashe: vertete }))

    # --- Ndruesi Te marre / Historiku ---
    konstante ndruesi = kontejner("horizontal")
    ndruesi.vendos_hapesira(0)
    konstante buton_aktiv = buton_i_ri("Te marre")
    konstante buton_historiku = buton_i_ri("Historiku")
    ndruesi.shto(buton_aktiv, 1)
    ndruesi.shto(buton_historiku, 1)
    p.shto(ndruesi)

    konstante lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    konstante stili = (aktiv, anesia) => `
        QPushButton { background-color: ${aktiv ? NGJYRAT.primare : "white"}; color: ${aktiv ? "white" : NGJYRAT.tekst};
                      border: 1px solid ${aktiv ? NGJYRAT.primare : NGJYRAT.kufiri}; padding: 11px; font-size: 14px; font-weight: bold;
                      ${anesia === "majtas" ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : "border-top-right-radius: 12px; border-bottom-right-radius: 12px;"} }
    `

    # Rindërton listën sipas zgjedhjes (ne Flutter kjo behej me setState)
    funksion rifresko() {
        konstante huazimet = tregoAktivet ? huazimet_aktive_te(nxenesi_aktual) : huazimet_e_kthyera_te(nxenesi_aktual)
        buton_aktiv.vendos_stil(stili(tregoAktivet, "majtas"))
        buton_historiku.vendos_stil(stili(!tregoAktivet, "djathtas"))
        lista.pastro()
        nese (huazimet.length === 0) {
            lista.shto(ekran_i_bosh(IKONA.librat, "Nuk ka libra per t'u shfaqur."))
        } ndryshe {
            per (konstante h te huazimet) {
                # Prek nje liber -> hapet ekrani i detajeve me librin si argument
                lista.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("detaje_libri", h.libri) }))
            }
        }
    }
    buton_aktiv.kur_klikohet(() => { tregoAktivet = vertete; rifresko() })
    buton_historiku.kur_klikohet(() => { tregoAktivet = gabim_val; rifresko() })
    rifresko()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

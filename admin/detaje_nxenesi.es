# detaje_nxenesi.es - detajet e nje nxenesi (pamja e administratorit)
# (porti i admin_student_details_screen.dart). Nxenesi vjen si argument: navigimi.shko("admin_nxenesi", nxenesi)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { huazimet_aktive_te, huazimet_e_kthyera_te } = perfshi("../te_dhenat.es")
konstante { tekst, karte_ime, avatar, qr, rresht_info, seksion, ekran_i_bosh, karte_huazimi, buton_primar, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Detajet e nxenesit", () => navigimi.kthehu())

    # Ndertohet nga e para sa here qe hapet, sepse varet nga nxenesi i zgjedhur.
    funksion hap(nxenesi) {
        konstante p = faqja.permbajtja
        p.pastro()
        konstante aktive = huazimet_aktive_te(nxenesi)
        konstante historiku = huazimet_e_kthyera_te(nxenesi)

        # Koka: avatar, emri, klasa + QR personale e vogel (placeholder)
        konstante koka = kontejner("horizontal")
        koka.vendos_hapesira(14)
        koka.shto(avatar(nxenesi, 64))
        konstante emri = kontejner("vertikal")
        emri.vendos_hapesira(2)
        emri.shto(tekst(nxenesi.emri_i_plote, { madhesia: 20, trashe: vertete }))
        emri.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        koka.shto(emri, 1)
        koka.shto(qr(nxenesi.id, 64))
        p.shto(koka)

        konstante info = karte_ime("vertikal")
        info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
        info.shto(rresht_info(IKONA.emaili, "Email", nxenesi.emaili))
        info.shto(rresht_info(IKONA.telefoni, "Telefon", nxenesi.telefoni))
        p.shto(info)

        p.shto(buton_primar("+  Huazim i ri per kete nxenes", () => navigimi.shko("admin_huazim", { nxenesi, eshte_huazim: vertete })))

        p.shto(seksion(`Librat e marre (${aktive.length})`))
        nese (aktive.length === 0) {
            p.shto(ekran_i_bosh(IKONA.liber, "Nuk ka libra aktive."))
        } ndryshe {
            per (konstante h te aktive) {
                p.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("admin_libri", h.libri) }))
            }
        }

        nese (historiku.length > 0) {
            p.shto(seksion(`Historiku (${historiku.length})`))
            per (konstante h te historiku) {
                p.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("admin_libri", h.libri) }))
            }
        }
        p.shto_shtrirje()
    }

    kthe { widget: faqja.widget, hap }
}

module.exports = { krijo }

# login.es - hyrja e administratorit (porti i admin_login_screen.dart)
# DEMO: nuk kontrollon asgje - butoni te con direkt te paneli.

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { roli_i_adminit } = perfshi("../te_dhenat.es")
konstante { tekst, buton_primar, buton_tekst, ne_mes, logo, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("", () => navigimi.kthehu())
    konstante p = faqja.permbajtja

    p.shto(ne_mes(logo(72, gabim_val)))
    p.shto(tekst("Paneli i bibliotekes", { madhesia: 24, trashe: vertete, rreshtim: "qender" }))
    p.shto(tekst(`Hyr si ${roli_i_adminit.toLowerCase()} per te menaxhuar huazimet.`, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_hapesire(10)

    p.shto(fushe_teksti("Email ose emri i perdoruesit"))

    # Fusha e fjalekalimit + butoni "syri" per ta shfaqur/fshehur
    konstante fusha_fjalekalimi = fushe_fjalekalimi("Fjalekalimi")
    leje e_fshehur = vertete
    konstante syri = buton_tekst("👁", () => {
        e_fshehur = !e_fshehur
        fusha_fjalekalimi.shfaq_fjalekalimin(!e_fshehur)
    })
    konstante rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(6)
    rreshti.shto(fusha_fjalekalimi, 1)
    rreshti.shto(syri)
    p.shto(rreshti)

    konstante harrova = kontejner("horizontal")
    harrova.shto_shtrirje()
    harrova.shto(buton_tekst("Harrove fjalekalimin?", () => shfaq_mesazh("Demo", "Rivendosja e fjalekalimit - funksion i ardhshem.")))
    p.shto(harrova)

    # Pas "hyrjes" fshijme historikun, qe "kthehu" te mos çoje te hyrja
    p.shto(buton_primar("Hyr", () => navigimi.shko_dhe_fshi("admin_shell")))
    p.shto(tekst("Demo: nuk kerkohet asnje e dhene reale. Shtyp butonin per te vazhduar.", { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

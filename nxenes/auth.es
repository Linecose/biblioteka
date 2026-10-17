# auth.es - hyrja / regjistrimi i nxenesit (porti i student_auth_screen.dart)
# DEMO: nuk kontrollon asgjë - cdo buton te con direkt te Home.

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { tekst, buton_primar, buton_tekst, ne_mes, logo, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    leje eshte_hyrje = vertete         # vertete = "Hyr", gabim_val = "Regjistrohu"

    konstante faqja = faqe_me_titull("", () => navigimi.kthehu())
    konstante p = faqja.permbajtja
    p.vendos_hapesira(14)
    p.vendos_margina(24, 0, 24, 24)

    p.shto(ne_mes(logo(72, gabim_val)))
    konstante titulli = tekst("", { madhesia: 24, trashe: vertete, rreshtim: "qender" })
    konstante nentitulli = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" })
    p.shto(titulli)
    p.shto(nentitulli)

    # --- Ndërruesi Hyr / Regjistrohu ---
    konstante ndruesi = kontejner("horizontal")
    ndruesi.vendos_hapesira(0)
    konstante buton_hyr = buton_i_ri("Hyr")
    konstante buton_regjistrohu = buton_i_ri("Regjistrohu")
    ndruesi.shto(buton_hyr, 1)
    ndruesi.shto(buton_regjistrohu, 1)
    p.shto(ndruesi)

    # --- Fushat ---
    konstante fusha_emri = fushe_teksti("Emri dhe mbiemri")
    konstante fusha_klasa = fushe_teksti("Klasa (p.sh. 10-B)")
    konstante fusha_emaili = fushe_teksti("Email ose ID e nxenesit")
    konstante fusha_fjalekalimi = fushe_fjalekalimi("Fjalekalimi")
    konstante fusha_shtese = kontejner("vertikal")      # shfaqet vetem tek "Regjistrohu"
    fusha_shtese.vendos_hapesira(14)
    fusha_shtese.shto(fusha_emri)
    fusha_shtese.shto(fusha_klasa)
    p.shto(fusha_shtese)
    p.shto(fusha_emaili)

    konstante rreshti_fjalekalimit = kontejner("horizontal")
    rreshti_fjalekalimit.vendos_hapesira(6)
    leje e_fshehur = vertete
    konstante syri = buton_tekst("👁", () => {
        e_fshehur = !e_fshehur
        fusha_fjalekalimi.shfaq_fjalekalimin(!e_fshehur)
    })
    rreshti_fjalekalimit.shto(fusha_fjalekalimi, 1)
    rreshti_fjalekalimit.shto(syri)
    p.shto(rreshti_fjalekalimit)

    konstante harrova = buton_tekst("Harrove fjalekalimin?", () => shfaq_mesazh("Demo", "Rivendosja e fjalekalimit - funksion i ardhshem."))
    p.shto(majtas_djathtas(harrova))

    konstante buton_kryesor = buton_primar("", () => navigimi.shko_dhe_fshi("shell"))
    p.shto(buton_kryesor)
    p.shto(tekst("Demo: nuk kerkohet asnje e dhene reale. Shtyp butonin per te vazhduar.", { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()

    # Stilet e dy butonave te ndruesit: aktivi i mbushur, tjetri me kontur
    konstante stili_ndruesit = (aktiv, anesia) => `
        QPushButton { background-color: ${aktiv ? NGJYRAT.primare : "white"}; color: ${aktiv ? "white" : NGJYRAT.tekst};
                      border: 1px solid ${aktiv ? NGJYRAT.primare : NGJYRAT.kufiri}; padding: 11px; font-size: 14px; font-weight: bold;
                      ${anesia === "majtas" ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : "border-top-right-radius: 12px; border-bottom-right-radius: 12px;"} }
    `

    # Rifreskon tekstet dhe fushat sipas zgjedhjes (ne Flutter kjo behej me setState)
    funksion rifresko() {
        titulli.vendos_tekst(eshte_hyrje ? "Mire se u ktheve!" : "Krijo llogarine tende")
        nentitulli.vendos_tekst(eshte_hyrje ? "Hyr per te pare kartën dhe librat e tu." : "Regjistrohu nga shtepia dhe merr karten digjitale.")
        buton_kryesor.vendos_tekst(eshte_hyrje ? "Hyr" : "Krijo llogarine")
        harrova.aktivizo(eshte_hyrje)
        nese (eshte_hyrje) { fusha_shtese.fshih() } ndryshe { fusha_shtese.shfaq_elementin() }
        buton_hyr.vendos_stil(stili_ndruesit(eshte_hyrje, "majtas"))
        buton_regjistrohu.vendos_stil(stili_ndruesit(!eshte_hyrje, "djathtas"))
    }
    buton_hyr.kur_klikohet(() => { eshte_hyrje = vertete; rifresko() })
    buton_regjistrohu.kur_klikohet(() => { eshte_hyrje = gabim_val; rifresko() })
    rifresko()

    # Kur hapet ekrani, e kthejme gjithmone te "Hyr"
    kthe { widget: faqja.widget, hap: () => { eshte_hyrje = vertete; rifresko() } }
}

# Vendos nje element djathtas (per lidhjen "Harrove fjalekalimin?")
funksion majtas_djathtas(elementi) {
    konstante r = kontejner("horizontal")
    r.shto_shtrirje()
    r.shto(elementi)
    kthe r
}

module.exports = { krijo }

# shell.es - "guaska" e Admin App: menuja e poshtme me 5 skeda (porti i admin_shell.dart)
# Njoftimet hapen nga zilja ne Dashboard (ekran i veçante).

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { kuti_stilizuar } = perfshi("../komponente.es")
konstante dashboard = perfshi("./dashboard.es")
konstante skano = perfshi("./skano.es")
konstante librat = perfshi("./librat.es")
konstante nxenesit = perfshi("./nxenesit.es")
konstante cilesime = perfshi("./cilesime.es")

funksion krijo() {
    konstante rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(0)

    # Skedat: Kreu, Skano, Librat, Nxenesit, Cilesime
    konstante faqet = ekrane()
    konstante hapSkeden = (i) => ndrysho(i)
    faqet.shto_ekran(dashboard.krijo(hapSkeden).widget)
    faqet.shto_ekran(skano.krijo().widget)
    faqet.shto_ekran(librat.krijo().widget)
    faqet.shto_ekran(nxenesit.krijo().widget)
    faqet.shto_ekran(cilesime.krijo().widget)
    rrenja.shto(faqet, 1)

    # --- Menuja e poshtme ---
    konstante shiriti = kuti_stilizuar("horizontal", `background-color: white; border-top: 1px solid ${NGJYRAT.kufiri};`, [8, 6, 8, 6])
    shiriti.vendos_hapesira(4)
    konstante etiketat = [
        { ikona: "▦", emri: "Kreu" },
        { ikona: "⌖", emri: "Skano" },
        { ikona: "📚", emri: "Librat" },
        { ikona: "👥", emri: "Nxenesit" },
        { ikona: "⚙", emri: "Cilesime" }
    ]
    konstante butonat = etiketat.map((e, i) => {
        konstante b = buton_i_ri(`${e.ikona}\n${e.emri}`)
        b.vendos_kursor_dore()
        b.kur_klikohet(() => ndrysho(i))
        shiriti.shto(b, 1)
        kthe b
    })
    rrenja.shto(shiriti)

    # Ndryshon skeden aktive dhe stilin e butonave (zgjedhja e theksuar)
    funksion ndrysho(i) {
        faqet.shfaq_ekranin(i)
        butonat.forEach((b, j) => {
            konstante aktiv = i === j
            b.vendos_stil(`
                QPushButton { background-color: ${aktiv ? "rgba(47,75,140,30)" : "transparent"}; border: none; border-radius: 14px;
                              color: ${aktiv ? NGJYRAT.primare : NGJYRAT.tekst_i_zbehte}; font-size: 12px; font-weight: ${aktiv ? "bold" : "normal"}; padding: 6px 4px; }
            `)
        })
    }
    ndrysho(0)

    # Kur hapet paneli (p.sh. pas hyrjes) fillojme gjithmone nga "Kreu"
    kthe { widget: rrenja, hap: () => ndrysho(0) }
}

module.exports = { krijo }

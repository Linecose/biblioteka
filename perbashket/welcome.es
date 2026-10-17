# welcome.es - ekrani i pare (Splash / Welcome): zgjedh me cilen pjese hyn
# (porti i screens/common/welcome_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { tekst, logo, ne_mes, kuti_stilizuar } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    # Sfond me gradient nga e erreta ne te çelurën
    konstante rrenja = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 ${NGJYRAT.primare_erret}, stop:1 ${NGJYRAT.primare});`,
        [24, 24, 24, 24]
    )
    rrenja.vendos_hapesira(10)
    rrenja.shto_shtrirje()
    rrenja.shto(ne_mes(logo(104, vertete)))
    rrenja.shto_hapesire(18)
    rrenja.shto(tekst("Biblioteka Digjitale", { madhesia: 30, trashe: vertete, ngjyra: "white", rreshtim: "qender" }))
    rrenja.shto(tekst("Huazo libra, shiko afatet dhe mbaj\nkarten e bibliotekes gjithmone me vete.", { madhesia: 15, ngjyra: "rgba(255,255,255,180)", rreshtim: "qender" }))
    rrenja.shto_shtrirje()
    rrenja.shto_shtrirje()

    # --- Butonat per zgjedhjen e rolit ---
    konstante buton_nxenes = buton_i_ri(IKONA.klasa + "  Vazhdo si Nxenes")
    buton_nxenes.vendos_stil(`
        QPushButton { background-color: white; color: ${NGJYRAT.primare_erret}; border: none; border-radius: 14px;
                      padding: 16px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: #EEF2FF; }
    `)
    buton_nxenes.vendos_kursor_dore()
    buton_nxenes.kur_klikohet(() => navigimi.shko("auth"))
    rrenja.shto(buton_nxenes)

    konstante buton_admin = buton_i_ri("⚙  Vazhdo si Administrator")
    buton_admin.vendos_stil(`
        QPushButton { background: transparent; color: white; border: 1px solid rgba(255,255,255,140); border-radius: 14px;
                      padding: 16px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: rgba(255,255,255,30); }
    `)
    buton_admin.vendos_kursor_dore()
    buton_admin.kur_klikohet(() => navigimi.shko("admin_login"))
    rrenja.shto(buton_admin)

    rrenja.shto_hapesire(6)
    rrenja.shto(tekst("Versioni demo · vetem ndërfaqe, pa te dhena reale", { madhesia: 12, ngjyra: "rgba(255,255,255,130)", rreshtim: "qender" }))
    kthe { widget: rrenja }
}

module.exports = { krijo }

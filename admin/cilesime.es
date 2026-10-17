# cilesime.es - cilesimet e administratorit (porti i settings_screen.dart)
# Çelesat ndryshojne vetem ne ekran - asgje nuk ruhet.

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { emri_i_adminit, roli_i_adminit } = perfshi("../te_dhenat.es")
konstante { tekst, karte_ime, buton_tekst, buton_dytesor, faqe_pa_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

# Titull i vogel grupi ("Njoftime", "Huazimi"...)
funksion titulli_i_grupit(teksti) {
    kthe tekst(teksti, { madhesia: 13, trashe: vertete, ngjyra: NGJYRAT.tekst_i_zbehte })
}

# Nje çelës (checkbox) me tekst
funksion celesi(etiketa, i_ndezur) {
    konstante c = kuti_zgjedhjeje(etiketa)
    c.vendos_zgjedhur(i_ndezur)
    c.vendos_stil("QCheckBox { font-size: 14px; spacing: 10px; padding: 6px 0; }")
    kthe c
}

funksion krijo() {
    leje ditet = 14

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    p.shto(tekst("Cilesime", { madhesia: 26, trashe: vertete }))

    # --- Profili i administratorit ---
    konstante profili = karte_ime("horizontal")
    profili.vendos_hapesira(14)
    konstante rrethi = tekst("👤", { madhesia: 22, rreshtim: "qender", mbulo: gabim_val })
    rrethi.vendos_stil(`background-color: ${NGJYRAT.primare}; color: white; border-radius: 26px; font-size: 22px;`)
    rrethi.vendos_madhesi_fikse(52, 52)
    profili.shto(rrethi)
    konstante emri = kontejner("vertikal")
    emri.vendos_hapesira(2)
    emri.shto(tekst(emri_i_adminit, { madhesia: 17, trashe: vertete }))
    emri.shto(tekst(roli_i_adminit, { ngjyra: NGJYRAT.tekst_i_zbehte }))
    profili.shto(emri, 1)
    p.shto(profili)

    # --- Njoftime ---
    p.shto(titulli_i_grupit("Njoftime"))
    konstante njoftimet = karte_ime("vertikal", { margina: [14, 6, 14, 6] })
    njoftimet.shto(celesi("Rikujtime automatike per afatet", vertete))
    njoftimet.shto(celesi("Alarm per libra me vonese", vertete))
    njoftimet.shto(celesi("Permbledhje javore me email", gabim_val))
    p.shto(njoftimet)

    # --- Huazimi: kohezgjatja standarde 7..28 dite, me hap 7 ---
    p.shto(titulli_i_grupit("Huazimi"))
    konstante huazimi = karte_ime("horizontal", { margina: 12 })
    huazimi.vendos_hapesira(8)
    konstante pakso = buton_tekst("−", () => { ditet -= 7; rifresko() }, NGJYRAT.primare)
    konstante shto_dite = buton_tekst("+", () => { ditet += 7; rifresko() }, NGJYRAT.primare)
    pakso.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.primare}; font-size: 26px; padding: 0 8px; } QPushButton:disabled { color: #B8C0D6; }`)
    shto_dite.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.primare}; font-size: 26px; padding: 0 8px; } QPushButton:disabled { color: #B8C0D6; }`)
    konstante vlera = tekst("", { trashe: vertete, mbulo: gabim_val })
    huazimi.shto(tekst("Kohezgjatja standarde", { trashe: vertete }), 1)
    huazimi.shto(pakso)
    huazimi.shto(vlera)
    huazimi.shto(shto_dite)
    p.shto(huazimi)
    funksion rifresko() {
        vlera.vendos_tekst(`${ditet} dite`)
        pakso.aktivizo(ditet > 7)
        shto_dite.aktivizo(ditet < 28)
    }
    rifresko()

    # --- Te tjera ---
    p.shto(titulli_i_grupit("Te tjera"))
    konstante rresht = (ikona, etiketa, nenetitulli, onKlik) => {
        konstante k = karte_ime("horizontal", { margina: [16, 14, 16, 14], onKlik })
        k.vendos_hapesira(14)
        k.shto(tekst(ikona, { madhesia: 18, ngjyra: NGJYRAT.primare, mbulo: gabim_val }))
        konstante kolona = kontejner("vertikal")
        kolona.vendos_hapesira(2)
        kolona.shto(tekst(etiketa, { trashe: vertete }))
        nese (nenetitulli) { kolona.shto(tekst(nenetitulli, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte })) }
        k.shto(kolona, 1)
        nese (onKlik) { k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val })) }
        kthe k
    }
    p.shto(rresht(IKONA.qr, "Printo QR-te e librave", asnje, () => shfaq_mesazh("Demo", "Printimi i QR-ve - funksion i ardhshem.")))
    p.shto(rresht(IKONA.info, "Rreth aplikacionit", "Versioni demo 0.1 · vetem ndërfaqe", asnje))

    p.shto(buton_dytesor(IKONA.dil + "  Dil", () => navigimi.shko_dhe_fshi("welcome"), NGJYRAT.rrezik))
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

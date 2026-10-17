# komponente_admin.es - komponente vetem per Admin App (porti i StudentTile, BookTile
# dhe disa pjese te perbashketa te ekraneve te adminit)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { huazimet_aktive_te } = perfshi("../te_dhenat.es")
konstante { GJENDJA } = perfshi("../modelet.es")
konstante { tekst, karte_ime, avatar, kopertina, chip, chip_disponueshmerie } = perfshi("../komponente.es")

# Nje nxenes ne liste (StudentTile): avatar, emri, klasa + ID, dhe chip "Vonese" / "N libra"
funksion karte_nxenesi(nxenesi, onKlik) {
    konstante aktive = huazimet_aktive_te(nxenesi)
    konstante ka_vonese = aktive.some((h) => h.gjendja() === GJENDJA.ME_VONESE)

    konstante k = karte_ime("horizontal", { margina: 12, onKlik })
    k.vendos_hapesira(14)
    k.shto(avatar(nxenesi, 48))

    konstante kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(nxenesi.emri_i_plote, { madhesia: 15, trashe: vertete }))
    kolona.shto(tekst(`Klasa ${nxenesi.klasa_emri} · ${nxenesi.id}`, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(kolona, 1)

    nese (ka_vonese) {
        k.shto(chip("Vonese", NGJYRAT.rrezik))
    } ndryshe nese (aktive.length > 0) {
        k.shto(chip(`${aktive.length} libra`, NGJYRAT.primare))
    }
    k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val }))
    kthe k
}

# Nje liber ne liste (BookTile): kopertina, titulli, autori, chip disponueshmerie + kategoria
funksion karte_libri(libri, onKlik) {
    konstante k = karte_ime("horizontal", { margina: 12, onKlik })
    k.vendos_hapesira(14)
    k.shto(kopertina(libri, 46))

    konstante kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(libri.titulli, { madhesia: 15, trashe: vertete }))
    kolona.shto(tekst(libri.autori, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    kolona.shto_hapesire(4)
    konstante rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(8)
    rreshti.shto(chip_disponueshmerie(libri))
    rreshti.shto(tekst(`${libri.kategoria} · ${libri.id}`, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }), 1)
    kolona.shto(rreshti)
    k.shto(kolona, 1)

    k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val }))
    kthe k
}

# Ndrues me 2-3 opsione ne rresht (si SegmentedButton ne Flutter).
# etiketat: ["Te gjithe", "Te lire", ...]; onNdrysho(indeksi) therritet kur zgjidhet nje tjeter.
# Kthen { widget, vendos(indeksi), indeksi() }.
funksion ndrues(etiketat, indeksi_fillestar, onNdrysho) {
    leje aktual = indeksi_fillestar
    konstante rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(0)
    konstante butonat = etiketat.map((etiketa, i) => {
        konstante b = buton_i_ri(etiketa)
        b.vendos_kursor_dore()
        b.kur_klikohet(() => { vendos(i); onNdrysho(i) })
        rreshti.shto(b, 1)
        kthe b
    })

    funksion vendos(i) {
        aktual = i
        butonat.forEach((b, j) => {
            konstante aktiv = j === i
            konstante e_para = j === 0
            konstante e_fundit = j === butonat.length - 1
            b.vendos_stil(`
                QPushButton { background-color: ${aktiv ? NGJYRAT.primare : "white"}; color: ${aktiv ? "white" : NGJYRAT.tekst};
                              border: 1px solid ${aktiv ? NGJYRAT.primare : NGJYRAT.kufiri}; padding: 11px; font-size: 14px; font-weight: bold;
                              border-radius: 0px;
                              ${e_para ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : ""}
                              ${e_fundit ? "border-top-right-radius: 12px; border-bottom-right-radius: 12px;" : ""} }
            `)
        })
    }
    vendos(indeksi_fillestar)
    kthe { widget: rreshti, vendos, indeksi: () => aktual }
}

module.exports = { karte_nxenesi, karte_libri, ndrues }

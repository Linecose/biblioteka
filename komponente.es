# komponente.es - komponente te ripërdorshme (porti i dosjes widgets/ te versionit Flutter)
#
# Ne Flutter cdo komponent ishte nje klase 'StatelessWidget'. Ketu cdo komponent eshte nje
# FUNKSION qe krijon dhe kthen nje element GUI. Ngjyrat dhe stilet vijne nga stili.es.

konstante { NGJYRAT, IKONA, rgba, erresoje } = perfshi("./stili.es")
konstante { formato_daten } = perfshi("./ndihmes.es")
konstante { GJENDJA, LLOJET_NJOFTIMIT } = perfshi("./modelet.es")
konstante { krijo_qr_png } = perfshi("./qr_png.es")

leje numruesi_id = 0

# ─── Elementet themelore ────────────────────────────────────────────────────

# Etikete me stil: tekst("Pershendetje", { madhesia: 18, trashe: vertete, ngjyra: NGJYRAT.primare })
# Opsionet: madhesia (px), trashe, ngjyra, rreshtim ("qender"/"majtas"/"djathtas"), mbulo (default vertete)
funksion tekst(permbajtja, o = {}) {
    konstante t = tekst_i_ri(String(permbajtja))
    t.vendos_stil(
        `font-size: ${o.madhesia || 14}px; font-weight: ${o.trashe ? "bold" : "normal"}; ` +
        `color: ${o.ngjyra || NGJYRAT.tekst}; background: transparent;`
    )
    # Teksti qe mbulohet (wrap) nuk e zgjeron dritaren kur eshte i gjate.
    nese (o.mbulo !== gabim_val) { t.mbulo_tekstin(vertete) }
    nese (o.rreshtim) { t.vendos_rreshtim(o.rreshtim) }
    kthe t
}

# Kontejner me stil CSS te veten (sfond, kufi, kende te rrumbullakosura...).
# Stili vendoset me #id qe te mos prekin elementet brenda.
funksion kuti_stilizuar(drejtimi, css, margina = 0) {
    konstante k = kontejner(drejtimi)
    numruesi_id++
    konstante id = "kuti" + numruesi_id
    k.vendos_id(id)
    k.vendos_stil(`#${id} { ${css} }`)
    nese (margina) { k.vendos_margina(margina) }
    kthe k
}

# Kartela e bardhe me kufi (AppCard). Nese jepet onKlik, bëhet e klikueshme.
funksion karte_ime(drejtimi, o = {}) {
    konstante k = kuti_stilizuar(
        drejtimi,
        `background-color: ${o.ngjyra || "white"}; border: 1px solid ${NGJYRAT.kufiri}; border-radius: 16px;`,
        o.margina === i_papercaktuar ? 16 : o.margina
    )
    nese (o.onKlik) { k.kur_klikohet(o.onKlik) }
    kthe k
}

# Butoni kryesor (i mbushur) dhe ai dytesor (me kontur) - si FilledButton / OutlinedButton
funksion buton_primar(etiketa, onKlik) {
    konstante b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background-color: ${NGJYRAT.primare}; color: white; border: none;
                      border-radius: 14px; padding: 15px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: ${NGJYRAT.primare_erret}; }
        QPushButton:disabled { background-color: #B8C0D6; }
    `)
    nese (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    kthe b
}

funksion buton_dytesor(etiketa, onKlik, ngjyra = NGJYRAT.primare) {
    konstante b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background-color: white; color: ${ngjyra}; border: 1px solid ${NGJYRAT.kufiri};
                      border-radius: 14px; padding: 15px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: #F0F4FF; }
    `)
    nese (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    kthe b
}

# Buton si lidhje teksti (TextButton)
funksion buton_tekst(etiketa, onKlik, ngjyra = NGJYRAT.primare) {
    konstante b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background: transparent; color: ${ngjyra}; border: none; font-size: 13px; font-weight: bold; padding: 4px 6px; }
        QPushButton:hover { text-decoration: underline; }
    `)
    nese (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    kthe b
}

# Etikete e vogel me ngjyre (StatusChip), p.sh. "Me vonese" ne te kuqe
funksion chip(etiketa, ngjyra) {
    konstante t = tekst(etiketa, { madhesia: 12, trashe: vertete, ngjyra: ngjyra, mbulo: gabim_val })
    t.vendos_stil(
        `background-color: ${rgba(ngjyra, 30)}; color: ${ngjyra}; border-radius: 11px; ` +
        `padding: 3px 10px; font-size: 12px; font-weight: bold;`
    )
    kthe t
}

# Vendos nje element majtas dhe e le hapesiren e mbetur bosh (qe te mos shtrihet gjer ne fund)
funksion majtas(elementi) {
    konstante r = kontejner("horizontal")
    r.shto(elementi)
    r.shto_shtrirje()
    kthe r
}

# Vije e holle ndarese (Divider)
funksion ndares() {
    konstante v = kuti_stilizuar("vertikal", `background-color: ${NGJYRAT.kufiri};`)
    v.vendos_madhesi(0, 1)
    v.vendos_madhesi_maksimale(16777215, 1)
    kthe v
}

# ─── Gjendjet e huazimit / disponueshmerise ─────────────────────────────────

funksion ngjyra_e_gjendjes(gjendja) {
    nese (gjendja === GJENDJA.NE_KOHE) { kthe NGJYRAT.sukses }
    nese (gjendja === GJENDJA.AFAT_AFER) { kthe NGJYRAT.paralajmerim }
    nese (gjendja === GJENDJA.ME_VONESE) { kthe NGJYRAT.rrezik }
    kthe NGJYRAT.tekst_i_zbehte
}

funksion etiketa_e_gjendjes(gjendja) {
    nese (gjendja === GJENDJA.NE_KOHE) { kthe "Brenda afatit" }
    nese (gjendja === GJENDJA.AFAT_AFER) { kthe "Afati afer" }
    nese (gjendja === GJENDJA.ME_VONESE) { kthe "Me vonese" }
    kthe "Kthyer"
}

funksion chip_huazimi(huazimi) {
    kthe chip(etiketa_e_gjendjes(huazimi.gjendja()), ngjyra_e_gjendjes(huazimi.gjendja()))
}

funksion chip_disponueshmerie(libri) {
    kthe chip(libri.i_lire ? "I lire" : "I huazuar", libri.i_lire ? NGJYRAT.sukses : NGJYRAT.paralajmerim)
}

# ─── Kopertina, avatari, QR ─────────────────────────────────────────────────

# Kopertina placeholder e librit (raport 1 : 1.4)
funksion kopertina(libri, gjeresia = 56) {
    konstante nga = libri.ngjyra_e_kopertines
    konstante k = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 ${nga}, stop:1 ${erresoje(nga, 0.35)}); border-radius: 8px;`
    )
    k.vendos_madhesi_fikse(gjeresia, Math.round(gjeresia * 1.4))
    k.shto(tekst(IKONA.liber, { madhesia: Math.round(gjeresia * 0.42), ngjyra: "white", rreshtim: "qender", mbulo: gabim_val }), 1)
    kthe k
}

# Rrethi me inicialet e nxenesit
funksion avatar(nxenesi, madhesia = 44) {
    konstante t = tekst(nxenesi.inicialet(), { madhesia: Math.round(madhesia * 0.36), trashe: vertete, ngjyra: NGJYRAT.primare, rreshtim: "qender", mbulo: gabim_val })
    t.vendos_stil(
        `background-color: ${rgba(NGJYRAT.primare, 28)}; color: ${NGJYRAT.primare}; ` +
        `font-size: ${Math.round(madhesia * 0.36)}px; font-weight: bold; border-radius: ${Math.floor(madhesia / 2)}px;`
    )
    t.vendos_madhesi_fikse(madhesia, madhesia)
    kthe t
}

# QR placeholder (dekorativ, jo real) ne nje kuti te bardhe
funksion qr(te_dhenat, madhesia = 200) {
    konstante dalja = krijo_qr_png(te_dhenat, Math.round(madhesia * 0.88))
    konstante imazhi = imazh_i_ri()
    imazhi.vendos_imazh_nga_te_dhena(dalja.buffer, "PNG")
    konstante kuti = kuti_stilizuar("vertikal", "background-color: white; border-radius: 12px;", Math.round(madhesia * 0.06))
    kuti.shto(imazhi)
    kuti.vendos_madhesi_fikse(madhesia, madhesia)
    kthe kuti
}

# ─── Karta digjitale (DigitalCard) ──────────────────────────────────────────
funksion karta_digjitale(nxenesi, kompakte = gabim_val) {
    konstante k = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 ${NGJYRAT.primare_erret}, stop:1 ${NGJYRAT.primare}); border-radius: 22px;`,
        20
    )
    k.vendos_hapesira(6)

    # Rreshti lart: emri i bibliotekes + etiketa "NXENES"
    konstante lart = kontejner("horizontal")
    lart.shto(tekst(IKONA.liber + "  BIBLIOTEKA E SHKOLLES", { madhesia: 12, trashe: vertete, ngjyra: "rgba(255,255,255,190)", mbulo: gabim_val }), 1)
    konstante etiketa = tekst("NXENES", { madhesia: 11, trashe: vertete, ngjyra: "white", mbulo: gabim_val })
    etiketa.vendos_stil("background-color: rgba(255,255,255,40); color: white; border-radius: 10px; padding: 3px 10px; font-size: 11px; font-weight: bold;")
    lart.shto(etiketa)
    k.shto(lart)
    k.shto_hapesire(kompakte ? 12 : 22)

    # Mesi: emri, klasa, ID (+ QR i vogel ne versionin e plote)
    konstante mesi = kontejner("horizontal")
    konstante majta = kontejner("vertikal")
    majta.vendos_hapesira(2)
    majta.shto(tekst(nxenesi.emri_i_plote, { madhesia: 22, trashe: vertete, ngjyra: "white" }))
    majta.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: "rgba(255,255,255,190)" }))
    majta.shto_hapesire(8)
    majta.shto(tekst("ID E NXENESIT", { madhesia: 10, ngjyra: "rgba(255,255,255,140)" }))
    majta.shto(tekst(nxenesi.id, { madhesia: 15, trashe: vertete, ngjyra: "white" }))
    mesi.shto(majta, 1)
    nese (!kompakte) { mesi.shto(qr(nxenesi.id, 84)) }
    k.shto(mesi)

    nese (!kompakte) {
        k.shto_hapesire(10)
        konstante vije = kuti_stilizuar("vertikal", "background-color: rgba(255,255,255,50);")
        vije.vendos_madhesi(0, 1)
        vije.vendos_madhesi_maksimale(16777215, 1)
        k.shto(vije)
        k.shto(tekst("Vlefshme deri me 30 Qer 2027", { madhesia: 12, ngjyra: "rgba(255,255,255,160)" }))
    }
    kthe k
}

# ─── Kartela per listat ─────────────────────────────────────────────────────

# Nje huazim ne liste (LoanTile). opsionet: { tregoNxenesin, onKlik }
funksion karte_huazimi(huazimi, o = {}) {
    konstante k = karte_ime("horizontal", { margina: 12, onKlik: o.onKlik })
    k.vendos_hapesira(14)
    k.shto(kopertina(huazimi.libri, 46))

    konstante kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(huazimi.libri.titulli, { madhesia: 15, trashe: vertete }))
    kolona.shto(tekst(
        o.tregoNxenesin ? `${huazimi.nxenesi.emri_i_plote} · ${huazimi.nxenesi.klasa_emri}` : huazimi.libri.autori,
        { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }
    ))
    kolona.shto_hapesire(4)

    konstante rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(8)
    rreshti.shto(chip_huazimi(huazimi))
    konstante ngjyra = huazimi.eshte_kthyer() ? NGJYRAT.tekst_i_zbehte : ngjyra_e_gjendjes(huazimi.gjendja())
    rreshti.shto(tekst(
        huazimi.eshte_kthyer() ? huazimi.etiketa_e_afatit() : `${huazimi.etiketa_e_afatit()} · ${formato_daten(huazimi.afati)}`,
        { madhesia: 12, ngjyra: ngjyra }
    ), 1)
    kolona.shto(rreshti)
    k.shto(kolona, 1)

    nese (o.onKlik) { k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val })) }
    kthe k
}

# Kartela me statistike (StatCard)
funksion karte_statistike(ikona, vlera, etiketa, ngjyra = NGJYRAT.primare, onKlik = asnje) {
    konstante k = karte_ime("vertikal", { margina: 14, onKlik })
    k.vendos_hapesira(4)
    konstante kuti_ikona = tekst(ikona, { madhesia: 16, mbulo: gabim_val, rreshtim: "qender" })
    kuti_ikona.vendos_stil(`background-color: ${rgba(ngjyra, 30)}; border-radius: 10px; font-size: 16px;`)
    kuti_ikona.vendos_madhesi_fikse(36, 36)
    k.shto(majtas(kuti_ikona))
    k.shto_hapesire(6)
    k.shto(tekst(String(vlera), { madhesia: 26, trashe: vertete }))
    k.shto(tekst(etiketa, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    kthe k
}

# Titull seksioni me lidhje opsionale djathtas (SectionHeader)
funksion seksion(titulli, etiketa_veprimit = asnje, onVeprim = asnje) {
    konstante r = kontejner("horizontal")
    r.shto(tekst(titulli, { madhesia: 17, trashe: vertete }), 1)
    nese (etiketa_veprimit) { r.shto(buton_tekst(etiketa_veprimit, onVeprim)) }
    kthe r
}

# Rresht informacioni: ikone + etikete (majtas) + vlere (djathtas) (InfoRow)
funksion rresht_info(ikona, etiketa, vlera) {
    konstante r = kontejner("horizontal")
    r.vendos_hapesira(12)
    r.shto(tekst(ikona, { madhesia: 16, ngjyra: NGJYRAT.primare, mbulo: gabim_val }))
    r.shto(tekst(etiketa, { ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val }))
    r.shto_shtrirje()
    r.shto(tekst(vlera, { trashe: vertete, rreshtim: "djathtas" }), 1)
    kthe r
}

# Kutia e fakteve te shkurtra ne detajet e librit (FactBox)
funksion kuti_fakti(ikona, vlera, etiketa) {
    konstante k = karte_ime("vertikal", { margina: 10 })
    k.vendos_hapesira(2)
    k.shto(tekst(ikona, { madhesia: 18, rreshtim: "qender", mbulo: gabim_val }))
    k.shto(tekst(String(vlera), { trashe: vertete, rreshtim: "qender" }))
    k.shto(tekst(etiketa, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    kthe k
}

# Ekran i bosh (EmptyState)
funksion ekran_i_bosh(ikona, mesazhi) {
    konstante k = kontejner("vertikal")
    k.vendos_margina(30)
    k.shto(tekst(ikona, { madhesia: 40, rreshtim: "qender", ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(tekst(mesazhi, { rreshtim: "qender", ngjyra: NGJYRAT.tekst_i_zbehte }))
    kthe k
}

# ─── Faqet (skeleti i secilit ekran) ────────────────────────────────────────

# Faqe me titull lart dhe butonin "kthehu" (si Scaffold + AppBar). Kthen { widget, permbajtja }.
# Shto elementet ne `permbajtja`; ajo lëviz vertikalisht kur ka shume.
funksion faqe_me_titull(titulli, onKthehu = asnje) {
    konstante rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(0)

    konstante koka = kontejner("horizontal")
    koka.vendos_margina(8, 12, 16, 4)
    koka.vendos_hapesira(4)
    nese (onKthehu) {
        konstante prapa = buton_tekst(IKONA.kthehu, onKthehu, NGJYRAT.tekst)
        prapa.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.tekst}; font-size: 30px; padding: 0 10px 4px 10px; }`)
        koka.shto(prapa)
    }
    koka.shto(tekst(titulli, { madhesia: 20, trashe: vertete }), 1)
    rrenja.shto(koka)

    kthe { widget: rrenja, permbajtja: shto_zone_levizese(rrenja) }
}

# Faqe pa titull (per skedat kryesore). Kthen { widget, permbajtja }.
funksion faqe_pa_titull() {
    konstante rrenja = kontejner("vertikal")
    rrenja.vendos_margina(0)
    kthe { widget: rrenja, permbajtja: shto_zone_levizese(rrenja) }
}

# Krijon zonen me scroll brenda `rrenja` dhe kthen kontejnerin e brendshem ku shtohen elementet.
funksion shto_zone_levizese(rrenja) {
    konstante permbajtja = kontejner("vertikal")
    permbajtja.vendos_margina(16, 8, 16, 24)
    permbajtja.vendos_hapesira(12)
    rrenja.shto(zone_levizese(permbajtja), 1)
    kthe permbajtja
}

# ─── Lista e njoftimeve (NotificationsView) - e perbashket per Student dhe Admin ───────────────
funksion pamja_e_njoftimeve(elementet) {
    konstante lexuar_tani = i_ri Set()          # pozicionet e shenuara si te lexuara gjate demos
    konstante rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(10)

    konstante rreshti_lart = kontejner("horizontal")
    konstante numrimi = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: gabim_val })
    konstante buton_te_gjitha = buton_tekst("Sheno te gjitha si te lexuara", asnje)
    rreshti_lart.shto(numrimi, 1)
    rreshti_lart.shto(buton_te_gjitha)
    rrenja.shto(rreshti_lart)

    konstante lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    rrenja.shto(lista)

    konstante eshte_lexuar = (i) => elementet[i].i_lexuar || lexuar_tani.has(i)

    funksion rindertoje() {
        leje te_palexuara = 0
        lista.pastro()
        per (leje i = 0; i < elementet.length; i++) {
            nese (!eshte_lexuar(i)) { te_palexuara++ }
            konstante pozicioni = i
            lista.shto(karte_njoftimi(elementet[i], eshte_lexuar(i), () => {
                lexuar_tani.add(pozicioni)
                rindertoje()
            }))
        }
        numrimi.vendos_tekst(te_palexuara === 0 ? "Te gjitha jane lexuar" : `${te_palexuara} te palexuara`)
        buton_te_gjitha.aktivizo(te_palexuara > 0)
    }

    buton_te_gjitha.kur_klikohet(() => {
        per (leje i = 0; i < elementet.length; i++) { lexuar_tani.add(i) }
        rindertoje()
    })
    rindertoje()
    kthe rrenja
}

funksion karte_njoftimi(njoftimi, i_lexuar, onKlik) {
    konstante L = LLOJET_NJOFTIMIT
    konstante ikona = { [L.KUJTESE]: IKONA.alarm, [L.VONESE]: IKONA.paralajmerim, [L.MARRJE]: IKONA.marrje, [L.KTHIM]: IKONA.kthim, [L.INFO]: IKONA.info }[njoftimi.lloji]
    konstante ngjyra = { [L.KUJTESE]: NGJYRAT.paralajmerim, [L.VONESE]: NGJYRAT.rrezik, [L.MARRJE]: NGJYRAT.primare, [L.KTHIM]: NGJYRAT.sukses, [L.INFO]: NGJYRAT.tekst_i_zbehte }[njoftimi.lloji]

    # Njoftimet e palexuara kane sfond pak me te theksuar
    konstante k = karte_ime("horizontal", { ngjyra: i_lexuar ? "white" : "#F0F4FF", margina: 14, onKlik })
    k.vendos_hapesira(12)

    konstante rrethi = tekst(ikona, { madhesia: 18, rreshtim: "qender", mbulo: gabim_val })
    rrethi.vendos_stil(`background-color: ${rgba(ngjyra, 30)}; border-radius: 21px; font-size: 18px;`)
    rrethi.vendos_madhesi_fikse(42, 42)
    k.shto(rrethi)

    konstante kolona = kontejner("vertikal")
    kolona.vendos_hapesira(4)
    konstante titulli = kontejner("horizontal")
    titulli.shto(tekst(njoftimi.titulli, { madhesia: 15, trashe: i_lexuar ? gabim_val : vertete }), 1)
    nese (!i_lexuar) { titulli.shto(tekst("●", { madhesia: 11, ngjyra: NGJYRAT.primare, mbulo: gabim_val })) }
    kolona.shto(titulli)
    kolona.shto(tekst(njoftimi.mesazhi, { madhesia: 13 }))
    kolona.shto(tekst(njoftimi.koha, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(kolona, 1)
    kthe k
}

# Logoja e aplikacionit: rreth me ikone libri (AppLogo). `ne_te_erret` = rreth i bardhe per sfond te erret.
funksion logo(madhesia = 88, ne_te_erret = vertete) {
    konstante l = tekst(IKONA.librat, { madhesia: Math.round(madhesia * 0.45), rreshtim: "qender", mbulo: gabim_val })
    l.vendos_stil(
        `background-color: ${ne_te_erret ? "white" : NGJYRAT.primare}; border-radius: ${Math.floor(madhesia / 2)}px; ` +
        `font-size: ${Math.round(madhesia * 0.45)}px; color: ${ne_te_erret ? NGJYRAT.primare : "white"};`
    )
    l.vendos_madhesi_fikse(madhesia, madhesia)
    kthe l
}

# Vendos nje element ne mes horizontalisht
funksion ne_mes(elementi) {
    konstante r = kontejner("horizontal")
    r.shto_shtrirje()
    r.shto(elementi)
    r.shto_shtrirje()
    kthe r
}

# Butoni i rrumbullaket me ikone dhe emer poshtë (veprimet e shpejta)
funksion veprim_i_shpejte(ikona, etiketa, onKlik) {
    konstante k = kontejner("vertikal")
    k.vendos_hapesira(6)
    konstante kuti_ikona = tekst(ikona, { madhesia: 22, rreshtim: "qender", mbulo: gabim_val })
    kuti_ikona.vendos_stil(`background-color: ${rgba(NGJYRAT.primare, 24)}; border-radius: 16px; font-size: 22px;`)
    kuti_ikona.vendos_madhesi_fikse(56, 56)
    k.shto(ne_mes(kuti_ikona))
    k.shto(tekst(etiketa, { madhesia: 12, rreshtim: "qender", mbulo: gabim_val }))
    nese (onKlik) { k.kur_klikohet(onKlik) }
    kthe k
}

module.exports = {
    tekst, kuti_stilizuar, karte_ime, buton_primar, buton_dytesor, buton_tekst, chip, majtas, ndares,
    ngjyra_e_gjendjes, etiketa_e_gjendjes, chip_huazimi, chip_disponueshmerie,
    kopertina, avatar, qr, karta_digjitale, karte_huazimi, karte_statistike, seksion, rresht_info,
    kuti_fakti, ekran_i_bosh, faqe_me_titull, faqe_pa_titull, pamja_e_njoftimeve,
    logo, ne_mes, veprim_i_shpejte
}

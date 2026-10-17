# huazim_kthim.es - ekrani Huazim / Kthim (porti i borrow_return_screen.dart)
# DEMO: "Konfirmo" nuk ruan asgje - vetem shfaq nje mesazh dhe kthehet mbrapa.
# Hapet me argument opsional { nxenesi, libri, eshte_huazim }:
#   navigimi.shko("admin_huazim", { nxenesi: n, eshte_huazim: vertete })

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { nxenesit, librat } = perfshi("../te_dhenat.es")
konstante { formato_daten } = perfshi("../ndihmes.es")
konstante { tekst, karte_ime, rresht_info, buton_primar, faqe_me_titull } = perfshi("../komponente.es")
konstante { ndrues } = perfshi("./komponente_admin.es")
konstante navigimi = perfshi("../navigimi.es")

# Kohezgjatja standarde e huazimit (dite)
konstante DITET_E_HUAZIMIT = 14

# Karte e klikueshme qe tregon zgjedhjen aktuale dhe, kur prekesh, hap nje liste zgjedhjeje poshte saj.
# (Ne Flutter kjo ishte nje bottom sheet; ketu perdorim nje liste brenda faqes.)
#   merr_opsionet() -> [{ etiketa, objekti }]   onZgjidh(objekti) -> therritet kur zgjidhet nje
funksion zgjedhes_i_renditur(titulli, tekst_udhezues, merr_opsionet, onZgjidh) {
    leje opsionet_aktuale = []
    leje i_hapur = gabim_val

    konstante rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(6)

    konstante karta = karte_ime("horizontal", { onKlik: () => ndrysho() })
    karta.vendos_hapesira(14)
    karta.shto(tekst("⇅", { madhesia: 20, ngjyra: NGJYRAT.primare, mbulo: gabim_val }))
    konstante kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(titulli, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }))
    konstante vlera = tekst(tekst_udhezues, { madhesia: 16, trashe: vertete, ngjyra: NGJYRAT.tekst_i_zbehte })
    konstante detaji = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte })
    kolona.shto(vlera)
    kolona.shto(detaji)
    karta.shto(kolona, 1)
    rrenja.shto(karta)

    konstante lista = liste([])
    lista.vendos_madhesi(0, 190)
    lista.fshih()
    rrenja.shto(lista)
    lista.kur_zgjidhet((indeksi) => {
        konstante zgjedhja = opsionet_aktuale[indeksi]
        nese (zgjedhja) {
            mbyll()
            onZgjidh(zgjedhja.objekti)
        }
    })

    funksion hap_listen() {
        opsionet_aktuale = merr_opsionet()
        lista.pastro()
        lista.shto_elemente(opsionet_aktuale.map((o) => o.etiketa))
        lista.shfaq_elementin()
        i_hapur = vertete
    }
    funksion mbyll() { lista.fshih(); i_hapur = gabim_val }
    funksion ndrysho() { nese (i_hapur) { mbyll() } ndryshe { hap_listen() } }

    # Vendos vleren e treguar (null = tregon tekstin udhezues)
    funksion vendos(teksti, detaj) {
        vlera.vendos_tekst(teksti || tekst_udhezues)
        vlera.vendos_stil(`font-size: 16px; font-weight: bold; background: transparent; color: ${teksti ? NGJYRAT.tekst : NGJYRAT.tekst_i_zbehte};`)
        detaji.vendos_tekst(detaj || "")
    }
    kthe { widget: rrenja, vendos, mbyll }
}

funksion krijo() {
    leje nxenesi = asnje
    leje libri = asnje
    leje eshte_huazim = vertete

    konstante faqja = faqe_me_titull("Huazim / Kthim", () => navigimi.kthehu())
    konstante p = faqja.permbajtja

    konstante menyra = ndrues(["Huazim", "Kthim"], 0, (i) => {
        eshte_huazim = i === 0
        # Libri i zgjedhur mund te mos vlej me per veprimin e ri
        nese (libri !== asnje && libri.i_lire !== eshte_huazim) { libri = asnje }
        rifresko()
    })
    p.shto(menyra.widget)

    konstante zgjedhesi_nxenesit = zgjedhes_i_renditur(
        "Nxenesi", "Skano QR ose zgjidh nxenesin",
        () => nxenesit.map((n) => ({ etiketa: `${n.emri_i_plote} (${n.klasa_emri})`, objekti: n })),
        (n) => { nxenesi = n; rifresko() }
    )
    p.shto(zgjedhesi_nxenesit.widget)

    konstante zgjedhesi_librit = zgjedhes_i_renditur(
        "Libri", "Skano QR ose zgjidh librin",
        # Huazim -> librat e lire; kthim -> librat e huazuar
        () => librat.filter((l) => l.i_lire === eshte_huazim).map((l) => ({ etiketa: `${l.titulli} (${l.id})`, objekti: l })),
        (l) => { libri = l; rifresko() }
    )
    p.shto(zgjedhesi_librit.widget)

    # Karta me datat (vetem per huazim)
    konstante karta_datave = karte_ime("vertikal")
    konstante rreshti_dates = kontejner("vertikal")
    karta_datave.shto(rreshti_dates)
    p.shto(karta_datave)

    konstante konfirmo = buton_primar("", () => {
        nese (!nxenesi || !libri) { kthe }
        konstante mesazhi = eshte_huazim
            ? `"${libri.titulli}" u huazua te ${nxenesi.emri_i_pare()} (demo - nuk u ruajt).`
            : `"${libri.titulli}" u regjistrua si i kthyer (demo - nuk u ruajt).`
        shfaq_mesazh("Demo", mesazhi)
        navigimi.kthehu()
    })
    p.shto(konfirmo)
    p.shto_shtrirje()

    # Rifreskon gjithe ekranin sipas gjendjes (ne Flutter kjo behej me setState)
    funksion rifresko() {
        menyra.vendos(eshte_huazim ? 0 : 1)
        zgjedhesi_nxenesit.vendos(nxenesi ? nxenesi.emri_i_plote : asnje, nxenesi ? `${nxenesi.klasa_emri} · ${nxenesi.id}` : asnje)
        zgjedhesi_librit.vendos(libri ? libri.titulli : asnje, libri ? `${libri.id} · ${libri.autori}` : asnje)

        rreshti_dates.pastro()
        rreshti_dates.shto(rresht_info("📅", "Data e huazimit", formato_daten(i_ri Date())))
        rreshti_dates.shto(rresht_info("⏰", `Afati (${DITET_E_HUAZIMIT} dite)`, formato_daten(i_ri Date(Date.now() + DITET_E_HUAZIMIT * 86400000))))
        nese (eshte_huazim) { karta_datave.shfaq_elementin() } ndryshe { karta_datave.fshih() }

        konfirmo.vendos_tekst(eshte_huazim ? "Konfirmo huazimin" : "Konfirmo kthimin")
        # Butoni eshte joaktiv derisa te zgjidhen te dyja
        konfirmo.aktivizo(nxenesi !== asnje && libri !== asnje)
    }

    # Argumentet vijne nga ekrani qe e hapi; mund te mungojne.
    funksion hap(arg) {
        nxenesi = (arg && arg.nxenesi) || asnje
        libri = (arg && arg.libri) || asnje
        eshte_huazim = arg && arg.eshte_huazim !== i_papercaktuar ? arg.eshte_huazim : vertete
        zgjedhesi_nxenesit.mbyll()
        zgjedhesi_librit.mbyll()
        rifresko()
    }
    rifresko()
    kthe { widget: faqja.widget, hap }
}

module.exports = { krijo }

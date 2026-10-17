# home.es - Home / Dashboard i nxenesit (porti i student_home_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante { nxenesi_aktual, huazimet_aktive_te, njoftimet_e_nxenesit } = perfshi("../te_dhenat.es")
konstante { GJENDJA } = perfshi("../modelet.es")
konstante {
    tekst, karte_ime, karte_statistike, karte_huazimi, karta_digjitale, kopertina, avatar, seksion,
    veprim_i_shpejte, faqe_pa_titull, buton_tekst
} = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

# hapSkeden(i): funksion nga shell.es per te kaluar te nje skede tjeter (1 = Librat, 2 = Njoftime, 3 = Profili)
funksion krijo(hapSkeden) {
    konstante nxenesi = nxenesi_aktual
    konstante aktive = huazimet_aktive_te(nxenesi)
    konstante te_vonuara = aktive.filter((h) => h.gjendja() === GJENDJA.ME_VONESE).length
    konstante afat_afer = aktive.filter((h) => h.gjendja() === GJENDJA.AFAT_AFER).length
    konstante te_palexuara = njoftimet_e_nxenesit.filter((n) => !n.i_lexuar).length

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja

    # --- Koka: avatari + pershendetja + zilja ---
    konstante koka = kontejner("horizontal")
    koka.vendos_hapesira(12)
    konstante av = avatar(nxenesi, 48)
    av.kur_klikohet(() => hapSkeden(3))
    koka.shto(av)
    konstante pershendetja = kontejner("vertikal")
    pershendetja.vendos_hapesira(0)
    pershendetja.shto(tekst("Pershendetje,", { ngjyra: NGJYRAT.tekst_i_zbehte }))
    pershendetja.shto(tekst(nxenesi.emri_i_pare(), { madhesia: 22, trashe: vertete }))
    koka.shto(pershendetja, 1)
    konstante zilja = buton_tekst(te_palexuara > 0 ? `${IKONA.njoftime} ${te_palexuara}` : IKONA.njoftime, () => hapSkeden(2), NGJYRAT.tekst)
    zilja.vendos_stil("QPushButton { background: transparent; border: none; font-size: 22px; padding: 4px 8px; }")
    koka.shto(zilja)
    p.shto(koka)

    # --- Paralajmerim per vonese (shfaqet vetem nese ka libra me vonese) ---
    nese (te_vonuara > 0) {
        konstante alarmi = karte_ime("horizontal", { ngjyra: "#FDECEC", margina: 14, onKlik: () => navigimi.shko("afatet") })
        alarmi.vendos_hapesira(12)
        alarmi.shto(tekst(IKONA.paralajmerim, { madhesia: 20, ngjyra: NGJYRAT.rrezik, mbulo: gabim_val }))
        alarmi.shto(tekst(
            te_vonuara === 1 ? "Ke 1 liber me vonese. Kthe sa me shpejt!" : `Ke ${te_vonuara} libra me vonese. Kthe sa me shpejt!`,
            { trashe: vertete, ngjyra: NGJYRAT.rrezik }
        ), 1)
        alarmi.shto(tekst(IKONA.shigjeta, { madhesia: 20, ngjyra: NGJYRAT.rrezik, mbulo: gabim_val }))
        p.shto(alarmi)
    }

    # --- Karta digjitale (kompakte), prek per ta hapur ---
    konstante karta = karta_digjitale(nxenesi, vertete)
    karta.kur_klikohet(() => navigimi.shko("karta"))
    p.shto(karta)

    # --- Statistika ---
    konstante statistikat = kontejner("horizontal")
    statistikat.vendos_hapesira(10)
    statistikat.shto(karte_statistike(IKONA.librat, aktive.length, "Libra te marre", NGJYRAT.primare, () => hapSkeden(1)), 1)
    statistikat.shto(karte_statistike(IKONA.afati, afat_afer, "Afat afer", NGJYRAT.paralajmerim, () => navigimi.shko("afatet")), 1)
    statistikat.shto(karte_statistike(IKONA.paralajmerim, te_vonuara, "Me vonese", NGJYRAT.rrezik, () => navigimi.shko("afatet")), 1)
    p.shto(statistikat)

    # --- Veprime te shpejta ---
    konstante veprimet = kontejner("horizontal")
    veprimet.shto(veprim_i_shpejte(IKONA.karte, "Karta ime", () => navigimi.shko("karta")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.qr, "QR-ja ime", () => navigimi.shko("qr")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.afati, "Afatet", () => navigimi.shko("afatet")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.historiku, "Historiku", () => hapSkeden(1)), 1)
    p.shto(veprimet)

    # --- Afati me i afert (lista eshte e renditur me afatin me te afert ne krye) ---
    nese (aktive.length > 0) {
        p.shto(seksion("Afati me i afert"))
        p.shto(karte_huazimi(aktive[0], { onKlik: () => navigimi.shko("detaje_libri", aktive[0].libri) }))

        p.shto(seksion("Librat e mi", "Shiko te gjitha", () => hapSkeden(1)))
        konstante rafti = kontejner("horizontal")
        rafti.vendos_hapesira(14)
        per (konstante h te aktive) {
            konstante kolona = kontejner("vertikal")
            kolona.vendos_hapesira(8)
            kolona.shto(kopertina(h.libri, 100))
            kolona.shto(tekst(h.libri.titulli, { madhesia: 13, trashe: vertete }))
            kolona.vendos_madhesi_maksimale(110, 16777215)
            kolona.kur_klikohet(() => navigimi.shko("detaje_libri", h.libri))
            rafti.shto(kolona)
        }
        rafti.shto_shtrirje()
        p.shto(rafti)
    }
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

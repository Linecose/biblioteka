# dashboard.es - Dashboard i administratorit: statistika, veprime te shpejta dhe vonesat
# (porti i admin_dashboard_screen.dart)

konstante { NGJYRAT, IKONA } = perfshi("../stili.es")
konstante {
    librat, nxenesit, emri_i_adminit, roli_i_adminit, huazimet_me_vonese, numri_i_librave_te_huazuar, njoftimet_e_adminit
} = perfshi("../te_dhenat.es")
konstante { tekst, karte_ime, karte_statistike, karte_huazimi, seksion, buton_primar, buton_dytesor, buton_tekst, faqe_pa_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

# onHapSkeden(i): funksion nga shell.es per te kaluar te nje skede (1 = Skano, 2 = Librat, 3 = Nxenesit)
funksion krijo(onHapSkeden) {
    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    konstante vonesat = huazimet_me_vonese()
    konstante te_palexuara = njoftimet_e_adminit.filter((n) => !n.i_lexuar).length

    # --- Koka: roli, titulli dhe zilja ---
    konstante koka = kontejner("horizontal")
    konstante titujt = kontejner("vertikal")
    titujt.vendos_hapesira(0)
    titujt.shto(tekst(`${roli_i_adminit} · ${emri_i_adminit}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
    titujt.shto(tekst("Paneli kryesor", { madhesia: 24, trashe: vertete }))
    koka.shto(titujt, 1)
    koka.shto(buton_tekst(IKONA.njoftime + (te_palexuara > 0 ? ` ${te_palexuara}` : ""), () => navigimi.shko("admin_njoftime"), NGJYRAT.tekst))
    p.shto(koka)

    # --- Butoni kryesor: skano ---
    konstante skano = karte_ime("horizontal", { ngjyra: NGJYRAT.primare, margina: 16, onKlik: () => onHapSkeden(1) })
    skano.vendos_hapesira(14)
    skano.shto(tekst("⌖", { madhesia: 34, ngjyra: "white", mbulo: gabim_val }))
    konstante skano_teksti = kontejner("vertikal")
    skano_teksti.vendos_hapesira(2)
    skano_teksti.shto(tekst("Skano QR", { madhesia: 18, trashe: vertete, ngjyra: "white" }))
    skano_teksti.shto(tekst("Nxenesi → Libri → Huazimi regjistrohet", { ngjyra: "rgba(255,255,255,190)" }))
    skano.shto(skano_teksti, 1)
    skano.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: "white", mbulo: gabim_val }))
    p.shto(skano)

    # --- Statistikat (2 x 2) ---
    konstante rreshti1 = kontejner("horizontal")
    rreshti1.vendos_hapesira(10)
    rreshti1.shto(karte_statistike("📚", librat.length, "Libra gjithsej", NGJYRAT.primare, () => onHapSkeden(2)), 1)
    rreshti1.shto(karte_statistike("⇄", numri_i_librave_te_huazuar(), "Te huazuar", NGJYRAT.paralajmerim, () => onHapSkeden(2)), 1)
    p.shto(rreshti1)
    konstante rreshti2 = kontejner("horizontal")
    rreshti2.vendos_hapesira(10)
    rreshti2.shto(karte_statistike("👥", nxenesit.length, "Nxenes", NGJYRAT.sukses, () => onHapSkeden(3)), 1)
    rreshti2.shto(karte_statistike(IKONA.paralajmerim, vonesat.length, "Me vonese", NGJYRAT.rrezik), 1)
    p.shto(rreshti2)

    # --- Veprime te shpejta: Huazim / Kthim ---
    konstante veprimet = kontejner("horizontal")
    veprimet.vendos_hapesira(10)
    veprimet.shto(buton_primar("+  Huazim", () => navigimi.shko("admin_huazim", { eshte_huazim: vertete })), 1)
    veprimet.shto(buton_dytesor("↩  Kthim", () => navigimi.shko("admin_huazim", { eshte_huazim: gabim_val })), 1)
    p.shto(veprimet)

    # --- Lista e vonesave ---
    p.shto(seksion("Libra me vonese", "Nxenesit", () => onHapSkeden(3)))
    nese (vonesat.length === 0) {
        p.shto(tekst("Asnje vonese. Shkelqyeshem!", { ngjyra: NGJYRAT.tekst_i_zbehte }))
    } ndryshe {
        per (konstante h te vonesat) {
            # Prek -> hapen detajet e nxenesit
            p.shto(karte_huazimi(h, { tregoNxenesin: vertete, onKlik: () => navigimi.shko("admin_nxenesi", h.nxenesi) }))
        }
    }
    p.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

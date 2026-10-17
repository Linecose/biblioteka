# skano.es - ekrani "Skano QR": VETEM placeholder, pa kamera reale (porti i scan_qr_screen.dart)
#
# Rrjedha e planifikuar: QR i nxenesit -> QR i librit -> huazimi.
# Ketu e simulojme me dy butona qe "gjejne" nje nxenes dhe nje liber nga te dhenat e false.
# NOTE per versionin real: nje skaner USB QR vepron si tastiere - mjafton nje fushe_teksti qe merr kodin.

konstante { NGJYRAT } = perfshi("../stili.es")
konstante { nxenesit, librat } = perfshi("../te_dhenat.es")
konstante { tekst, karte_ime, avatar, kopertina, buton_primar, buton_dytesor, kuti_stilizuar, ne_mes, faqe_pa_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    leje nxenesi = asnje        # asnje = ende pa "skanuar"
    leje libri = asnje

    konstante faqja = faqe_pa_titull()
    konstante p = faqja.permbajtja
    p.shto(tekst("Skano QR", { madhesia: 26, trashe: vertete }))
    konstante udhezimi = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte })
    p.shto(udhezimi)

    # --- Zona e "kameres" (placeholder) ---
    konstante kamera = kuti_stilizuar("vertikal", `background-color: ${NGJYRAT.primare_erret}; border-radius: 20px;`, 14)
    kamera.vendos_madhesi(0, 260)
    kamera.shto_shtrirje()
    konstante shenjestra = kuti_stilizuar("vertikal", `background: transparent; border: 3px solid ${NGJYRAT.theksi}; border-radius: 18px;`)
    shenjestra.vendos_madhesi_fikse(170, 170)
    shenjestra.shto(tekst("▦", { madhesia: 80, ngjyra: "rgba(255,255,255,70)", rreshtim: "qender" }), 1)
    kamera.shto(ne_mes(shenjestra))
    kamera.shto_shtrirje()
    kamera.shto(tekst("Pamje kamere (demo - pa skanim real)", { madhesia: 12, ngjyra: "rgba(255,255,255,170)", rreshtim: "qender" }))
    p.shto(kamera)

    # Rezultatet e "skanimit" shfaqen ketu
    konstante rezultatet = kontejner("vertikal")
    rezultatet.vendos_hapesira(10)
    p.shto(rezultatet)

    konstante butonat = kontejner("vertikal")
    butonat.vendos_hapesira(10)
    p.shto(butonat)
    p.shto_shtrirje()

    # Rindertoon rezultatet dhe butonat sipas hapit aktual (ne Flutter kjo behej me setState)
    funksion rifresko() {
        # Hapi: 1 = pret nxenesin, 2 = pret librin, 3 = gati
        konstante hapi = nxenesi === asnje ? 1 : (libri === asnje ? 2 : 3)
        udhezimi.vendos_tekst(
            hapi === 1 ? "Hapi 1: skano QR-ne e nxenesit" :
            hapi === 2 ? "Hapi 2: skano QR-ne e librit" : "Gati! Vazhdo me regjistrimin."
        )

        rezultatet.pastro()
        nese (nxenesi !== asnje) {
            konstante k = karte_ime("horizontal", { margina: 12, onKlik: () => navigimi.shko("admin_nxenesi", nxenesi) })
            k.vendos_hapesira(12)
            k.shto(avatar(nxenesi, 48))
            konstante kolona = kontejner("vertikal")
            kolona.vendos_hapesira(2)
            kolona.shto(tekst(nxenesi.emri_i_plote, { madhesia: 16, trashe: vertete }))
            kolona.shto(tekst(`${nxenesi.id} · ${nxenesi.klasa_emri}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
            k.shto(kolona, 1)
            k.shto(tekst("✔", { madhesia: 20, ngjyra: NGJYRAT.sukses, mbulo: gabim_val }))
            rezultatet.shto(k)
        }
        nese (libri !== asnje) {
            konstante k = karte_ime("horizontal", { margina: 12, onKlik: () => navigimi.shko("admin_libri", libri) })
            k.vendos_hapesira(12)
            k.shto(kopertina(libri, 40))
            konstante kolona = kontejner("vertikal")
            kolona.vendos_hapesira(2)
            kolona.shto(tekst(libri.titulli, { madhesia: 16, trashe: vertete }))
            kolona.shto(tekst(`${libri.id} · ${libri.autori}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
            k.shto(kolona, 1)
            k.shto(tekst("✔", { madhesia: 20, ngjyra: NGJYRAT.sukses, mbulo: gabim_val }))
            rezultatet.shto(k)
        }

        butonat.pastro()
        nese (hapi === 1) {
            butonat.shto(buton_primar("Simulo: skano QR te nxenesit", () => { nxenesi = nxenesit[2]; rifresko() }))   # Dritan Leka
        }
        nese (hapi === 2) {
            butonat.shto(buton_primar("Simulo: skano QR te librit", () => { libri = librat.find((l) => l.i_lire); rifresko() }))
        }
        nese (hapi === 3) {
            butonat.shto(buton_primar("Vazhdo te huazimi", () => navigimi.shko("admin_huazim", { nxenesi, libri, eshte_huazim: vertete })))
        }
        nese (hapi > 1) {
            butonat.shto(buton_dytesor("↻  Fillo nga e para", () => { nxenesi = asnje; libri = asnje; rifresko() }))
        }
    }
    rifresko()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

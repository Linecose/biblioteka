(function () {
const __modulet = {
"kryesor.es": function (module, exports, perfshi, __dirname, __filename) { 




const { STILI_GLOBAL } = perfshi("./stili.es")
const navigimi = perfshi("./navigimi.es")

const welcome = perfshi("./perbashket/welcome.es")
const auth = perfshi("./nxenes/auth.es")
const shell = perfshi("./nxenes/shell.es")
const karta = perfshi("./nxenes/karta.es")
const qr_im = perfshi("./nxenes/qr_im.es")
const detaje_libri = perfshi("./nxenes/detaje_libri.es")
const afatet = perfshi("./nxenes/afatet.es")

const admin_login = perfshi("./admin/login.es")
const admin_shell = perfshi("./admin/shell.es")
const admin_nxenesi = perfshi("./admin/detaje_nxenesi.es")
const admin_libri = perfshi("./admin/detaje_libri.es")
const admin_huazim = perfshi("./admin/huazim_kthim.es")
const admin_njoftime = perfshi("./admin/njoftime.es")


navigimi.regjistro("welcome", welcome.krijo())
navigimi.regjistro("auth", auth.krijo())
navigimi.regjistro("shell", shell.krijo())
navigimi.regjistro("karta", karta.krijo())
navigimi.regjistro("qr", qr_im.krijo())
navigimi.regjistro("detaje_libri", detaje_libri.krijo())
navigimi.regjistro("afatet", afatet.krijo())
navigimi.regjistro("admin_login", admin_login.krijo())
navigimi.regjistro("admin_shell", admin_shell.krijo())
navigimi.regjistro("admin_nxenesi", admin_nxenesi.krijo())
navigimi.regjistro("admin_libri", admin_libri.krijo())
navigimi.regjistro("admin_huazim", admin_huazim.krijo())
navigimi.regjistro("admin_njoftime", admin_njoftime.krijo())


const dritarja = krijo_dritare("Biblioteka Digjitale", 420, 800)
dritarja.vendos_stil(STILI_GLOBAL)
dritarja.vendos_madhesi(420, 800)
dritarja.vendos_permbajtjen(navigimi.ekranet)
dritarja.shfaqe()

},
"stili.es": function (module, exports, perfshi, __dirname, __filename) { 


const NGJYRAT = {
    primare: "#2F4B8C",
    primare_erret: "#1B2D5E",
    theksi: "#F2A93B",
    sfondi: "#F4F6FB",
    kufiri: "#E4E7F0",
    sukses: "#2E9E6B",
    paralajmerim: "#E08A00",
    rrezik: "#D64545",
    tekst: "#1F2437",
    tekst_i_zbehte: "#6B7287"
}


function rgba(hex, alfa) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alfa})`
}


function erresoje(hex, sasia) {
    const pjesa = (nga) => {
        const v = parseInt(hex.slice(nga, nga + 2), 16)
        return Math.round(v * (1 - sasia)).toString(16).padStart(2, "0")
    }
    return "#" + pjesa(1) + pjesa(3) + pjesa(5)
}


const IKONA = {
    kreu: "🏠", librat: "📚", njoftime: "🔔", profili: "👤",
    liber: "📖", karte: "🪪", qr: "▦", afati: "📅", historiku: "🕘",
    paralajmerim: "⚠", alarm: "⏰", marrje: "⬇", kthim: "✔", info: "ℹ",
    kthehu: "‹", mbrapa: "←", emaili: "✉", telefoni: "☎", id: "#", dil: "⎋",
    klasa: "🎓", emri: "👤", statusi: "✔", mbyllur: "🔒", shigjeta: "›"
}


const STILI_GLOBAL = `
    QMainWindow, QWidget#eagle-rrenja { background-color: ${NGJYRAT.sfondi}; }
    QLabel { background: transparent; color: ${NGJYRAT.tekst}; font-size: 14px; }
    QLineEdit {
        background: white; border: 1px solid ${NGJYRAT.kufiri}; border-radius: 12px;
        padding: 12px 14px; font-size: 14px; color: ${NGJYRAT.tekst};
    }
    QLineEdit:focus { border: 2px solid ${NGJYRAT.primare}; }
    QScrollArea { border: none; background: transparent; }
    QScrollArea > QWidget > QWidget { background: transparent; }
`

module.exports = { NGJYRAT, IKONA, STILI_GLOBAL, rgba, erresoje }

},
"navigimi.es": function (module, exports, perfshi, __dirname, __filename) { 










const ekranet = ekrane()     
const regjistri = {}         
const indekset = {}          

function regjistro(emri, ekrani) {
    regjistri[emri] = ekrani
    indekset[emri] = ekranet.shto_ekran(ekrani.widget)
}

function shko(emri, arg) {
    const ekrani = regjistri[emri]
    if (!ekrani) { throw new Error("Ekrani nuk ekziston: " + emri) }
    if (ekrani.hap) { ekrani.hap(arg) }
    ekranet.shfaq_ekranin(indekset[emri])
}

function kthehu() { ekranet.kthehu() }

function shko_dhe_fshi(emri, arg) {
    shko(emri, arg)
    ekranet.pastro_historine()
}

module.exports = { ekranet, regjistro, shko, kthehu, shko_dhe_fshi }

},
"perbashket/welcome.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { tekst, logo, ne_mes, kuti_stilizuar } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    
    const rrenja = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 ${NGJYRAT.primare_erret}, stop:1 ${NGJYRAT.primare});`,
        [24, 24, 24, 24]
    )
    rrenja.vendos_hapesira(10)
    rrenja.shto_shtrirje()
    rrenja.shto(ne_mes(logo(104, true)))
    rrenja.shto_hapesire(18)
    rrenja.shto(tekst("Biblioteka Digjitale", { madhesia: 30, trashe: true, ngjyra: "white", rreshtim: "qender" }))
    rrenja.shto(tekst("Huazo libra, shiko afatet dhe mbaj\nkarten e bibliotekes gjithmone me vete.", { madhesia: 15, ngjyra: "rgba(255,255,255,180)", rreshtim: "qender" }))
    rrenja.shto_shtrirje()
    rrenja.shto_shtrirje()

    
    const buton_nxenes = buton_i_ri(IKONA.klasa + "  Vazhdo si Nxenes")
    buton_nxenes.vendos_stil(`
        QPushButton { background-color: white; color: ${NGJYRAT.primare_erret}; border: none; border-radius: 14px;
                      padding: 16px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: #EEF2FF; }
    `)
    buton_nxenes.vendos_kursor_dore()
    buton_nxenes.kur_klikohet(() => navigimi.shko("auth"))
    rrenja.shto(buton_nxenes)

    const buton_admin = buton_i_ri("⚙  Vazhdo si Administrator")
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
    return { widget: rrenja }
}

module.exports = { krijo }

},
"komponente.es": function (module, exports, perfshi, __dirname, __filename) { 




const { NGJYRAT, IKONA, rgba, erresoje } = perfshi("./stili.es")
const { formato_daten } = perfshi("./ndihmes.es")
const { GJENDJA, LLOJET_NJOFTIMIT } = perfshi("./modelet.es")
const { krijo_qr_png } = perfshi("./qr_png.es")

let numruesi_id = 0





function tekst(permbajtja, o = {}) {
    const t = tekst_i_ri(String(permbajtja))
    t.vendos_stil(
        `font-size: ${o.madhesia || 14}px; font-weight: ${o.trashe ? "bold" : "normal"}; ` +
        `color: ${o.ngjyra || NGJYRAT.tekst}; background: transparent;`
    )
    
    if (o.mbulo !== false) { t.mbulo_tekstin(true) }
    if (o.rreshtim) { t.vendos_rreshtim(o.rreshtim) }
    return t
}



function kuti_stilizuar(drejtimi, css, margina = 0) {
    const k = kontejner(drejtimi)
    numruesi_id++
    const id = "kuti" + numruesi_id
    k.vendos_id(id)
    k.vendos_stil(`#${id} { ${css} }`)
    if (margina) { k.vendos_margina(margina) }
    return k
}


function karte_ime(drejtimi, o = {}) {
    const k = kuti_stilizuar(
        drejtimi,
        `background-color: ${o.ngjyra || "white"}; border: 1px solid ${NGJYRAT.kufiri}; border-radius: 16px;`,
        o.margina === undefined ? 16 : o.margina
    )
    if (o.onKlik) { k.kur_klikohet(o.onKlik) }
    return k
}


function buton_primar(etiketa, onKlik) {
    const b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background-color: ${NGJYRAT.primare}; color: white; border: none;
                      border-radius: 14px; padding: 15px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: ${NGJYRAT.primare_erret}; }
        QPushButton:disabled { background-color: #B8C0D6; }
    `)
    if (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    return b
}

function buton_dytesor(etiketa, onKlik, ngjyra = NGJYRAT.primare) {
    const b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background-color: white; color: ${ngjyra}; border: 1px solid ${NGJYRAT.kufiri};
                      border-radius: 14px; padding: 15px; font-size: 16px; font-weight: bold; }
        QPushButton:hover { background-color: #F0F4FF; }
    `)
    if (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    return b
}


function buton_tekst(etiketa, onKlik, ngjyra = NGJYRAT.primare) {
    const b = buton_i_ri(etiketa)
    b.vendos_stil(`
        QPushButton { background: transparent; color: ${ngjyra}; border: none; font-size: 13px; font-weight: bold; padding: 4px 6px; }
        QPushButton:hover { text-decoration: underline; }
    `)
    if (onKlik) { b.kur_klikohet(onKlik) }
    b.vendos_kursor_dore()
    return b
}


function chip(etiketa, ngjyra) {
    const t = tekst(etiketa, { madhesia: 12, trashe: true, ngjyra: ngjyra, mbulo: false })
    t.vendos_stil(
        `background-color: ${rgba(ngjyra, 30)}; color: ${ngjyra}; border-radius: 11px; ` +
        `padding: 3px 10px; font-size: 12px; font-weight: bold;`
    )
    return t
}


function majtas(elementi) {
    const r = kontejner("horizontal")
    r.shto(elementi)
    r.shto_shtrirje()
    return r
}


function ndares() {
    const v = kuti_stilizuar("vertikal", `background-color: ${NGJYRAT.kufiri};`)
    v.vendos_madhesi(0, 1)
    v.vendos_madhesi_maksimale(16777215, 1)
    return v
}



function ngjyra_e_gjendjes(gjendja) {
    if (gjendja === GJENDJA.NE_KOHE) { return NGJYRAT.sukses }
    if (gjendja === GJENDJA.AFAT_AFER) { return NGJYRAT.paralajmerim }
    if (gjendja === GJENDJA.ME_VONESE) { return NGJYRAT.rrezik }
    return NGJYRAT.tekst_i_zbehte
}

function etiketa_e_gjendjes(gjendja) {
    if (gjendja === GJENDJA.NE_KOHE) { return "Brenda afatit" }
    if (gjendja === GJENDJA.AFAT_AFER) { return "Afati afer" }
    if (gjendja === GJENDJA.ME_VONESE) { return "Me vonese" }
    return "Kthyer"
}

function chip_huazimi(huazimi) {
    return chip(etiketa_e_gjendjes(huazimi.gjendja()), ngjyra_e_gjendjes(huazimi.gjendja()))
}

function chip_disponueshmerie(libri) {
    return chip(libri.i_lire ? "I lire" : "I huazuar", libri.i_lire ? NGJYRAT.sukses : NGJYRAT.paralajmerim)
}




function kopertina(libri, gjeresia = 56) {
    const nga = libri.ngjyra_e_kopertines
    const k = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 ${nga}, stop:1 ${erresoje(nga, 0.35)}); border-radius: 8px;`
    )
    k.vendos_madhesi_fikse(gjeresia, Math.round(gjeresia * 1.4))
    k.shto(tekst(IKONA.liber, { madhesia: Math.round(gjeresia * 0.42), ngjyra: "white", rreshtim: "qender", mbulo: false }), 1)
    return k
}


function avatar(nxenesi, madhesia = 44) {
    const t = tekst(nxenesi.inicialet(), { madhesia: Math.round(madhesia * 0.36), trashe: true, ngjyra: NGJYRAT.primare, rreshtim: "qender", mbulo: false })
    t.vendos_stil(
        `background-color: ${rgba(NGJYRAT.primare, 28)}; color: ${NGJYRAT.primare}; ` +
        `font-size: ${Math.round(madhesia * 0.36)}px; font-weight: bold; border-radius: ${Math.floor(madhesia / 2)}px;`
    )
    t.vendos_madhesi_fikse(madhesia, madhesia)
    return t
}


function qr(te_dhenat, madhesia = 200) {
    const dalja = krijo_qr_png(te_dhenat, Math.round(madhesia * 0.88))
    const imazhi = imazh_i_ri()
    imazhi.vendos_imazh_nga_te_dhena(dalja.buffer, "PNG")
    const kuti = kuti_stilizuar("vertikal", "background-color: white; border-radius: 12px;", Math.round(madhesia * 0.06))
    kuti.shto(imazhi)
    kuti.vendos_madhesi_fikse(madhesia, madhesia)
    return kuti
}


function karta_digjitale(nxenesi, kompakte = false) {
    const k = kuti_stilizuar(
        "vertikal",
        `background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 ${NGJYRAT.primare_erret}, stop:1 ${NGJYRAT.primare}); border-radius: 22px;`,
        20
    )
    k.vendos_hapesira(6)

    
    const lart = kontejner("horizontal")
    lart.shto(tekst(IKONA.liber + "  BIBLIOTEKA E SHKOLLES", { madhesia: 12, trashe: true, ngjyra: "rgba(255,255,255,190)", mbulo: false }), 1)
    const etiketa = tekst("NXENES", { madhesia: 11, trashe: true, ngjyra: "white", mbulo: false })
    etiketa.vendos_stil("background-color: rgba(255,255,255,40); color: white; border-radius: 10px; padding: 3px 10px; font-size: 11px; font-weight: bold;")
    lart.shto(etiketa)
    k.shto(lart)
    k.shto_hapesire(kompakte ? 12 : 22)

    
    const mesi = kontejner("horizontal")
    const majta = kontejner("vertikal")
    majta.vendos_hapesira(2)
    majta.shto(tekst(nxenesi.emri_i_plote, { madhesia: 22, trashe: true, ngjyra: "white" }))
    majta.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: "rgba(255,255,255,190)" }))
    majta.shto_hapesire(8)
    majta.shto(tekst("ID E NXENESIT", { madhesia: 10, ngjyra: "rgba(255,255,255,140)" }))
    majta.shto(tekst(nxenesi.id, { madhesia: 15, trashe: true, ngjyra: "white" }))
    mesi.shto(majta, 1)
    if (!kompakte) { mesi.shto(qr(nxenesi.id, 84)) }
    k.shto(mesi)

    if (!kompakte) {
        k.shto_hapesire(10)
        const vije = kuti_stilizuar("vertikal", "background-color: rgba(255,255,255,50);")
        vije.vendos_madhesi(0, 1)
        vije.vendos_madhesi_maksimale(16777215, 1)
        k.shto(vije)
        k.shto(tekst("Vlefshme deri me 30 Qer 2027", { madhesia: 12, ngjyra: "rgba(255,255,255,160)" }))
    }
    return k
}




function karte_huazimi(huazimi, o = {}) {
    const k = karte_ime("horizontal", { margina: 12, onKlik: o.onKlik })
    k.vendos_hapesira(14)
    k.shto(kopertina(huazimi.libri, 46))

    const kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(huazimi.libri.titulli, { madhesia: 15, trashe: true }))
    kolona.shto(tekst(
        o.tregoNxenesin ? `${huazimi.nxenesi.emri_i_plote} · ${huazimi.nxenesi.klasa_emri}` : huazimi.libri.autori,
        { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }
    ))
    kolona.shto_hapesire(4)

    const rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(8)
    rreshti.shto(chip_huazimi(huazimi))
    const ngjyra = huazimi.eshte_kthyer() ? NGJYRAT.tekst_i_zbehte : ngjyra_e_gjendjes(huazimi.gjendja())
    rreshti.shto(tekst(
        huazimi.eshte_kthyer() ? huazimi.etiketa_e_afatit() : `${huazimi.etiketa_e_afatit()} · ${formato_daten(huazimi.afati)}`,
        { madhesia: 12, ngjyra: ngjyra }
    ), 1)
    kolona.shto(rreshti)
    k.shto(kolona, 1)

    if (o.onKlik) { k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false })) }
    return k
}


function karte_statistike(ikona, vlera, etiketa, ngjyra = NGJYRAT.primare, onKlik = null) {
    const k = karte_ime("vertikal", { margina: 14, onKlik })
    k.vendos_hapesira(4)
    const kuti_ikona = tekst(ikona, { madhesia: 16, mbulo: false, rreshtim: "qender" })
    kuti_ikona.vendos_stil(`background-color: ${rgba(ngjyra, 30)}; border-radius: 10px; font-size: 16px;`)
    kuti_ikona.vendos_madhesi_fikse(36, 36)
    k.shto(majtas(kuti_ikona))
    k.shto_hapesire(6)
    k.shto(tekst(String(vlera), { madhesia: 26, trashe: true }))
    k.shto(tekst(etiketa, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    return k
}


function seksion(titulli, etiketa_veprimit = null, onVeprim = null) {
    const r = kontejner("horizontal")
    r.shto(tekst(titulli, { madhesia: 17, trashe: true }), 1)
    if (etiketa_veprimit) { r.shto(buton_tekst(etiketa_veprimit, onVeprim)) }
    return r
}


function rresht_info(ikona, etiketa, vlera) {
    const r = kontejner("horizontal")
    r.vendos_hapesira(12)
    r.shto(tekst(ikona, { madhesia: 16, ngjyra: NGJYRAT.primare, mbulo: false }))
    r.shto(tekst(etiketa, { ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false }))
    r.shto_shtrirje()
    r.shto(tekst(vlera, { trashe: true, rreshtim: "djathtas" }), 1)
    return r
}


function kuti_fakti(ikona, vlera, etiketa) {
    const k = karte_ime("vertikal", { margina: 10 })
    k.vendos_hapesira(2)
    k.shto(tekst(ikona, { madhesia: 18, rreshtim: "qender", mbulo: false }))
    k.shto(tekst(String(vlera), { trashe: true, rreshtim: "qender" }))
    k.shto(tekst(etiketa, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    return k
}


function ekran_i_bosh(ikona, mesazhi) {
    const k = kontejner("vertikal")
    k.vendos_margina(30)
    k.shto(tekst(ikona, { madhesia: 40, rreshtim: "qender", ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(tekst(mesazhi, { rreshtim: "qender", ngjyra: NGJYRAT.tekst_i_zbehte }))
    return k
}





function faqe_me_titull(titulli, onKthehu = null) {
    const rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(0)

    const koka = kontejner("horizontal")
    koka.vendos_margina(8, 12, 16, 4)
    koka.vendos_hapesira(4)
    if (onKthehu) {
        const prapa = buton_tekst(IKONA.kthehu, onKthehu, NGJYRAT.tekst)
        prapa.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.tekst}; font-size: 30px; padding: 0 10px 4px 10px; }`)
        koka.shto(prapa)
    }
    koka.shto(tekst(titulli, { madhesia: 20, trashe: true }), 1)
    rrenja.shto(koka)

    return { widget: rrenja, permbajtja: shto_zone_levizese(rrenja) }
}


function faqe_pa_titull() {
    const rrenja = kontejner("vertikal")
    rrenja.vendos_margina(0)
    return { widget: rrenja, permbajtja: shto_zone_levizese(rrenja) }
}


function shto_zone_levizese(rrenja) {
    const permbajtja = kontejner("vertikal")
    permbajtja.vendos_margina(16, 8, 16, 24)
    permbajtja.vendos_hapesira(12)
    rrenja.shto(zone_levizese(permbajtja), 1)
    return permbajtja
}


function pamja_e_njoftimeve(elementet) {
    const lexuar_tani = new Set()          
    const rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(10)

    const rreshti_lart = kontejner("horizontal")
    const numrimi = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false })
    const buton_te_gjitha = buton_tekst("Sheno te gjitha si te lexuara", null)
    rreshti_lart.shto(numrimi, 1)
    rreshti_lart.shto(buton_te_gjitha)
    rrenja.shto(rreshti_lart)

    const lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    rrenja.shto(lista)

    const eshte_lexuar = (i) => elementet[i].i_lexuar || lexuar_tani.has(i)

    function rindertoje() {
        let te_palexuara = 0
        lista.pastro()
        for (let i = 0; i < elementet.length; i++) {
            if (!eshte_lexuar(i)) { te_palexuara++ }
            const pozicioni = i
            lista.shto(karte_njoftimi(elementet[i], eshte_lexuar(i), () => {
                lexuar_tani.add(pozicioni)
                rindertoje()
            }))
        }
        numrimi.vendos_tekst(te_palexuara === 0 ? "Te gjitha jane lexuar" : `${te_palexuara} te palexuara`)
        buton_te_gjitha.aktivizo(te_palexuara > 0)
    }

    buton_te_gjitha.kur_klikohet(() => {
        for (let i = 0; i < elementet.length; i++) { lexuar_tani.add(i) }
        rindertoje()
    })
    rindertoje()
    return rrenja
}

function karte_njoftimi(njoftimi, i_lexuar, onKlik) {
    const L = LLOJET_NJOFTIMIT
    const ikona = { [L.KUJTESE]: IKONA.alarm, [L.VONESE]: IKONA.paralajmerim, [L.MARRJE]: IKONA.marrje, [L.KTHIM]: IKONA.kthim, [L.INFO]: IKONA.info }[njoftimi.lloji]
    const ngjyra = { [L.KUJTESE]: NGJYRAT.paralajmerim, [L.VONESE]: NGJYRAT.rrezik, [L.MARRJE]: NGJYRAT.primare, [L.KTHIM]: NGJYRAT.sukses, [L.INFO]: NGJYRAT.tekst_i_zbehte }[njoftimi.lloji]

    
    const k = karte_ime("horizontal", { ngjyra: i_lexuar ? "white" : "#F0F4FF", margina: 14, onKlik })
    k.vendos_hapesira(12)

    const rrethi = tekst(ikona, { madhesia: 18, rreshtim: "qender", mbulo: false })
    rrethi.vendos_stil(`background-color: ${rgba(ngjyra, 30)}; border-radius: 21px; font-size: 18px;`)
    rrethi.vendos_madhesi_fikse(42, 42)
    k.shto(rrethi)

    const kolona = kontejner("vertikal")
    kolona.vendos_hapesira(4)
    const titulli = kontejner("horizontal")
    titulli.shto(tekst(njoftimi.titulli, { madhesia: 15, trashe: i_lexuar ? false : true }), 1)
    if (!i_lexuar) { titulli.shto(tekst("●", { madhesia: 11, ngjyra: NGJYRAT.primare, mbulo: false })) }
    kolona.shto(titulli)
    kolona.shto(tekst(njoftimi.mesazhi, { madhesia: 13 }))
    kolona.shto(tekst(njoftimi.koha, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(kolona, 1)
    return k
}


function logo(madhesia = 88, ne_te_erret = true) {
    const l = tekst(IKONA.librat, { madhesia: Math.round(madhesia * 0.45), rreshtim: "qender", mbulo: false })
    l.vendos_stil(
        `background-color: ${ne_te_erret ? "white" : NGJYRAT.primare}; border-radius: ${Math.floor(madhesia / 2)}px; ` +
        `font-size: ${Math.round(madhesia * 0.45)}px; color: ${ne_te_erret ? NGJYRAT.primare : "white"};`
    )
    l.vendos_madhesi_fikse(madhesia, madhesia)
    return l
}


function ne_mes(elementi) {
    const r = kontejner("horizontal")
    r.shto_shtrirje()
    r.shto(elementi)
    r.shto_shtrirje()
    return r
}


function veprim_i_shpejte(ikona, etiketa, onKlik) {
    const k = kontejner("vertikal")
    k.vendos_hapesira(6)
    const kuti_ikona = tekst(ikona, { madhesia: 22, rreshtim: "qender", mbulo: false })
    kuti_ikona.vendos_stil(`background-color: ${rgba(NGJYRAT.primare, 24)}; border-radius: 16px; font-size: 22px;`)
    kuti_ikona.vendos_madhesi_fikse(56, 56)
    k.shto(ne_mes(kuti_ikona))
    k.shto(tekst(etiketa, { madhesia: 12, rreshtim: "qender", mbulo: false }))
    if (onKlik) { k.kur_klikohet(onKlik) }
    return k
}

module.exports = {
    tekst, kuti_stilizuar, karte_ime, buton_primar, buton_dytesor, buton_tekst, chip, majtas, ndares,
    ngjyra_e_gjendjes, etiketa_e_gjendjes, chip_huazimi, chip_disponueshmerie,
    kopertina, avatar, qr, karta_digjitale, karte_huazimi, karte_statistike, seksion, rresht_info,
    kuti_fakti, ekran_i_bosh, faqe_me_titull, faqe_pa_titull, pamja_e_njoftimeve,
    logo, ne_mes, veprim_i_shpejte
}

},
"ndihmes.es": function (module, exports, perfshi, __dirname, __filename) { 

const MUAJT = ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nen", "Dhj"]


function formato_daten(data) {
    return `${data.getDate()} ${MUAJT[data.getMonth()]} ${data.getFullYear()}`
}


function vetem_data(data) {
    return Date.UTC(data.getFullYear(), data.getMonth(), data.getDate())
}

function ditet_midis(nga, deri) {
    return Math.round((vetem_data(deri) - vetem_data(nga)) / 86400000)
}

module.exports = { formato_daten, vetem_data, ditet_midis }

},
"modelet.es": function (module, exports, perfshi, __dirname, __filename) { 


const { formato_daten, ditet_midis } = perfshi("./ndihmes.es")

class Nxenesi {
    constructor(id, emri_i_plote, klasa_emri, emaili, telefoni) {
        this.id = id                          
        this.emri_i_plote = emri_i_plote
        this.klasa_emri = klasa_emri          
        this.emaili = emaili
        this.telefoni = telefoni
    }
    emri_i_pare() { return this.emri_i_plote.split(" ")[0] }
    
    inicialet() {
        const pjeset = this.emri_i_plote.trim().split(" ")
        if (pjeset.length === 1) { return pjeset[0][0].toUpperCase() }
        return (pjeset[0][0] + pjeset[pjeset.length - 1][0]).toUpperCase()
    }
}

class Libri {
    constructor(id, titulli, autori, kategoria, viti, faqe, vendndodhja, pershkrimi, ngjyra_e_kopertines, i_lire) {
        this.id = id                          
        this.titulli = titulli
        this.autori = autori
        this.kategoria = kategoria
        this.viti = viti
        this.faqe = faqe
        this.vendndodhja = vendndodhja        
        this.pershkrimi = pershkrimi
        this.ngjyra_e_kopertines = ngjyra_e_kopertines   
        this.i_lire = i_lire                  
    }
}


const GJENDJA = { NE_KOHE: "ne_kohe", AFAT_AFER: "afat_afer", ME_VONESE: "me_vonese", KTHYER: "kthyer" }

class Huazimi {
    constructor(libri, nxenesi, data_marrjes, afati, data_kthimit = null) {
        this.libri = libri
        this.nxenesi = nxenesi
        this.data_marrjes = data_marrjes
        this.afati = afati
        this.data_kthimit = data_kthimit      
    }
    eshte_kthyer() { return this.data_kthimit !== null }
    
    ditet_e_mbetura() { return ditet_midis(new Date(), this.afati) }
    ditet_gjithsej() { return ditet_midis(this.data_marrjes, this.afati) }
    gjendja() {
        if (this.eshte_kthyer()) { return GJENDJA.KTHYER }
        if (this.ditet_e_mbetura() < 0) { return GJENDJA.ME_VONESE }
        if (this.ditet_e_mbetura() <= 3) { return GJENDJA.AFAT_AFER }
        return GJENDJA.NE_KOHE
    }
    
    etiketa_e_afatit() {
        if (this.eshte_kthyer()) { return "Kthyer me " + formato_daten(this.data_kthimit) }
        const d = this.ditet_e_mbetura()
        if (d < 0) { return "Vonuar " + (-d) + " dite" }
        if (d === 0) { return "Afati eshte sot" }
        if (d === 1) { return "Edhe 1 dite" }
        return "Edhe " + d + " dite"
    }
}

const LLOJET_NJOFTIMIT = { KUJTESE: "kujtese", VONESE: "vonese", MARRJE: "marrje", KTHIM: "kthim", INFO: "info" }

class Njoftimi {
    constructor(titulli, mesazhi, koha, lloji, i_lexuar = false) {
        this.titulli = titulli
        this.mesazhi = mesazhi
        this.koha = koha                      
        this.lloji = lloji
        this.i_lexuar = i_lexuar
    }
}

module.exports = { Nxenesi, Libri, Huazimi, Njoftimi, GJENDJA, LLOJET_NJOFTIMIT }

},
"qr_png.es": function (module, exports, perfshi, __dirname, __filename) { 





const zlib = perfshi("zlib")
const { NGJYRAT } = perfshi("./stili.es")

const KATRORE = 25


const TABELA_CRC = (() => {
    const t = []
    for (let n = 0; n < 256; n++) {
        let c = n
        for (let k = 0; k < 8; k++) { c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1) }
        t.push(c >>> 0)
    }
    return t
})()

function crc32(buffer) {
    let c = 0xFFFFFFFF
    for (let i = 0; i < buffer.length; i++) { c = TABELA_CRC[(c ^ buffer[i]) & 0xFF] ^ (c >>> 8) }
    return (c ^ 0xFFFFFFFF) >>> 0
}

function pjese_png(lloji, te_dhenat) {
    const gjatesia = Buffer.alloc(4)
    gjatesia.writeUInt32BE(te_dhenat.length, 0)
    const pjesa_crc = Buffer.alloc(4)
    pjesa_crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(lloji, "ascii"), te_dhenat])), 0)
    return Buffer.concat([gjatesia, Buffer.from(lloji, "ascii"), te_dhenat, pjesa_crc])
}

function kendi(r, k) {
    return (r < 7 && k < 7) || (r < 7 && k >= KATRORE - 7) || (r >= KATRORE - 7 && k < 7)
}


function ndertoMatricen(te_dhenat) {
    let fara = 7
    for (const ch of te_dhenat) { fara = (fara * 31 + ch.charCodeAt(0)) % 16777216 }

    const m = []
    for (let r = 0; r < KATRORE; r++) {
        const rreshti = []
        for (let k = 0; k < KATRORE; k++) {
            let e_erret = false
            if (!kendi(r, k)) {
                fara = (fara * 1664525 + 1013904223) % 4294967296
                e_erret = Math.floor(fara / 65536) % 2 === 1
            }
            rreshti.push(e_erret)
        }
        m.push(rreshti)
    }

    
    const kend = (r0, k0) => {
        for (let r = 0; r < 7; r++) {
            for (let k = 0; k < 7; k++) {
                const skaj = r === 0 || r === 6 || k === 0 || k === 6
                const qender = r >= 2 && r <= 4 && k >= 2 && k <= 4
                m[r0 + r][k0 + k] = skaj || qender
            }
        }
    }
    kend(0, 0)
    kend(0, KATRORE - 7)
    kend(KATRORE - 7, 0)
    return m
}


function krijo_qr_png(te_dhenat, madhesia_e_deshiruar) {
    const skala = Math.max(1, Math.floor(madhesia_e_deshiruar / KATRORE))
    const madhesia = KATRORE * skala
    const matrica = ndertoMatricen(te_dhenat)

    const e_erret = [0x1F, 0x24, 0x37]   
    const rreshti_bajte = 1 + madhesia * 3
    const raw = Buffer.alloc(rreshti_bajte * madhesia, 0xFF)   
    for (let y = 0; y < madhesia; y++) {
        const baza = y * rreshti_bajte
        raw[baza] = 0                                  
        const r = Math.floor(y / skala)
        for (let x = 0; x < madhesia; x++) {
            if (matrica[r][Math.floor(x / skala)]) {
                const p = baza + 1 + x * 3
                raw[p] = e_erret[0]; raw[p + 1] = e_erret[1]; raw[p + 2] = e_erret[2]
            }
        }
    }

    const ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(madhesia, 0)
    ihdr.writeUInt32BE(madhesia, 4)
    ihdr[8] = 8     
    ihdr[9] = 2     
    const buffer = Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
        pjese_png("IHDR", ihdr),
        pjese_png("IDAT", zlib.deflateSync(raw)),
        pjese_png("IEND", Buffer.alloc(0))
    ])
    return { buffer, madhesia }
}

module.exports = { krijo_qr_png }

},
"nxenes/auth.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { tekst, buton_primar, buton_tekst, ne_mes, logo, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    let eshte_hyrje = true         

    const faqja = faqe_me_titull("", () => navigimi.kthehu())
    const p = faqja.permbajtja
    p.vendos_hapesira(14)
    p.vendos_margina(24, 0, 24, 24)

    p.shto(ne_mes(logo(72, false)))
    const titulli = tekst("", { madhesia: 24, trashe: true, rreshtim: "qender" })
    const nentitulli = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" })
    p.shto(titulli)
    p.shto(nentitulli)

    
    const ndruesi = kontejner("horizontal")
    ndruesi.vendos_hapesira(0)
    const buton_hyr = buton_i_ri("Hyr")
    const buton_regjistrohu = buton_i_ri("Regjistrohu")
    ndruesi.shto(buton_hyr, 1)
    ndruesi.shto(buton_regjistrohu, 1)
    p.shto(ndruesi)

    
    const fusha_emri = fushe_teksti("Emri dhe mbiemri")
    const fusha_klasa = fushe_teksti("Klasa (p.sh. 10-B)")
    const fusha_emaili = fushe_teksti("Email ose ID e nxenesit")
    const fusha_fjalekalimi = fushe_fjalekalimi("Fjalekalimi")
    const fusha_shtese = kontejner("vertikal")      
    fusha_shtese.vendos_hapesira(14)
    fusha_shtese.shto(fusha_emri)
    fusha_shtese.shto(fusha_klasa)
    p.shto(fusha_shtese)
    p.shto(fusha_emaili)

    const rreshti_fjalekalimit = kontejner("horizontal")
    rreshti_fjalekalimit.vendos_hapesira(6)
    let e_fshehur = true
    const syri = buton_tekst("👁", () => {
        e_fshehur = !e_fshehur
        fusha_fjalekalimi.shfaq_fjalekalimin(!e_fshehur)
    })
    rreshti_fjalekalimit.shto(fusha_fjalekalimi, 1)
    rreshti_fjalekalimit.shto(syri)
    p.shto(rreshti_fjalekalimit)

    const harrova = buton_tekst("Harrove fjalekalimin?", () => shfaq_mesazh("Demo", "Rivendosja e fjalekalimit - funksion i ardhshem."))
    p.shto(majtas_djathtas(harrova))

    const buton_kryesor = buton_primar("", () => navigimi.shko_dhe_fshi("shell"))
    p.shto(buton_kryesor)
    p.shto(tekst("Demo: nuk kerkohet asnje e dhene reale. Shtyp butonin per te vazhduar.", { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()

    
    const stili_ndruesit = (aktiv, anesia) => `
        QPushButton { background-color: ${aktiv ? NGJYRAT.primare : "white"}; color: ${aktiv ? "white" : NGJYRAT.tekst};
                      border: 1px solid ${aktiv ? NGJYRAT.primare : NGJYRAT.kufiri}; padding: 11px; font-size: 14px; font-weight: bold;
                      ${anesia === "majtas" ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : "border-top-right-radius: 12px; border-bottom-right-radius: 12px;"} }
    `

    
    function rifresko() {
        titulli.vendos_tekst(eshte_hyrje ? "Mire se u ktheve!" : "Krijo llogarine tende")
        nentitulli.vendos_tekst(eshte_hyrje ? "Hyr per te pare kartën dhe librat e tu." : "Regjistrohu nga shtepia dhe merr karten digjitale.")
        buton_kryesor.vendos_tekst(eshte_hyrje ? "Hyr" : "Krijo llogarine")
        harrova.aktivizo(eshte_hyrje)
        if (eshte_hyrje) { fusha_shtese.fshih() } else { fusha_shtese.shfaq_elementin() }
        buton_hyr.vendos_stil(stili_ndruesit(eshte_hyrje, "majtas"))
        buton_regjistrohu.vendos_stil(stili_ndruesit(!eshte_hyrje, "djathtas"))
    }
    buton_hyr.kur_klikohet(() => { eshte_hyrje = true; rifresko() })
    buton_regjistrohu.kur_klikohet(() => { eshte_hyrje = false; rifresko() })
    rifresko()

    
    return { widget: faqja.widget, hap: () => { eshte_hyrje = true; rifresko() } }
}


function majtas_djathtas(elementi) {
    const r = kontejner("horizontal")
    r.shto_shtrirje()
    r.shto(elementi)
    return r
}

module.exports = { krijo }

},
"nxenes/shell.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { kuti_stilizuar } = perfshi("../komponente.es")
const home = perfshi("./home.es")
const librat = perfshi("./librat.es")
const njoftime = perfshi("./njoftime.es")
const profili = perfshi("./profili.es")

function krijo() {
    const rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(0)

    
    const faqet = ekrane()
    const hapSkeden = (i) => ndrysho(i)
    faqet.shto_ekran(home.krijo(hapSkeden).widget)
    faqet.shto_ekran(librat.krijo().widget)
    faqet.shto_ekran(njoftime.krijo().widget)
    faqet.shto_ekran(profili.krijo().widget)
    rrenja.shto(faqet, 1)

    
    const shiriti = kuti_stilizuar("horizontal", `background-color: white; border-top: 1px solid ${NGJYRAT.kufiri};`, [8, 6, 8, 6])
    shiriti.vendos_hapesira(4)
    const etiketat = [
        { ikona: IKONA.kreu, emri: "Kreu" },
        { ikona: IKONA.librat, emri: "Librat" },
        { ikona: IKONA.njoftime, emri: "Njoftime" },
        { ikona: IKONA.profili, emri: "Profili" }
    ]
    const butonat = etiketat.map((e, i) => {
        const b = buton_i_ri(`${e.ikona}\n${e.emri}`)
        b.vendos_kursor_dore()
        b.kur_klikohet(() => ndrysho(i))
        shiriti.shto(b, 1)
        return b
    })
    rrenja.shto(shiriti)

    
    function ndrysho(i) {
        faqet.shfaq_ekranin(i)
        butonat.forEach((b, j) => {
            const aktiv = i === j
            b.vendos_stil(`
                QPushButton { background-color: ${aktiv ? "rgba(47,75,140,30)" : "transparent"}; border: none; border-radius: 14px;
                              color: ${aktiv ? NGJYRAT.primare : NGJYRAT.tekst_i_zbehte}; font-size: 12px; font-weight: ${aktiv ? "bold" : "normal"}; padding: 6px 4px; }
            `)
        })
    }
    ndrysho(0)

    
    return { widget: rrenja, hap: () => ndrysho(0) }
}

module.exports = { krijo }

},
"nxenes/home.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesi_aktual, huazimet_aktive_te, njoftimet_e_nxenesit } = perfshi("../te_dhenat.es")
const { GJENDJA } = perfshi("../modelet.es")
const {
    tekst, karte_ime, karte_statistike, karte_huazimi, karta_digjitale, kopertina, avatar, seksion,
    veprim_i_shpejte, faqe_pa_titull, buton_tekst
} = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")


function krijo(hapSkeden) {
    const nxenesi = nxenesi_aktual
    const aktive = huazimet_aktive_te(nxenesi)
    const te_vonuara = aktive.filter((h) => h.gjendja() === GJENDJA.ME_VONESE).length
    const afat_afer = aktive.filter((h) => h.gjendja() === GJENDJA.AFAT_AFER).length
    const te_palexuara = njoftimet_e_nxenesit.filter((n) => !n.i_lexuar).length

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja

    
    const koka = kontejner("horizontal")
    koka.vendos_hapesira(12)
    const av = avatar(nxenesi, 48)
    av.kur_klikohet(() => hapSkeden(3))
    koka.shto(av)
    const pershendetja = kontejner("vertikal")
    pershendetja.vendos_hapesira(0)
    pershendetja.shto(tekst("Pershendetje,", { ngjyra: NGJYRAT.tekst_i_zbehte }))
    pershendetja.shto(tekst(nxenesi.emri_i_pare(), { madhesia: 22, trashe: true }))
    koka.shto(pershendetja, 1)
    const zilja = buton_tekst(te_palexuara > 0 ? `${IKONA.njoftime} ${te_palexuara}` : IKONA.njoftime, () => hapSkeden(2), NGJYRAT.tekst)
    zilja.vendos_stil("QPushButton { background: transparent; border: none; font-size: 22px; padding: 4px 8px; }")
    koka.shto(zilja)
    p.shto(koka)

    
    if (te_vonuara > 0) {
        const alarmi = karte_ime("horizontal", { ngjyra: "#FDECEC", margina: 14, onKlik: () => navigimi.shko("afatet") })
        alarmi.vendos_hapesira(12)
        alarmi.shto(tekst(IKONA.paralajmerim, { madhesia: 20, ngjyra: NGJYRAT.rrezik, mbulo: false }))
        alarmi.shto(tekst(
            te_vonuara === 1 ? "Ke 1 liber me vonese. Kthe sa me shpejt!" : `Ke ${te_vonuara} libra me vonese. Kthe sa me shpejt!`,
            { trashe: true, ngjyra: NGJYRAT.rrezik }
        ), 1)
        alarmi.shto(tekst(IKONA.shigjeta, { madhesia: 20, ngjyra: NGJYRAT.rrezik, mbulo: false }))
        p.shto(alarmi)
    }

    
    const karta = karta_digjitale(nxenesi, true)
    karta.kur_klikohet(() => navigimi.shko("karta"))
    p.shto(karta)

    
    const statistikat = kontejner("horizontal")
    statistikat.vendos_hapesira(10)
    statistikat.shto(karte_statistike(IKONA.librat, aktive.length, "Libra te marre", NGJYRAT.primare, () => hapSkeden(1)), 1)
    statistikat.shto(karte_statistike(IKONA.afati, afat_afer, "Afat afer", NGJYRAT.paralajmerim, () => navigimi.shko("afatet")), 1)
    statistikat.shto(karte_statistike(IKONA.paralajmerim, te_vonuara, "Me vonese", NGJYRAT.rrezik, () => navigimi.shko("afatet")), 1)
    p.shto(statistikat)

    
    const veprimet = kontejner("horizontal")
    veprimet.shto(veprim_i_shpejte(IKONA.karte, "Karta ime", () => navigimi.shko("karta")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.qr, "QR-ja ime", () => navigimi.shko("qr")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.afati, "Afatet", () => navigimi.shko("afatet")), 1)
    veprimet.shto(veprim_i_shpejte(IKONA.historiku, "Historiku", () => hapSkeden(1)), 1)
    p.shto(veprimet)

    
    if (aktive.length > 0) {
        p.shto(seksion("Afati me i afert"))
        p.shto(karte_huazimi(aktive[0], { onKlik: () => navigimi.shko("detaje_libri", aktive[0].libri) }))

        p.shto(seksion("Librat e mi", "Shiko te gjitha", () => hapSkeden(1)))
        const rafti = kontejner("horizontal")
        rafti.vendos_hapesira(14)
        for (const h of aktive) {
            const kolona = kontejner("vertikal")
            kolona.vendos_hapesira(8)
            kolona.shto(kopertina(h.libri, 100))
            kolona.shto(tekst(h.libri.titulli, { madhesia: 13, trashe: true }))
            kolona.vendos_madhesi_maksimale(110, 16777215)
            kolona.kur_klikohet(() => navigimi.shko("detaje_libri", h.libri))
            rafti.shto(kolona)
        }
        rafti.shto_shtrirje()
        p.shto(rafti)
    }
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"te_dhenat.es": function (module, exports, perfshi, __dirname, __filename) { 



const { Nxenesi, Libri, Huazimi, Njoftimi, GJENDJA, LLOJET_NJOFTIMIT } = perfshi("./modelet.es")


const dite_para = (n) => new Date(Date.now() - n * 86400000)
const dite_pas = (n) => new Date(Date.now() + n * 86400000)

const nxenesit = [
    new Nxenesi("STU-2026-0147", "Era Hoxha", "10-B", "era.hoxha@shkolla.demo", "+355 69 123 4567"),
    new Nxenesi("STU-2026-0112", "Arben Krasniqi", "9-A", "arben.krasniqi@shkolla.demo", "+355 68 222 3344"),
    new Nxenesi("STU-2026-0203", "Dritan Leka", "11-C", "dritan.leka@shkolla.demo", "+355 67 555 1020"),
    new Nxenesi("STU-2026-0158", "Ana Shehu", "10-A", "ana.shehu@shkolla.demo", "+355 69 777 8899"),
    new Nxenesi("STU-2026-0231", "Blerta Gjoka", "12-B", "blerta.gjoka@shkolla.demo", "+355 68 410 2030"),
    new Nxenesi("STU-2026-0095", "Klea Marku", "9-C", "klea.marku@shkolla.demo", "+355 69 300 4050"),
    new Nxenesi("STU-2026-0276", "Gent Dervishi", "11-A", "gent.dervishi@shkolla.demo", "+355 67 811 9090"),
    new Nxenesi("STU-2026-0184", "Elira Basha", "10-C", "elira.basha@shkolla.demo", "+355 68 650 7788")
]


const nxenesi_aktual = nxenesit[0]

const emri_i_adminit = "Znj. Mirela"
const roli_i_adminit = "Bibliotekare"

const librat = [
    new Libri("LB-0001", "Kronike ne gur", "Ismail Kadare", "Roman", 1971, 304, "Rafti A2",
        "Nje qytet guri para syve te nje femije gjate Luftes se Dyte Boterore. Nje roman i njohur i letersise shqipe.", "#7A5C45", false),
    new Libri("LB-0002", "Princi i vogel", "Antoine de Saint-Exupery", "Roman", 1943, 96, "Rafti B1",
        "Nje perrallë poetike per miqesine, dashurine dhe per gjerat qe shihen vetem me zemer.", "#2E7D9A", false),
    new Libri("LB-0003", "Gjenerali i ushtrise se vdekur", "Ismail Kadare", "Roman", 1963, 330, "Rafti A2",
        "Nje gjeneral italian kthehet ne Shqiperi per te gjetur eshtrat e ushtareve te rene gjate luftes.", "#55606E", false),
    new Libri("LB-0004", "Vargjet e lira", "Millosh Gjergj Nikolla (Migjeni)", "Poezi", 1936, 120, "Rafti C3",
        "Permbledhje poetike me tone sociale dhe moderne, nje nga veprat themelore te poezise shqipe.", "#8B3A3A", true),
    new Libri("LB-0005", "Lahuta e Malcis", "Gjergj Fishta", "Poezi", 1937, 480, "Rafti C3",
        "Eposi kombetar shqiptar, qe rrefen luftërat e maleve per mbrojtjen e vendit.", "#5C6B3A", true),
    new Libri("LB-0006", "1984", "George Orwell", "Roman", 1949, 328, "Rafti B2",
        "Nje bote e kontrolluar nga \"Vellai i Madh\", ku edhe mendimet jane nen vezhgim.", "#3B3B4F", false),
    new Libri("LB-0007", "Romeo dhe Zhuljeta", "William Shakespeare", "Drame", 1597, 224, "Rafti D1",
        "Tragjedia e dy te rinjve nga familje ne armiqesi, nje nga historite me te njohura te dashurise.", "#B2486B", true),
    new Libri("LB-0008", "Harry Potter dhe Guri Filozofal", "J. K. Rowling", "Fantazi", 1997, 309, "Rafti B3",
        "Nje djale zbulon se eshte magjistar dhe fillon shkollen e magjise Hogwarts.", "#6A4C93", false),
    new Libri("LB-0009", "Historia e Shqiperise", "Autore te ndryshem", "Histori", 2002, 410, "Rafti E1",
        "Nje permbledhje e historise se shqiptareve nga lashtesia deri ne ditet tona.", "#C0392B", true),
    new Libri("LB-0010", "Hyrje ne Algjebër", "Autore te ndryshem", "Shkence", 2018, 256, "Rafti F2",
        "Tekst ndihmes per nxenesit e gjimnazit: ekuacione, funksione dhe ushtrime te zgjidhura.", "#2F4B8C", true),
    new Libri("LB-0011", "Don Kishoti", "Miguel de Cervantes", "Roman", 1605, 520, "Rafti B4",
        "Aventurat e nje zoterie qe lexon shume romane kalorësish dhe vendos te behet vete kalores.", "#B7791F", true),
    new Libri("LB-0012", "Atlasi Gjeografik", "Autore te ndryshem", "Gjeografi", 2015, 180, "Rafti F4",
        "Harta te vendeve dhe kontinenteve per mesimin e gjeografise.", "#1F8A70", true)
]


function libri_me_id(id) { return librat.find((l) => l.id === id) }


const huazimet = [
    
    new Huazimi(libri_me_id("LB-0001"), nxenesit[0], dite_para(21), dite_para(7)),     
    new Huazimi(libri_me_id("LB-0002"), nxenesit[0], dite_para(11), dite_pas(3)),      
    new Huazimi(libri_me_id("LB-0006"), nxenesit[0], dite_para(3), dite_pas(11)),      
    new Huazimi(libri_me_id("LB-0009"), nxenesit[0], dite_para(40), dite_para(26), dite_para(28)),   
    new Huazimi(libri_me_id("LB-0004"), nxenesit[0], dite_para(60), dite_para(46), dite_para(47)),   
    
    new Huazimi(libri_me_id("LB-0003"), nxenesit[1], dite_para(10), dite_pas(4)),
    new Huazimi(libri_me_id("LB-0008"), nxenesit[2], dite_para(16), dite_para(2))      
]


function huazimet_aktive_te(nxenesi) {
    return huazimet
        .filter((h) => h.nxenesi.id === nxenesi.id && !h.eshte_kthyer())
        .sort((a, b) => a.afati - b.afati)
}


function huazimet_e_kthyera_te(nxenesi) {
    return huazimet.filter((h) => h.nxenesi.id === nxenesi.id && h.eshte_kthyer())
}




function huazimet_aktive() { return huazimet.filter((h) => !h.eshte_kthyer()) }


function huazimet_me_vonese() { return huazimet_aktive().filter((h) => h.gjendja() === GJENDJA.ME_VONESE) }


function huazimi_aktiv_i_librit(libri) {
    return huazimet.find((h) => h.libri.id === libri.id && !h.eshte_kthyer())
}

function numri_i_librave_te_huazuar() { return librat.filter((l) => !l.i_lire).length }


const njoftimet_e_nxenesit = [
    new Njoftimi("Libri eshte me vonese", "\"Kronike ne gur\" duhej kthyer 7 dite me pare. Te lutemi kthejeni sa me shpejt.", "Sot, 08:30", LLOJET_NJOFTIMIT.VONESE),
    new Njoftimi("Afati po afrohet", "\"Princi i vogel\" duhet kthyer pas 3 diteve.", "Sot, 08:00", LLOJET_NJOFTIMIT.KUJTESE),
    new Njoftimi("Huazim i ri", "Ke marre \"1984\" nga biblioteka. Lexim te kendshem!", "3 dite me pare", LLOJET_NJOFTIMIT.MARRJE, true),
    new Njoftimi("Libri u kthye", "\"Historia e Shqiperise\" u regjistrua si i kthyer. Faleminderit!", "4 jave me pare", LLOJET_NJOFTIMIT.KTHIM, true),
    new Njoftimi("Orari i bibliotekes", "Biblioteka eshte e hapur cdo dite shkollore 08:00 - 15:00.", "1 muaj me pare", LLOJET_NJOFTIMIT.INFO, true)
]


const njoftimet_e_adminit = [
    new Njoftimi("2 libra me vonese", "Era Hoxha dhe Dritan Leka kane libra te pakthyer pas afatit.", "Sot, 08:30", LLOJET_NJOFTIMIT.VONESE),
    new Njoftimi("Afate qe skadojne kete jave", "2 huazime kane afat brenda 4 diteve.", "Sot, 08:00", LLOJET_NJOFTIMIT.KUJTESE),
    new Njoftimi("Nxenes i ri u regjistrua", "Elira Basha (10-C) u regjistrua nga shtepia.", "Dje, 17:20", LLOJET_NJOFTIMIT.INFO),
    new Njoftimi("Huazim i regjistruar", "Arben Krasniqi mori \"Gjenerali i ushtrise se vdekur\".", "10 dite me pare", LLOJET_NJOFTIMIT.MARRJE, true),
    new Njoftimi("Kthim i regjistruar", "Era Hoxha ktheu \"Historia e Shqiperise\".", "4 jave me pare", LLOJET_NJOFTIMIT.KTHIM, true)
]

module.exports = {
    nxenesit, nxenesi_aktual, emri_i_adminit, roli_i_adminit, librat, libri_me_id,
    huazimet, huazimet_aktive_te, huazimet_e_kthyera_te,
    huazimet_aktive, huazimet_me_vonese, huazimi_aktiv_i_librit, numri_i_librave_te_huazuar,
    njoftimet_e_nxenesit, njoftimet_e_adminit
}

},
"nxenes/librat.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesi_aktual, huazimet_aktive_te, huazimet_e_kthyera_te } = perfshi("../te_dhenat.es")
const { tekst, karte_huazimi, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    let tregoAktivet = true        

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    p.shto(tekst("Librat e mi", { madhesia: 26, trashe: true }))

    
    const ndruesi = kontejner("horizontal")
    ndruesi.vendos_hapesira(0)
    const buton_aktiv = buton_i_ri("Te marre")
    const buton_historiku = buton_i_ri("Historiku")
    ndruesi.shto(buton_aktiv, 1)
    ndruesi.shto(buton_historiku, 1)
    p.shto(ndruesi)

    const lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    const stili = (aktiv, anesia) => `
        QPushButton { background-color: ${aktiv ? NGJYRAT.primare : "white"}; color: ${aktiv ? "white" : NGJYRAT.tekst};
                      border: 1px solid ${aktiv ? NGJYRAT.primare : NGJYRAT.kufiri}; padding: 11px; font-size: 14px; font-weight: bold;
                      ${anesia === "majtas" ? "border-top-left-radius: 12px; border-bottom-left-radius: 12px;" : "border-top-right-radius: 12px; border-bottom-right-radius: 12px;"} }
    `

    
    function rifresko() {
        const huazimet = tregoAktivet ? huazimet_aktive_te(nxenesi_aktual) : huazimet_e_kthyera_te(nxenesi_aktual)
        buton_aktiv.vendos_stil(stili(tregoAktivet, "majtas"))
        buton_historiku.vendos_stil(stili(!tregoAktivet, "djathtas"))
        lista.pastro()
        if (huazimet.length === 0) {
            lista.shto(ekran_i_bosh(IKONA.librat, "Nuk ka libra per t'u shfaqur."))
        } else {
            for (const h of huazimet) {
                
                lista.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("detaje_libri", h.libri) }))
            }
        }
    }
    buton_aktiv.kur_klikohet(() => { tregoAktivet = true; rifresko() })
    buton_historiku.kur_klikohet(() => { tregoAktivet = false; rifresko() })
    rifresko()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"nxenes/njoftime.es": function (module, exports, perfshi, __dirname, __filename) { 


const { njoftimet_e_nxenesit } = perfshi("../te_dhenat.es")
const { pamja_e_njoftimeve, faqe_me_titull } = perfshi("../komponente.es")

function krijo() {
    const faqja = faqe_me_titull("Njoftime")
    faqja.permbajtja.shto(pamja_e_njoftimeve(njoftimet_e_nxenesit))
    faqja.permbajtja.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"nxenes/profili.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesi_aktual } = perfshi("../te_dhenat.es")
const { tekst, avatar, karte_ime, rresht_info, ne_mes, buton_dytesor, faqe_pa_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const nxenesi = nxenesi_aktual
    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja

    p.shto(ne_mes(avatar(nxenesi, 88)))
    p.shto(tekst(nxenesi.emri_i_plote, { madhesia: 22, trashe: true, rreshtim: "qender" }))
    p.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))

    const info = karte_ime("vertikal")
    info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
    info.shto(rresht_info(IKONA.emaili, "Email", nxenesi.emaili))
    info.shto(rresht_info(IKONA.telefoni, "Telefon", nxenesi.telefoni))
    p.shto(info)

    
    const rresht_menuje = (ikona, etiketa, onKlik) => {
        const k = karte_ime("horizontal", { margina: [16, 14, 16, 14], onKlik })
        k.vendos_hapesira(14)
        k.shto(tekst(ikona, { madhesia: 18, ngjyra: NGJYRAT.primare, mbulo: false }))
        k.shto(tekst(etiketa, { trashe: true }), 1)
        k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false }))
        return k
    }
    p.shto(rresht_menuje(IKONA.karte, "Karta ime digjitale", () => navigimi.shko("karta")))
    p.shto(rresht_menuje(IKONA.qr, "QR-ja ime", () => navigimi.shko("qr")))
    p.shto(rresht_menuje(IKONA.afati, "Afati i kthimit", () => navigimi.shko("afatet")))
    p.shto(rresht_menuje("✎", "Ndrysho profilin", () => shfaq_mesazh("Demo", "Ndryshimi i profilit - funksion i ardhshem.")))

    
    p.shto(buton_dytesor(IKONA.dil + "  Dil", () => navigimi.shko_dhe_fshi("welcome"), NGJYRAT.rrezik))
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"nxenes/karta.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesi_aktual } = perfshi("../te_dhenat.es")
const {
    tekst, karta_digjitale, karte_ime, rresht_info, ndares, buton_primar, buton_dytesor, faqe_me_titull
} = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const nxenesi = nxenesi_aktual
    const faqja = faqe_me_titull("Karta digjitale", () => navigimi.kthehu())
    const p = faqja.permbajtja

    p.shto(karta_digjitale(nxenesi))
    p.shto_hapesire(8)
    p.shto(buton_primar(IKONA.qr + "  Shfaq QR-ne time", () => navigimi.shko("qr")))
    p.shto(buton_dytesor("Shto ne Wallet", () => shfaq_mesazh("Demo", "Shtimi ne Wallet - funksion i ardhshem.")))

    const info = karte_ime("vertikal")
    info.vendos_hapesira(6)
    info.shto(rresht_info(IKONA.emri, "Emri", nxenesi.emri_i_plote))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.klasa, "Klasa", nxenesi.klasa_emri))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
    info.shto(ndares())
    info.shto(rresht_info(IKONA.statusi, "Statusi", "Aktive"))
    p.shto(info)

    p.shto(tekst("Kjo karte eshte digjitale. Tregoja QR-ne bibliotekares sa here qe do te marresh ose kthesh nje liber.", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"nxenes/qr_im.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT } = perfshi("../stili.es")
const { nxenesi_aktual } = perfshi("../te_dhenat.es")
const { tekst, qr, ne_mes, karte_ime, buton_dytesor, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const nxenesi = nxenesi_aktual
    const faqja = faqe_me_titull("QR-ja ime", () => navigimi.kthehu())
    const p = faqja.permbajtja
    p.vendos_hapesira(14)

    p.shto_shtrirje()
    const karta = karte_ime("vertikal", { margina: 20 })
    karta.vendos_hapesira(10)
    karta.shto(ne_mes(qr(nxenesi.id, 260)))
    karta.shto(tekst(nxenesi.emri_i_plote, { madhesia: 20, trashe: true, rreshtim: "qender" }))
    karta.shto(tekst(`${nxenesi.id} · ${nxenesi.klasa_emri}`, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto(karta)

    p.shto(tekst("Tregoja kete kod bibliotekares per te marre ose kthyer nje liber.", { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto(tekst("QR demonstrues — nuk eshte kod real dhe nuk skanohet.", { madhesia: 12, trashe: true, ngjyra: NGJYRAT.paralajmerim, rreshtim: "qender" }))
    p.shto_shtrirje()
    p.shto(buton_dytesor("⬇  Ruaj si imazh", () => shfaq_mesazh("Demo", "Ruajtja e QR-se - funksion i ardhshem.")))
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"nxenes/detaje_libri.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesi_aktual, huazimet_aktive_te } = perfshi("../te_dhenat.es")
const { formato_daten } = perfshi("./../ndihmes.es")
const {
    tekst, karte_ime, kopertina, chip_disponueshmerie, chip_huazimi, kuti_fakti, seksion, rresht_info,
    ne_mes, buton_dytesor, faqe_me_titull
} = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("Detajet e librit", () => navigimi.kthehu())

    
    function hap(libri) {
        const p = faqja.permbajtja
        p.pastro()

        
        const huazimi_im = huazimet_aktive_te(nxenesi_aktual).find((h) => h.libri.id === libri.id)

        p.shto(ne_mes(kopertina(libri, 150)))
        p.shto(tekst(libri.titulli, { madhesia: 22, trashe: true, rreshtim: "qender" }))
        p.shto(tekst(libri.autori, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
        p.shto(ne_mes(chip_disponueshmerie(libri)))

        const faktet = kontejner("horizontal")
        faktet.vendos_hapesira(10)
        faktet.shto(kuti_fakti("▤", libri.kategoria, "Kategoria"), 1)
        faktet.shto(kuti_fakti(IKONA.afati, libri.viti, "Viti"), 1)
        faktet.shto(kuti_fakti(IKONA.liber, libri.faqe, "Faqe"), 1)
        p.shto(faktet)

        
        if (huazimi_im) {
            const k = karte_ime("vertikal")
            k.vendos_hapesira(8)
            const koka = kontejner("horizontal")
            koka.shto(tekst("Huazimi im", { madhesia: 16, trashe: true }), 1)
            koka.shto(chip_huazimi(huazimi_im))
            k.shto(koka)
            k.shto(rresht_info("⇥", "Marre me", formato_daten(huazimi_im.data_marrjes)))
            k.shto(rresht_info("📅", "Afati", formato_daten(huazimi_im.afati)))
            p.shto(k)
            p.shto(buton_dytesor("Shiko te gjitha afatet", () => navigimi.shko("afatet")))
        }

        p.shto(seksion("Pershkrimi"))
        p.shto(tekst(libri.pershkrimi))

        const te_dhenat = karte_ime("vertikal")
        te_dhenat.shto(rresht_info(IKONA.qr, "Kodi i librit", libri.id))
        te_dhenat.shto(rresht_info("⌖", "Vendndodhja", libri.vendndodhja))
        p.shto(te_dhenat)
        p.shto_shtrirje()
    }

    return { widget: faqja.widget, hap }
}

module.exports = { krijo }

},
"nxenes/afatet.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { rgba } = perfshi("../stili.es")
const { nxenesi_aktual, huazimet_aktive_te } = perfshi("../te_dhenat.es")
const { formato_daten } = perfshi("../ndihmes.es")
const { tekst, karte_ime, kopertina, chip_huazimi, ngjyra_e_gjendjes, ekran_i_bosh, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("Afati i kthimit", () => navigimi.kthehu())

    
    const karte_afati = (huazimi) => {
        const ngjyra = ngjyra_e_gjendjes(huazimi.gjendja())
        
        const gjithsej = huazimi.ditet_gjithsej() <= 0 ? 1 : huazimi.ditet_gjithsej()
        const kaluar = Math.min(gjithsej, Math.max(0, gjithsej - huazimi.ditet_e_mbetura()))

        const k = karte_ime("vertikal", { onKlik: () => navigimi.shko("detaje_libri", huazimi.libri) })
        k.vendos_hapesira(10)

        const koka = kontejner("horizontal")
        koka.vendos_hapesira(12)
        koka.shto(kopertina(huazimi.libri, 44))
        const kolona = kontejner("vertikal")
        kolona.vendos_hapesira(2)
        kolona.shto(tekst(huazimi.libri.titulli, { madhesia: 15, trashe: true }))
        kolona.shto(tekst("Afati: " + formato_daten(huazimi.afati), { ngjyra: NGJYRAT.tekst_i_zbehte }))
        koka.shto(kolona, 1)
        koka.shto(chip_huazimi(huazimi))
        k.shto(koka)

        const shiriti = progres(0, 100)
        shiriti.vendos_vlere(Math.round(kaluar / gjithsej * 100))
        shiriti.vendos_format("")          
        shiriti.vendos_madhesi_maksimale(16777215, 8)
        shiriti.vendos_stil(`
            QProgressBar { background-color: ${rgba(ngjyra, 30)}; border: none; border-radius: 4px; }
            QProgressBar::chunk { background-color: ${ngjyra}; border-radius: 4px; }
        `)
        k.shto(shiriti)
        k.shto(tekst(huazimi.etiketa_e_afatit(), { trashe: true, ngjyra: ngjyra }))
        return k
    }

    
    function hap() {
        const p = faqja.permbajtja
        p.pastro()
        const huazimet = huazimet_aktive_te(nxenesi_aktual)
        if (huazimet.length === 0) {
            p.shto(ekran_i_bosh(IKONA.afati, "Nuk ke libra per t'u kthyer."))
        } else {
            p.shto(tekst("Do te marresh njoftim para çdo afati. Kthe librat ne kohe!", { ngjyra: NGJYRAT.tekst_i_zbehte }))
            for (const h of huazimet) { p.shto(karte_afati(h)) }
        }
        p.shto_shtrirje()
    }

    return { widget: faqja.widget, hap }
}

module.exports = { krijo }

},
"admin/login.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT } = perfshi("../stili.es")
const { roli_i_adminit } = perfshi("../te_dhenat.es")
const { tekst, buton_primar, buton_tekst, ne_mes, logo, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("", () => navigimi.kthehu())
    const p = faqja.permbajtja

    p.shto(ne_mes(logo(72, false)))
    p.shto(tekst("Paneli i bibliotekes", { madhesia: 24, trashe: true, rreshtim: "qender" }))
    p.shto(tekst(`Hyr si ${roli_i_adminit.toLowerCase()} per te menaxhuar huazimet.`, { ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_hapesire(10)

    p.shto(fushe_teksti("Email ose emri i perdoruesit"))

    
    const fusha_fjalekalimi = fushe_fjalekalimi("Fjalekalimi")
    let e_fshehur = true
    const syri = buton_tekst("👁", () => {
        e_fshehur = !e_fshehur
        fusha_fjalekalimi.shfaq_fjalekalimin(!e_fshehur)
    })
    const rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(6)
    rreshti.shto(fusha_fjalekalimi, 1)
    rreshti.shto(syri)
    p.shto(rreshti)

    const harrova = kontejner("horizontal")
    harrova.shto_shtrirje()
    harrova.shto(buton_tekst("Harrove fjalekalimin?", () => shfaq_mesazh("Demo", "Rivendosja e fjalekalimit - funksion i ardhshem.")))
    p.shto(harrova)

    
    p.shto(buton_primar("Hyr", () => navigimi.shko_dhe_fshi("admin_shell")))
    p.shto(tekst("Demo: nuk kerkohet asnje e dhene reale. Shtyp butonin per te vazhduar.", { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte, rreshtim: "qender" }))
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/shell.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT } = perfshi("../stili.es")
const { kuti_stilizuar } = perfshi("../komponente.es")
const dashboard = perfshi("./dashboard.es")
const skano = perfshi("./skano.es")
const librat = perfshi("./librat.es")
const nxenesit = perfshi("./nxenesit.es")
const cilesime = perfshi("./cilesime.es")

function krijo() {
    const rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(0)

    
    const faqet = ekrane()
    const hapSkeden = (i) => ndrysho(i)
    faqet.shto_ekran(dashboard.krijo(hapSkeden).widget)
    faqet.shto_ekran(skano.krijo().widget)
    faqet.shto_ekran(librat.krijo().widget)
    faqet.shto_ekran(nxenesit.krijo().widget)
    faqet.shto_ekran(cilesime.krijo().widget)
    rrenja.shto(faqet, 1)

    
    const shiriti = kuti_stilizuar("horizontal", `background-color: white; border-top: 1px solid ${NGJYRAT.kufiri};`, [8, 6, 8, 6])
    shiriti.vendos_hapesira(4)
    const etiketat = [
        { ikona: "▦", emri: "Kreu" },
        { ikona: "⌖", emri: "Skano" },
        { ikona: "📚", emri: "Librat" },
        { ikona: "👥", emri: "Nxenesit" },
        { ikona: "⚙", emri: "Cilesime" }
    ]
    const butonat = etiketat.map((e, i) => {
        const b = buton_i_ri(`${e.ikona}\n${e.emri}`)
        b.vendos_kursor_dore()
        b.kur_klikohet(() => ndrysho(i))
        shiriti.shto(b, 1)
        return b
    })
    rrenja.shto(shiriti)

    
    function ndrysho(i) {
        faqet.shfaq_ekranin(i)
        butonat.forEach((b, j) => {
            const aktiv = i === j
            b.vendos_stil(`
                QPushButton { background-color: ${aktiv ? "rgba(47,75,140,30)" : "transparent"}; border: none; border-radius: 14px;
                              color: ${aktiv ? NGJYRAT.primare : NGJYRAT.tekst_i_zbehte}; font-size: 12px; font-weight: ${aktiv ? "bold" : "normal"}; padding: 6px 4px; }
            `)
        })
    }
    ndrysho(0)

    
    return { widget: rrenja, hap: () => ndrysho(0) }
}

module.exports = { krijo }

},
"admin/dashboard.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const {
    librat, nxenesit, emri_i_adminit, roli_i_adminit, huazimet_me_vonese, numri_i_librave_te_huazuar, njoftimet_e_adminit
} = perfshi("../te_dhenat.es")
const { tekst, karte_ime, karte_statistike, karte_huazimi, seksion, buton_primar, buton_dytesor, buton_tekst, faqe_pa_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")


function krijo(onHapSkeden) {
    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    const vonesat = huazimet_me_vonese()
    const te_palexuara = njoftimet_e_adminit.filter((n) => !n.i_lexuar).length

    
    const koka = kontejner("horizontal")
    const titujt = kontejner("vertikal")
    titujt.vendos_hapesira(0)
    titujt.shto(tekst(`${roli_i_adminit} · ${emri_i_adminit}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
    titujt.shto(tekst("Paneli kryesor", { madhesia: 24, trashe: true }))
    koka.shto(titujt, 1)
    koka.shto(buton_tekst(IKONA.njoftime + (te_palexuara > 0 ? ` ${te_palexuara}` : ""), () => navigimi.shko("admin_njoftime"), NGJYRAT.tekst))
    p.shto(koka)

    
    const skano = karte_ime("horizontal", { ngjyra: NGJYRAT.primare, margina: 16, onKlik: () => onHapSkeden(1) })
    skano.vendos_hapesira(14)
    skano.shto(tekst("⌖", { madhesia: 34, ngjyra: "white", mbulo: false }))
    const skano_teksti = kontejner("vertikal")
    skano_teksti.vendos_hapesira(2)
    skano_teksti.shto(tekst("Skano QR", { madhesia: 18, trashe: true, ngjyra: "white" }))
    skano_teksti.shto(tekst("Nxenesi → Libri → Huazimi regjistrohet", { ngjyra: "rgba(255,255,255,190)" }))
    skano.shto(skano_teksti, 1)
    skano.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: "white", mbulo: false }))
    p.shto(skano)

    
    const rreshti1 = kontejner("horizontal")
    rreshti1.vendos_hapesira(10)
    rreshti1.shto(karte_statistike("📚", librat.length, "Libra gjithsej", NGJYRAT.primare, () => onHapSkeden(2)), 1)
    rreshti1.shto(karte_statistike("⇄", numri_i_librave_te_huazuar(), "Te huazuar", NGJYRAT.paralajmerim, () => onHapSkeden(2)), 1)
    p.shto(rreshti1)
    const rreshti2 = kontejner("horizontal")
    rreshti2.vendos_hapesira(10)
    rreshti2.shto(karte_statistike("👥", nxenesit.length, "Nxenes", NGJYRAT.sukses, () => onHapSkeden(3)), 1)
    rreshti2.shto(karte_statistike(IKONA.paralajmerim, vonesat.length, "Me vonese", NGJYRAT.rrezik), 1)
    p.shto(rreshti2)

    
    const veprimet = kontejner("horizontal")
    veprimet.vendos_hapesira(10)
    veprimet.shto(buton_primar("+  Huazim", () => navigimi.shko("admin_huazim", { eshte_huazim: true })), 1)
    veprimet.shto(buton_dytesor("↩  Kthim", () => navigimi.shko("admin_huazim", { eshte_huazim: false })), 1)
    p.shto(veprimet)

    
    p.shto(seksion("Libra me vonese", "Nxenesit", () => onHapSkeden(3)))
    if (vonesat.length === 0) {
        p.shto(tekst("Asnje vonese. Shkelqyeshem!", { ngjyra: NGJYRAT.tekst_i_zbehte }))
    } else {
        for (const h of vonesat) {
            
            p.shto(karte_huazimi(h, { tregoNxenesin: true, onKlik: () => navigimi.shko("admin_nxenesi", h.nxenesi) }))
        }
    }
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/skano.es": function (module, exports, perfshi, __dirname, __filename) { 





const { NGJYRAT } = perfshi("../stili.es")
const { nxenesit, librat } = perfshi("../te_dhenat.es")
const { tekst, karte_ime, avatar, kopertina, buton_primar, buton_dytesor, kuti_stilizuar, ne_mes, faqe_pa_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    let nxenesi = null        
    let libri = null

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    p.shto(tekst("Skano QR", { madhesia: 26, trashe: true }))
    const udhezimi = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte })
    p.shto(udhezimi)

    
    const kamera = kuti_stilizuar("vertikal", `background-color: ${NGJYRAT.primare_erret}; border-radius: 20px;`, 14)
    kamera.vendos_madhesi(0, 260)
    kamera.shto_shtrirje()
    const shenjestra = kuti_stilizuar("vertikal", `background: transparent; border: 3px solid ${NGJYRAT.theksi}; border-radius: 18px;`)
    shenjestra.vendos_madhesi_fikse(170, 170)
    shenjestra.shto(tekst("▦", { madhesia: 80, ngjyra: "rgba(255,255,255,70)", rreshtim: "qender" }), 1)
    kamera.shto(ne_mes(shenjestra))
    kamera.shto_shtrirje()
    kamera.shto(tekst("Pamje kamere (demo - pa skanim real)", { madhesia: 12, ngjyra: "rgba(255,255,255,170)", rreshtim: "qender" }))
    p.shto(kamera)

    
    const rezultatet = kontejner("vertikal")
    rezultatet.vendos_hapesira(10)
    p.shto(rezultatet)

    const butonat = kontejner("vertikal")
    butonat.vendos_hapesira(10)
    p.shto(butonat)
    p.shto_shtrirje()

    
    function rifresko() {
        
        const hapi = nxenesi === null ? 1 : (libri === null ? 2 : 3)
        udhezimi.vendos_tekst(
            hapi === 1 ? "Hapi 1: skano QR-ne e nxenesit" :
            hapi === 2 ? "Hapi 2: skano QR-ne e librit" : "Gati! Vazhdo me regjistrimin."
        )

        rezultatet.pastro()
        if (nxenesi !== null) {
            const k = karte_ime("horizontal", { margina: 12, onKlik: () => navigimi.shko("admin_nxenesi", nxenesi) })
            k.vendos_hapesira(12)
            k.shto(avatar(nxenesi, 48))
            const kolona = kontejner("vertikal")
            kolona.vendos_hapesira(2)
            kolona.shto(tekst(nxenesi.emri_i_plote, { madhesia: 16, trashe: true }))
            kolona.shto(tekst(`${nxenesi.id} · ${nxenesi.klasa_emri}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
            k.shto(kolona, 1)
            k.shto(tekst("✔", { madhesia: 20, ngjyra: NGJYRAT.sukses, mbulo: false }))
            rezultatet.shto(k)
        }
        if (libri !== null) {
            const k = karte_ime("horizontal", { margina: 12, onKlik: () => navigimi.shko("admin_libri", libri) })
            k.vendos_hapesira(12)
            k.shto(kopertina(libri, 40))
            const kolona = kontejner("vertikal")
            kolona.vendos_hapesira(2)
            kolona.shto(tekst(libri.titulli, { madhesia: 16, trashe: true }))
            kolona.shto(tekst(`${libri.id} · ${libri.autori}`, { ngjyra: NGJYRAT.tekst_i_zbehte }))
            k.shto(kolona, 1)
            k.shto(tekst("✔", { madhesia: 20, ngjyra: NGJYRAT.sukses, mbulo: false }))
            rezultatet.shto(k)
        }

        butonat.pastro()
        if (hapi === 1) {
            butonat.shto(buton_primar("Simulo: skano QR te nxenesit", () => { nxenesi = nxenesit[2]; rifresko() }))   
        }
        if (hapi === 2) {
            butonat.shto(buton_primar("Simulo: skano QR te librit", () => { libri = librat.find((l) => l.i_lire); rifresko() }))
        }
        if (hapi === 3) {
            butonat.shto(buton_primar("Vazhdo te huazimi", () => navigimi.shko("admin_huazim", { nxenesi, libri, eshte_huazim: true })))
        }
        if (hapi > 1) {
            butonat.shto(buton_dytesor("↻  Fillo nga e para", () => { nxenesi = null; libri = null; rifresko() }))
        }
    }
    rifresko()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/librat.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT } = perfshi("../stili.es")
const { librat } = perfshi("../te_dhenat.es")
const { tekst, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
const { karte_libri, ndrues } = perfshi("./komponente_admin.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    let kerkimi = ""
    let filtri = 0          

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    p.shto(tekst("Librat", { madhesia: 26, trashe: true }))

    const fusha = fushe_teksti("Kerko titull, autor ose kod...")
    fusha.kur_ndryshon((vlera) => { kerkimi = vlera.toLowerCase(); rifresko() })
    p.shto(fusha)

    p.shto(ndrues(["Te gjithe", "Te lire", "Te huazuar"], 0, (i) => { filtri = i; rifresko() }).widget)

    const lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    function rifresko() {
        const te_gjetur = librat.filter((l) => {
            const pershtat_tekstin = l.titulli.toLowerCase().includes(kerkimi) ||
                l.autori.toLowerCase().includes(kerkimi) || l.id.toLowerCase().includes(kerkimi)
            const pershtat_filtrin = filtri === 0 || (filtri === 1 && l.i_lire) || (filtri === 2 && !l.i_lire)
            return pershtat_tekstin && pershtat_filtrin
        })
        lista.pastro()
        if (te_gjetur.length === 0) {
            lista.shto(ekran_i_bosh("⌕", "Nuk u gjet asnje liber."))
        } else {
            for (const l of te_gjetur) {
                lista.shto(karte_libri(l, () => navigimi.shko("admin_libri", l)))
            }
        }
    }
    rifresko()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/komponente_admin.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { huazimet_aktive_te } = perfshi("../te_dhenat.es")
const { GJENDJA } = perfshi("../modelet.es")
const { tekst, karte_ime, avatar, kopertina, chip, chip_disponueshmerie } = perfshi("../komponente.es")


function karte_nxenesi(nxenesi, onKlik) {
    const aktive = huazimet_aktive_te(nxenesi)
    const ka_vonese = aktive.some((h) => h.gjendja() === GJENDJA.ME_VONESE)

    const k = karte_ime("horizontal", { margina: 12, onKlik })
    k.vendos_hapesira(14)
    k.shto(avatar(nxenesi, 48))

    const kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(nxenesi.emri_i_plote, { madhesia: 15, trashe: true }))
    kolona.shto(tekst(`Klasa ${nxenesi.klasa_emri} · ${nxenesi.id}`, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    k.shto(kolona, 1)

    if (ka_vonese) {
        k.shto(chip("Vonese", NGJYRAT.rrezik))
    } else if (aktive.length > 0) {
        k.shto(chip(`${aktive.length} libra`, NGJYRAT.primare))
    }
    k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false }))
    return k
}


function karte_libri(libri, onKlik) {
    const k = karte_ime("horizontal", { margina: 12, onKlik })
    k.vendos_hapesira(14)
    k.shto(kopertina(libri, 46))

    const kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(libri.titulli, { madhesia: 15, trashe: true }))
    kolona.shto(tekst(libri.autori, { madhesia: 13, ngjyra: NGJYRAT.tekst_i_zbehte }))
    kolona.shto_hapesire(4)
    const rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(8)
    rreshti.shto(chip_disponueshmerie(libri))
    rreshti.shto(tekst(`${libri.kategoria} · ${libri.id}`, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }), 1)
    kolona.shto(rreshti)
    k.shto(kolona, 1)

    k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false }))
    return k
}




function ndrues(etiketat, indeksi_fillestar, onNdrysho) {
    let aktual = indeksi_fillestar
    const rreshti = kontejner("horizontal")
    rreshti.vendos_hapesira(0)
    const butonat = etiketat.map((etiketa, i) => {
        const b = buton_i_ri(etiketa)
        b.vendos_kursor_dore()
        b.kur_klikohet(() => { vendos(i); onNdrysho(i) })
        rreshti.shto(b, 1)
        return b
    })

    function vendos(i) {
        aktual = i
        butonat.forEach((b, j) => {
            const aktiv = j === i
            const e_para = j === 0
            const e_fundit = j === butonat.length - 1
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
    return { widget: rreshti, vendos, indeksi: () => aktual }
}

module.exports = { karte_nxenesi, karte_libri, ndrues }

},
"admin/nxenesit.es": function (module, exports, perfshi, __dirname, __filename) { 

const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { nxenesit } = perfshi("../te_dhenat.es")
const { tekst, ekran_i_bosh, faqe_pa_titull } = perfshi("../komponente.es")
const { karte_nxenesi } = perfshi("./komponente_admin.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    let kerkimi = ""

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    p.shto(tekst("Nxenesit", { madhesia: 26, trashe: true }))

    const fusha = fushe_teksti("Kerko nxenes...")
    fusha.kur_ndryshon((vlera) => { kerkimi = vlera.toLowerCase(); rifresko() })
    p.shto(fusha)

    const lista = kontejner("vertikal")
    lista.vendos_hapesira(10)
    p.shto(lista)
    p.shto_shtrirje()

    
    function rifresko() {
        const te_gjetur = nxenesit.filter((n) =>
            n.emri_i_plote.toLowerCase().includes(kerkimi) ||
            n.klasa_emri.toLowerCase().includes(kerkimi) ||
            n.id.toLowerCase().includes(kerkimi)
        )
        lista.pastro()
        if (te_gjetur.length === 0) {
            lista.shto(ekran_i_bosh("⌕", "Nuk u gjet asnje nxenes."))
        } else {
            for (const n of te_gjetur) {
                lista.shto(karte_nxenesi(n, () => navigimi.shko("admin_nxenesi", n)))
            }
        }
    }
    rifresko()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/cilesime.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { emri_i_adminit, roli_i_adminit } = perfshi("../te_dhenat.es")
const { tekst, karte_ime, buton_tekst, buton_dytesor, faqe_pa_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")


function titulli_i_grupit(teksti) {
    return tekst(teksti, { madhesia: 13, trashe: true, ngjyra: NGJYRAT.tekst_i_zbehte })
}


function celesi(etiketa, i_ndezur) {
    const c = kuti_zgjedhjeje(etiketa)
    c.vendos_zgjedhur(i_ndezur)
    c.vendos_stil("QCheckBox { font-size: 14px; spacing: 10px; padding: 6px 0; }")
    return c
}

function krijo() {
    let ditet = 14

    const faqja = faqe_pa_titull()
    const p = faqja.permbajtja
    p.shto(tekst("Cilesime", { madhesia: 26, trashe: true }))

    
    const profili = karte_ime("horizontal")
    profili.vendos_hapesira(14)
    const rrethi = tekst("👤", { madhesia: 22, rreshtim: "qender", mbulo: false })
    rrethi.vendos_stil(`background-color: ${NGJYRAT.primare}; color: white; border-radius: 26px; font-size: 22px;`)
    rrethi.vendos_madhesi_fikse(52, 52)
    profili.shto(rrethi)
    const emri = kontejner("vertikal")
    emri.vendos_hapesira(2)
    emri.shto(tekst(emri_i_adminit, { madhesia: 17, trashe: true }))
    emri.shto(tekst(roli_i_adminit, { ngjyra: NGJYRAT.tekst_i_zbehte }))
    profili.shto(emri, 1)
    p.shto(profili)

    
    p.shto(titulli_i_grupit("Njoftime"))
    const njoftimet = karte_ime("vertikal", { margina: [14, 6, 14, 6] })
    njoftimet.shto(celesi("Rikujtime automatike per afatet", true))
    njoftimet.shto(celesi("Alarm per libra me vonese", true))
    njoftimet.shto(celesi("Permbledhje javore me email", false))
    p.shto(njoftimet)

    
    p.shto(titulli_i_grupit("Huazimi"))
    const huazimi = karte_ime("horizontal", { margina: 12 })
    huazimi.vendos_hapesira(8)
    const pakso = buton_tekst("−", () => { ditet -= 7; rifresko() }, NGJYRAT.primare)
    const shto_dite = buton_tekst("+", () => { ditet += 7; rifresko() }, NGJYRAT.primare)
    pakso.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.primare}; font-size: 26px; padding: 0 8px; } QPushButton:disabled { color: #B8C0D6; }`)
    shto_dite.vendos_stil(`QPushButton { background: transparent; border: none; color: ${NGJYRAT.primare}; font-size: 26px; padding: 0 8px; } QPushButton:disabled { color: #B8C0D6; }`)
    const vlera = tekst("", { trashe: true, mbulo: false })
    huazimi.shto(tekst("Kohezgjatja standarde", { trashe: true }), 1)
    huazimi.shto(pakso)
    huazimi.shto(vlera)
    huazimi.shto(shto_dite)
    p.shto(huazimi)
    function rifresko() {
        vlera.vendos_tekst(`${ditet} dite`)
        pakso.aktivizo(ditet > 7)
        shto_dite.aktivizo(ditet < 28)
    }
    rifresko()

    
    p.shto(titulli_i_grupit("Te tjera"))
    const rresht = (ikona, etiketa, nenetitulli, onKlik) => {
        const k = karte_ime("horizontal", { margina: [16, 14, 16, 14], onKlik })
        k.vendos_hapesira(14)
        k.shto(tekst(ikona, { madhesia: 18, ngjyra: NGJYRAT.primare, mbulo: false }))
        const kolona = kontejner("vertikal")
        kolona.vendos_hapesira(2)
        kolona.shto(tekst(etiketa, { trashe: true }))
        if (nenetitulli) { kolona.shto(tekst(nenetitulli, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte })) }
        k.shto(kolona, 1)
        if (onKlik) { k.shto(tekst(IKONA.shigjeta, { madhesia: 22, ngjyra: NGJYRAT.tekst_i_zbehte, mbulo: false })) }
        return k
    }
    p.shto(rresht(IKONA.qr, "Printo QR-te e librave", null, () => shfaq_mesazh("Demo", "Printimi i QR-ve - funksion i ardhshem.")))
    p.shto(rresht(IKONA.info, "Rreth aplikacionit", "Versioni demo 0.1 · vetem ndërfaqe", null))

    p.shto(buton_dytesor(IKONA.dil + "  Dil", () => navigimi.shko_dhe_fshi("welcome"), NGJYRAT.rrezik))
    p.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

},
"admin/detaje_nxenesi.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { huazimet_aktive_te, huazimet_e_kthyera_te } = perfshi("../te_dhenat.es")
const { tekst, karte_ime, avatar, qr, rresht_info, seksion, ekran_i_bosh, karte_huazimi, buton_primar, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("Detajet e nxenesit", () => navigimi.kthehu())

    
    function hap(nxenesi) {
        const p = faqja.permbajtja
        p.pastro()
        const aktive = huazimet_aktive_te(nxenesi)
        const historiku = huazimet_e_kthyera_te(nxenesi)

        
        const koka = kontejner("horizontal")
        koka.vendos_hapesira(14)
        koka.shto(avatar(nxenesi, 64))
        const emri = kontejner("vertikal")
        emri.vendos_hapesira(2)
        emri.shto(tekst(nxenesi.emri_i_plote, { madhesia: 20, trashe: true }))
        emri.shto(tekst("Klasa " + nxenesi.klasa_emri, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        koka.shto(emri, 1)
        koka.shto(qr(nxenesi.id, 64))
        p.shto(koka)

        const info = karte_ime("vertikal")
        info.shto(rresht_info(IKONA.id, "ID", nxenesi.id))
        info.shto(rresht_info(IKONA.emaili, "Email", nxenesi.emaili))
        info.shto(rresht_info(IKONA.telefoni, "Telefon", nxenesi.telefoni))
        p.shto(info)

        p.shto(buton_primar("+  Huazim i ri per kete nxenes", () => navigimi.shko("admin_huazim", { nxenesi, eshte_huazim: true })))

        p.shto(seksion(`Librat e marre (${aktive.length})`))
        if (aktive.length === 0) {
            p.shto(ekran_i_bosh(IKONA.liber, "Nuk ka libra aktive."))
        } else {
            for (const h of aktive) {
                p.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("admin_libri", h.libri) }))
            }
        }

        if (historiku.length > 0) {
            p.shto(seksion(`Historiku (${historiku.length})`))
            for (const h of historiku) {
                p.shto(karte_huazimi(h, { onKlik: () => navigimi.shko("admin_libri", h.libri) }))
            }
        }
        p.shto_shtrirje()
    }

    return { widget: faqja.widget, hap }
}

module.exports = { krijo }

},
"admin/detaje_libri.es": function (module, exports, perfshi, __dirname, __filename) { 


const { NGJYRAT, IKONA } = perfshi("../stili.es")
const { huazimi_aktiv_i_librit } = perfshi("../te_dhenat.es")
const { formato_daten } = perfshi("../ndihmes.es")
const {
    tekst, karte_ime, kopertina, qr, chip_disponueshmerie, chip_huazimi, kuti_fakti, rresht_info, seksion, buton_primar, majtas, faqe_me_titull
} = perfshi("../komponente.es")
const { karte_nxenesi } = perfshi("./komponente_admin.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("Detajet e librit", () => navigimi.kthehu())

    function hap(libri) {
        const p = faqja.permbajtja
        p.pastro()
        const huazimi = huazimi_aktiv_i_librit(libri)      

        
        const koka = kontejner("horizontal")
        koka.vendos_hapesira(16)
        koka.shto(kopertina(libri, 100))
        const kolona = kontejner("vertikal")
        kolona.vendos_hapesira(4)
        kolona.shto(tekst(libri.titulli, { madhesia: 20, trashe: true }))
        kolona.shto(tekst(libri.autori, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        kolona.shto_hapesire(6)
        kolona.shto(majtas(chip_disponueshmerie(libri)))
        kolona.shto_shtrirje()
        koka.shto(kolona, 1)
        p.shto(koka)

        const faktet = kontejner("horizontal")
        faktet.vendos_hapesira(10)
        faktet.shto(kuti_fakti("▤", libri.kategoria, "Kategoria"), 1)
        faktet.shto(kuti_fakti(IKONA.afati, libri.viti, "Viti"), 1)
        faktet.shto(kuti_fakti(IKONA.liber, libri.faqe, "Faqe"), 1)
        p.shto(faktet)

        
        const karta_qr = karte_ime("horizontal")
        karta_qr.vendos_hapesira(16)
        karta_qr.shto(qr(libri.id, 96))
        const te_dhenat = kontejner("vertikal")
        te_dhenat.vendos_hapesira(4)
        te_dhenat.shto(tekst("QR e librit", { trashe: true }))
        te_dhenat.shto(tekst(libri.id, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        te_dhenat.shto(tekst(libri.vendndodhja, { ngjyra: NGJYRAT.tekst_i_zbehte }))
        te_dhenat.shto_shtrirje()
        karta_qr.shto(te_dhenat, 1)
        p.shto(karta_qr)

        p.shto(seksion("Pershkrimi"))
        p.shto(tekst(libri.pershkrimi))

        
        if (huazimi) {
            p.shto(seksion("Huazuar nga"))
            p.shto(karte_nxenesi(huazimi.nxenesi, () => navigimi.shko("admin_nxenesi", huazimi.nxenesi)))
            const k = karte_ime("vertikal")
            k.shto(rresht_info("⇥", "Marre me", formato_daten(huazimi.data_marrjes)))
            k.shto(rresht_info("📅", "Afati", formato_daten(huazimi.afati)))
            k.shto(majtas(chip_huazimi(huazimi)))
            p.shto(k)
        }

        
        p.shto(buton_primar(
            libri.i_lire ? "+  Huazo kete liber" : "↩  Regjistro kthimin",
            () => navigimi.shko("admin_huazim", {
                libri,
                nxenesi: huazimi ? huazimi.nxenesi : null,
                eshte_huazim: libri.i_lire
            })
        ))
        p.shto_shtrirje()
    }

    return { widget: faqja.widget, hap }
}

module.exports = { krijo }

},
"admin/huazim_kthim.es": function (module, exports, perfshi, __dirname, __filename) { 




const { NGJYRAT } = perfshi("../stili.es")
const { nxenesit, librat } = perfshi("../te_dhenat.es")
const { formato_daten } = perfshi("../ndihmes.es")
const { tekst, karte_ime, rresht_info, buton_primar, faqe_me_titull } = perfshi("../komponente.es")
const { ndrues } = perfshi("./komponente_admin.es")
const navigimi = perfshi("../navigimi.es")


const DITET_E_HUAZIMIT = 14




function zgjedhes_i_renditur(titulli, tekst_udhezues, merr_opsionet, onZgjidh) {
    let opsionet_aktuale = []
    let i_hapur = false

    const rrenja = kontejner("vertikal")
    rrenja.vendos_hapesira(6)

    const karta = karte_ime("horizontal", { onKlik: () => ndrysho() })
    karta.vendos_hapesira(14)
    karta.shto(tekst("⇅", { madhesia: 20, ngjyra: NGJYRAT.primare, mbulo: false }))
    const kolona = kontejner("vertikal")
    kolona.vendos_hapesira(2)
    kolona.shto(tekst(titulli, { madhesia: 12, ngjyra: NGJYRAT.tekst_i_zbehte }))
    const vlera = tekst(tekst_udhezues, { madhesia: 16, trashe: true, ngjyra: NGJYRAT.tekst_i_zbehte })
    const detaji = tekst("", { ngjyra: NGJYRAT.tekst_i_zbehte })
    kolona.shto(vlera)
    kolona.shto(detaji)
    karta.shto(kolona, 1)
    rrenja.shto(karta)

    const lista = liste([])
    lista.vendos_madhesi(0, 190)
    lista.fshih()
    rrenja.shto(lista)
    lista.kur_zgjidhet((indeksi) => {
        const zgjedhja = opsionet_aktuale[indeksi]
        if (zgjedhja) {
            mbyll()
            onZgjidh(zgjedhja.objekti)
        }
    })

    function hap_listen() {
        opsionet_aktuale = merr_opsionet()
        lista.pastro()
        lista.shto_elemente(opsionet_aktuale.map((o) => o.etiketa))
        lista.shfaq_elementin()
        i_hapur = true
    }
    function mbyll() { lista.fshih(); i_hapur = false }
    function ndrysho() { if (i_hapur) { mbyll() } else { hap_listen() } }

    
    function vendos(teksti, detaj) {
        vlera.vendos_tekst(teksti || tekst_udhezues)
        vlera.vendos_stil(`font-size: 16px; font-weight: bold; background: transparent; color: ${teksti ? NGJYRAT.tekst : NGJYRAT.tekst_i_zbehte};`)
        detaji.vendos_tekst(detaj || "")
    }
    return { widget: rrenja, vendos, mbyll }
}

function krijo() {
    let nxenesi = null
    let libri = null
    let eshte_huazim = true

    const faqja = faqe_me_titull("Huazim / Kthim", () => navigimi.kthehu())
    const p = faqja.permbajtja

    const menyra = ndrues(["Huazim", "Kthim"], 0, (i) => {
        eshte_huazim = i === 0
        
        if (libri !== null && libri.i_lire !== eshte_huazim) { libri = null }
        rifresko()
    })
    p.shto(menyra.widget)

    const zgjedhesi_nxenesit = zgjedhes_i_renditur(
        "Nxenesi", "Skano QR ose zgjidh nxenesin",
        () => nxenesit.map((n) => ({ etiketa: `${n.emri_i_plote} (${n.klasa_emri})`, objekti: n })),
        (n) => { nxenesi = n; rifresko() }
    )
    p.shto(zgjedhesi_nxenesit.widget)

    const zgjedhesi_librit = zgjedhes_i_renditur(
        "Libri", "Skano QR ose zgjidh librin",
        
        () => librat.filter((l) => l.i_lire === eshte_huazim).map((l) => ({ etiketa: `${l.titulli} (${l.id})`, objekti: l })),
        (l) => { libri = l; rifresko() }
    )
    p.shto(zgjedhesi_librit.widget)

    
    const karta_datave = karte_ime("vertikal")
    const rreshti_dates = kontejner("vertikal")
    karta_datave.shto(rreshti_dates)
    p.shto(karta_datave)

    const konfirmo = buton_primar("", () => {
        if (!nxenesi || !libri) { return }
        const mesazhi = eshte_huazim
            ? `"${libri.titulli}" u huazua te ${nxenesi.emri_i_pare()} (demo - nuk u ruajt).`
            : `"${libri.titulli}" u regjistrua si i kthyer (demo - nuk u ruajt).`
        shfaq_mesazh("Demo", mesazhi)
        navigimi.kthehu()
    })
    p.shto(konfirmo)
    p.shto_shtrirje()

    
    function rifresko() {
        menyra.vendos(eshte_huazim ? 0 : 1)
        zgjedhesi_nxenesit.vendos(nxenesi ? nxenesi.emri_i_plote : null, nxenesi ? `${nxenesi.klasa_emri} · ${nxenesi.id}` : null)
        zgjedhesi_librit.vendos(libri ? libri.titulli : null, libri ? `${libri.id} · ${libri.autori}` : null)

        rreshti_dates.pastro()
        rreshti_dates.shto(rresht_info("📅", "Data e huazimit", formato_daten(new Date())))
        rreshti_dates.shto(rresht_info("⏰", `Afati (${DITET_E_HUAZIMIT} dite)`, formato_daten(new Date(Date.now() + DITET_E_HUAZIMIT * 86400000))))
        if (eshte_huazim) { karta_datave.shfaq_elementin() } else { karta_datave.fshih() }

        konfirmo.vendos_tekst(eshte_huazim ? "Konfirmo huazimin" : "Konfirmo kthimin")
        
        konfirmo.aktivizo(nxenesi !== null && libri !== null)
    }

    
    function hap(arg) {
        nxenesi = (arg && arg.nxenesi) || null
        libri = (arg && arg.libri) || null
        eshte_huazim = arg && arg.eshte_huazim !== undefined ? arg.eshte_huazim : true
        zgjedhesi_nxenesit.mbyll()
        zgjedhesi_librit.mbyll()
        rifresko()
    }
    rifresko()
    return { widget: faqja.widget, hap }
}

module.exports = { krijo }

},
"admin/njoftime.es": function (module, exports, perfshi, __dirname, __filename) { 

const { njoftimet_e_adminit } = perfshi("../te_dhenat.es")
const { pamja_e_njoftimeve, faqe_me_titull } = perfshi("../komponente.es")
const navigimi = perfshi("../navigimi.es")

function krijo() {
    const faqja = faqe_me_titull("Njoftime", () => navigimi.kthehu())
    faqja.permbajtja.shto(pamja_e_njoftimeve(njoftimet_e_adminit))
    faqja.permbajtja.shto_shtrirje()
    return { widget: faqja.widget }
}

module.exports = { krijo }

}
};
const __cache = {};
function __dir(n) { const i = n.lastIndexOf('/'); return i < 0 ? '' : n.slice(0, i); }
function __normalizo(n) {
  const r = [];
  for (const p of n.split('/')) { if (p === '' || p === '.') continue; if (p === '..') r.pop(); else r.push(p); }
  return r.join('/');
}
function __ngarko(n) {
  if (__cache[n]) return __cache[n].exports;
  if (!__modulet[n]) throw new Error("perfshi: moduli '" + n + "' nuk u gjet ne pakete.");
  const m = { exports: {} };
  __cache[n] = m;
  __modulet[n].call(m.exports, m, m.exports, __perfshiPer(n), __dir(n), n);
  return m.exports;
}
function __perfshiPer(prej) {
  return function (rruga) {
    if (rruga[0] !== '.') throw new Error("perfshi('" + rruga + "'): modulet Node nuk mbeshteten ne Android.");
    let n = __normalizo(__dir(prej) + '/' + rruga);
    if (!/\.[A-Za-z0-9]+$/.test(n)) n += '.es';
    return __ngarko(n);
  };
}
__ngarko("kryesor.es");
})();

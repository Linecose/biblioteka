# qr_png.es - QR "placeholder": modeli dekorativ i njejte me versionin Flutter (25x25 katrore,
# tre kendet e medha). NUK eshte kod QR real dhe nuk skanohet. Kthen nje imazh PNG ne memorie.
#
# PA varesi nga Node: perdor vetem Uint8Array dhe 'zlib' me blloqe te pangjeshura (stored),
# ndaj funksionon njesoj ne desktop (Node) dhe ne Android (QuickJS).
#
# Per QR real ne versionin final: zevendeso kete me nje biblioteke QR ne JS te pastert.

konstante { NGJYRAT } = perfshi("./stili.es")

konstante KATRORE = 25

# Tabela CRC32 qe kerkon formati PNG
konstante TABELA_CRC = (() => {
    konstante t = []
    per (leje n = 0; n < 256; n++) {
        leje c = n
        per (leje k = 0; k < 8; k++) { c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1) }
        t.push(c >>> 0)
    }
    kthe t
})()

funksion crc32(buffer) {
    leje c = 0xFFFFFFFF
    per (leje i = 0; i < buffer.length; i++) { c = TABELA_CRC[(c ^ buffer[i]) & 0xFF] ^ (c >>> 8) }
    kthe (c ^ 0xFFFFFFFF) >>> 0
}

# --- Ndihmese per bajte (Uint8Array) ---
funksion bajte_ascii(tekst_ascii) {
    konstante dalja = i_ri Uint8Array(tekst_ascii.length)
    per (leje i = 0; i < tekst_ascii.length; i++) { dalja[i] = tekst_ascii.charCodeAt(i) }
    kthe dalja
}

funksion ngjit_bajte(lista) {
    leje gjatesia_totale = 0
    per (konstante pjesa te lista) { gjatesia_totale += pjesa.length }
    konstante dalja = i_ri Uint8Array(gjatesia_totale)
    leje pozicioni = 0
    per (konstante pjesa te lista) { dalja.set(pjesa, pozicioni); pozicioni += pjesa.length }
    kthe dalja
}

funksion shkruaj_u32_be(vargu, pozicioni, vlera) {
    vargu[pozicioni] = (vlera >>> 24) & 0xFF
    vargu[pozicioni + 1] = (vlera >>> 16) & 0xFF
    vargu[pozicioni + 2] = (vlera >>> 8) & 0xFF
    vargu[pozicioni + 3] = vlera & 0xFF
}

funksion adler32(bajtet) {
    leje a = 1
    leje b = 0
    per (leje i = 0; i < bajtet.length; i++) {
        a = (a + bajtet[i]) % 65521
        b = (b + a) % 65521
    }
    kthe ((b << 16) | a) >>> 0
}

# Rrjedhe zlib me blloqe "stored" (pa ngjeshje): 0x78 0x01 + blloqe <= 65535 bajte + Adler-32.
funksion zlib_pa_ngjeshje(bajtet) {
    konstante MAKS = 65535
    konstante numri_blloqeve = Math.max(1, Math.ceil(bajtet.length / MAKS))
    konstante dalja = i_ri Uint8Array(2 + bajtet.length + numri_blloqeve * 5 + 4)
    dalja[0] = 0x78
    dalja[1] = 0x01
    leje poz = 2
    per (leje blloku = 0; blloku < numri_blloqeve; blloku++) {
        konstante fillimi = blloku * MAKS
        konstante gjatesia = Math.min(MAKS, bajtet.length - fillimi)
        dalja[poz++] = (blloku === numri_blloqeve - 1) ? 1 : 0
        dalja[poz++] = gjatesia & 0xFF
        dalja[poz++] = (gjatesia >>> 8) & 0xFF
        dalja[poz++] = (~gjatesia) & 0xFF
        dalja[poz++] = ((~gjatesia) >>> 8) & 0xFF
        dalja.set(bajtet.subarray(fillimi, fillimi + gjatesia), poz)
        poz += gjatesia
    }
    shkruaj_u32_be(dalja, poz, adler32(bajtet))
    kthe dalja
}

funksion pjese_png(lloji, te_dhenat) {
    konstante lloji_bajte = bajte_ascii(lloji)
    konstante gjatesia = i_ri Uint8Array(4)
    shkruaj_u32_be(gjatesia, 0, te_dhenat.length)
    konstante pjesa_crc = i_ri Uint8Array(4)
    shkruaj_u32_be(pjesa_crc, 0, crc32(ngjit_bajte([lloji_bajte, te_dhenat])))
    kthe ngjit_bajte([gjatesia, lloji_bajte, te_dhenat, pjesa_crc])
}

funksion kendi(r, k) {
    kthe (r < 7 && k < 7) || (r < 7 && k >= KATRORE - 7) || (r >= KATRORE - 7 && k < 7)
}

# Matrica e katrorëve: true = e erret. Modeli varet vetem nga teksti (gjithmone i njejti).
funksion ndertoMatricen(te_dhenat) {
    leje fara = 7
    per (konstante ch te te_dhenat) { fara = (fara * 31 + ch.charCodeAt(0)) % 16777216 }

    konstante m = []
    per (leje r = 0; r < KATRORE; r++) {
        konstante rreshti = []
        per (leje k = 0; k < KATRORE; k++) {
            leje e_erret = gabim_val
            nese (!kendi(r, k)) {
                fara = (fara * 1664525 + 1013904223) % 4294967296
                e_erret = Math.floor(fara / 65536) % 2 === 1
            }
            rreshti.push(e_erret)
        }
        m.push(rreshti)
    }

    # Tre kendet e medha (7x7 e erret, 5x5 e bardhe, 3x3 e erret)
    konstante kend = (r0, k0) => {
        per (leje r = 0; r < 7; r++) {
            per (leje k = 0; k < 7; k++) {
                konstante skaj = r === 0 || r === 6 || k === 0 || k === 6
                konstante qender = r >= 2 && r <= 4 && k >= 2 && k <= 4
                m[r0 + r][k0 + k] = skaj || qender
            }
        }
    }
    kend(0, 0)
    kend(0, KATRORE - 7)
    kend(KATRORE - 7, 0)
    kthe m
}

# Kthe { buffer, madhesia }: PNG me madhesi afersisht `madhesia_e_deshiruar` px (shumefish i 25).
funksion krijo_qr_png(te_dhenat, madhesia_e_deshiruar) {
    konstante skala = Math.max(1, Math.floor(madhesia_e_deshiruar / KATRORE))
    konstante madhesia = KATRORE * skala
    konstante matrica = ndertoMatricen(te_dhenat)

    konstante e_erret = [0x1F, 0x24, 0x37]   # NGJYRAT.tekst
    konstante rreshti_bajte = 1 + madhesia * 3
    konstante raw = i_ri Uint8Array(rreshti_bajte * madhesia).fill(0xFF)   # bardhe
    per (leje y = 0; y < madhesia; y++) {
        konstante baza = y * rreshti_bajte
        raw[baza] = 0                                  # filtri "None"
        konstante r = Math.floor(y / skala)
        per (leje x = 0; x < madhesia; x++) {
            nese (matrica[r][Math.floor(x / skala)]) {
                konstante p = baza + 1 + x * 3
                raw[p] = e_erret[0]; raw[p + 1] = e_erret[1]; raw[p + 2] = e_erret[2]
            }
        }
    }

    konstante ihdr = i_ri Uint8Array(13)
    shkruaj_u32_be(ihdr, 0, madhesia)
    shkruaj_u32_be(ihdr, 4, madhesia)
    ihdr[8] = 8     # thellesia e bitit
    ihdr[9] = 2     # RGB
    konstante buffer = ngjit_bajte([
        i_ri Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
        pjese_png("IHDR", ihdr),
        pjese_png("IDAT", zlib_pa_ngjeshje(raw)),
        pjese_png("IEND", i_ri Uint8Array(0))
    ])
    kthe { buffer, madhesia }
}

module.exports = { krijo_qr_png }

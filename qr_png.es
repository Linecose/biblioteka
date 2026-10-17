# qr_png.es - QR "placeholder": modeli dekorativ i njejte me versionin Flutter (25x25 katrore,
# tre kendet e medha). NUK eshte kod QR real dhe nuk skanohet. Kthen nje imazh PNG ne memorie
# (pa asnje paketë te jashtme: vetem 'zlib' i Node).
#
# Per QR real ne versionin final: zevendeso kete me paketen npm "qrcode" (QRCode.toBuffer).

konstante zlib = perfshi("zlib")
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

funksion pjese_png(lloji, te_dhenat) {
    konstante gjatesia = Buffer.alloc(4)
    gjatesia.writeUInt32BE(te_dhenat.length, 0)
    konstante pjesa_crc = Buffer.alloc(4)
    pjesa_crc.writeUInt32BE(crc32(Buffer.concat([Buffer.from(lloji, "ascii"), te_dhenat])), 0)
    kthe Buffer.concat([gjatesia, Buffer.from(lloji, "ascii"), te_dhenat, pjesa_crc])
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
    konstante raw = Buffer.alloc(rreshti_bajte * madhesia, 0xFF)   # bardhe
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

    konstante ihdr = Buffer.alloc(13)
    ihdr.writeUInt32BE(madhesia, 0)
    ihdr.writeUInt32BE(madhesia, 4)
    ihdr[8] = 8     # thellesia e bitit
    ihdr[9] = 2     # RGB
    konstante buffer = Buffer.concat([
        Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
        pjese_png("IHDR", ihdr),
        pjese_png("IDAT", zlib.deflateSync(raw)),
        pjese_png("IEND", Buffer.alloc(0))
    ])
    kthe { buffer, madhesia }
}

module.exports = { krijo_qr_png }

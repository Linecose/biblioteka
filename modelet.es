# modelet.es - modelet e te dhenave (porti i dosjes models/)
# Jane thjesht "kuti" qe mbajne te dhenat e nje nxenesi, libri, huazimi, njoftimi.

konstante { formato_daten, ditet_midis } = perfshi("./ndihmes.es")

klase Nxenesi {
    konstruktor(id, emri_i_plote, klasa_emri, emaili, telefoni) {
        kete.id = id                          # ID e nxenesit = permbajtja e QR-se personale
        kete.emri_i_plote = emri_i_plote
        kete.klasa_emri = klasa_emri          # p.sh. "10-B"
        kete.emaili = emaili
        kete.telefoni = telefoni
    }
    emri_i_pare() { kthe kete.emri_i_plote.split(" ")[0] }
    # "Era Hoxha" -> "EH"
    inicialet() {
        konstante pjeset = kete.emri_i_plote.trim().split(" ")
        nese (pjeset.length === 1) { kthe pjeset[0][0].toUpperCase() }
        kthe (pjeset[0][0] + pjeset[pjeset.length - 1][0]).toUpperCase()
    }
}

klase Libri {
    konstruktor(id, titulli, autori, kategoria, viti, faqe, vendndodhja, pershkrimi, ngjyra_e_kopertines, i_lire) {
        kete.id = id                          # ID/QR unik i librit (p.sh. "LB-0001")
        kete.titulli = titulli
        kete.autori = autori
        kete.kategoria = kategoria
        kete.viti = viti
        kete.faqe = faqe
        kete.vendndodhja = vendndodhja        # ku ndodhet ne raft
        kete.pershkrimi = pershkrimi
        kete.ngjyra_e_kopertines = ngjyra_e_kopertines   # "#RRGGBB"
        kete.i_lire = i_lire                  # vertete = mund te huazohet
    }
}

# Gjendjet e nje huazimi
konstante GJENDJA = { NE_KOHE: "ne_kohe", AFAT_AFER: "afat_afer", ME_VONESE: "me_vonese", KTHYER: "kthyer" }

klase Huazimi {
    konstruktor(libri, nxenesi, data_marrjes, afati, data_kthimit = asnje) {
        kete.libri = libri
        kete.nxenesi = nxenesi
        kete.data_marrjes = data_marrjes
        kete.afati = afati
        kete.data_kthimit = data_kthimit      # asnje = ende s'eshte kthyer
    }
    eshte_kthyer() { kthe kete.data_kthimit !== asnje }
    # Sa dite mbeten deri ne afat (negative nese ka vonese)
    ditet_e_mbetura() { kthe ditet_midis(i_ri Date(), kete.afati) }
    ditet_gjithsej() { kthe ditet_midis(kete.data_marrjes, kete.afati) }
    gjendja() {
        nese (kete.eshte_kthyer()) { kthe GJENDJA.KTHYER }
        nese (kete.ditet_e_mbetura() < 0) { kthe GJENDJA.ME_VONESE }
        nese (kete.ditet_e_mbetura() <= 3) { kthe GJENDJA.AFAT_AFER }
        kthe GJENDJA.NE_KOHE
    }
    # Tekst i shkurter per afatin, p.sh. "Edhe 4 dite"
    etiketa_e_afatit() {
        nese (kete.eshte_kthyer()) { kthe "Kthyer me " + formato_daten(kete.data_kthimit) }
        konstante d = kete.ditet_e_mbetura()
        nese (d < 0) { kthe "Vonuar " + (-d) + " dite" }
        nese (d === 0) { kthe "Afati eshte sot" }
        nese (d === 1) { kthe "Edhe 1 dite" }
        kthe "Edhe " + d + " dite"
    }
}

konstante LLOJET_NJOFTIMIT = { KUJTESE: "kujtese", VONESE: "vonese", MARRJE: "marrje", KTHIM: "kthim", INFO: "info" }

klase Njoftimi {
    konstruktor(titulli, mesazhi, koha, lloji, i_lexuar = gabim_val) {
        kete.titulli = titulli
        kete.mesazhi = mesazhi
        kete.koha = koha                      # tekst i gatshem, p.sh. "2 ore me pare"
        kete.lloji = lloji
        kete.i_lexuar = i_lexuar
    }
}

module.exports = { Nxenesi, Libri, Huazimi, Njoftimi, GJENDJA, LLOJET_NJOFTIMIT }

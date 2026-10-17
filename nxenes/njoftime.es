# njoftime.es - skeda "Njoftime" e nxenesit. Lista vete eshte komponent i perbashket
# (pamja_e_njoftimeve) qe do ta perdore edhe Admin App.

konstante { njoftimet_e_nxenesit } = perfshi("../te_dhenat.es")
konstante { pamja_e_njoftimeve, faqe_me_titull } = perfshi("../komponente.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Njoftime")
    faqja.permbajtja.shto(pamja_e_njoftimeve(njoftimet_e_nxenesit))
    faqja.permbajtja.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

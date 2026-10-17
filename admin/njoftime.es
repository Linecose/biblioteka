# njoftime.es (admin) - njoftimet e administratorit; hapen nga zilja ne Dashboard

konstante { njoftimet_e_adminit } = perfshi("../te_dhenat.es")
konstante { pamja_e_njoftimeve, faqe_me_titull } = perfshi("../komponente.es")
konstante navigimi = perfshi("../navigimi.es")

funksion krijo() {
    konstante faqja = faqe_me_titull("Njoftime", () => navigimi.kthehu())
    faqja.permbajtja.shto(pamja_e_njoftimeve(njoftimet_e_adminit))
    faqja.permbajtja.shto_shtrirje()
    kthe { widget: faqja.widget }
}

module.exports = { krijo }

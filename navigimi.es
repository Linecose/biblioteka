# navigimi.es - navigimi mes ekraneve (zevendeson Navigator.pushNamed / pop te Flutter)
#
# Cdo ekran eshte nje modul qe kthen { widget, hap(arg) }:
#   - widget: elementi qe shfaqet
#   - hap(arg): (opsionale) therritet para se ekrani te shfaqet, per te marre te dhena
#               (p.sh. detajet e librit marrin librin si argument)
# Perdorimi:
#   navigimi.shko("detaje_libri", libri)   # hap ekranin sipër te aktualit
#   navigimi.kthehu()                      # kthehu mbrapa
#   navigimi.shko_dhe_fshi("shell")        # hap ekran dhe fshi historikun (pas hyrjes)

konstante ekranet = ekrane()     # pirgu i ekraneve (QStackedWidget)
konstante regjistri = {}         # emri -> ekrani
konstante indekset = {}          # emri -> pozicioni ne pirg

funksion regjistro(emri, ekrani) {
    regjistri[emri] = ekrani
    indekset[emri] = ekranet.shto_ekran(ekrani.widget)
}

funksion shko(emri, arg) {
    konstante ekrani = regjistri[emri]
    nese (!ekrani) { hedh i_ri Error("Ekrani nuk ekziston: " + emri) }
    nese (ekrani.hap) { ekrani.hap(arg) }
    ekranet.shfaq_ekranin(indekset[emri])
}

funksion kthehu() { ekranet.kthehu() }

funksion shko_dhe_fshi(emri, arg) {
    shko(emri, arg)
    ekranet.pastro_historine()
}

module.exports = { ekranet, regjistro, shko, kthehu, shko_dhe_fshi }

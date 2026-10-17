# kryesor.es - pika e hyrjes e aplikacionit (porti i main.dart + app/routes.dart)
# Ekzekutohet me:   eagle biblioteka/kryesor.es
#
# Tabela e ekraneve: emri i rruges -> modul qe e krijon ekranin (si Routes.table ne Flutter).

konstante { STILI_GLOBAL } = perfshi("./stili.es")
konstante navigimi = perfshi("./navigimi.es")

konstante welcome = perfshi("./perbashket/welcome.es")
konstante auth = perfshi("./nxenes/auth.es")
konstante shell = perfshi("./nxenes/shell.es")
konstante karta = perfshi("./nxenes/karta.es")
konstante qr_im = perfshi("./nxenes/qr_im.es")
konstante detaje_libri = perfshi("./nxenes/detaje_libri.es")
konstante afatet = perfshi("./nxenes/afatet.es")

konstante admin_login = perfshi("./admin/login.es")
konstante admin_shell = perfshi("./admin/shell.es")
konstante admin_nxenesi = perfshi("./admin/detaje_nxenesi.es")
konstante admin_libri = perfshi("./admin/detaje_libri.es")
konstante admin_huazim = perfshi("./admin/huazim_kthim.es")
konstante admin_njoftime = perfshi("./admin/njoftime.es")

# Rendi ketu eshte rendi i pirgut: ekrani i pare (welcome) shfaqet kur hapet aplikacioni.
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

# Dritarja kryesore: permasa telefoni, qe Student App te duket si ne aplikacion mobil
konstante dritarja = krijo_dritare("Biblioteka Digjitale", 420, 800)
dritarja.vendos_stil(STILI_GLOBAL)
dritarja.vendos_madhesi(420, 800)
dritarja.vendos_permbajtjen(navigimi.ekranet)
dritarja.shfaqe()

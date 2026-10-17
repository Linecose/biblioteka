# te_dhenat.es - te gjitha te dhenat e "false" (mock) te demos ne nje vend
# (porti i data/mock_data.dart). Asnje nuk vjen nga database.
# Datat llogariten nga SOT, keshtu demoja duket gjithmone e saktë.

konstante { Nxenesi, Libri, Huazimi, Njoftimi, GJENDJA, LLOJET_NJOFTIMIT } = perfshi("./modelet.es")

# Data e kaluar / e ardhshme: dite_para(5) = 5 dite me pare; dite_pas(5) = pas 5 diteve
konstante dite_para = (n) => i_ri Date(Date.now() - n * 86400000)
konstante dite_pas = (n) => i_ri Date(Date.now() + n * 86400000)

konstante nxenesit = [
    i_ri Nxenesi("STU-2026-0147", "Era Hoxha", "10-B", "era.hoxha@shkolla.demo", "+355 69 123 4567"),
    i_ri Nxenesi("STU-2026-0112", "Arben Krasniqi", "9-A", "arben.krasniqi@shkolla.demo", "+355 68 222 3344"),
    i_ri Nxenesi("STU-2026-0203", "Dritan Leka", "11-C", "dritan.leka@shkolla.demo", "+355 67 555 1020"),
    i_ri Nxenesi("STU-2026-0158", "Ana Shehu", "10-A", "ana.shehu@shkolla.demo", "+355 69 777 8899"),
    i_ri Nxenesi("STU-2026-0231", "Blerta Gjoka", "12-B", "blerta.gjoka@shkolla.demo", "+355 68 410 2030"),
    i_ri Nxenesi("STU-2026-0095", "Klea Marku", "9-C", "klea.marku@shkolla.demo", "+355 69 300 4050"),
    i_ri Nxenesi("STU-2026-0276", "Gent Dervishi", "11-A", "gent.dervishi@shkolla.demo", "+355 67 811 9090"),
    i_ri Nxenesi("STU-2026-0184", "Elira Basha", "10-C", "elira.basha@shkolla.demo", "+355 68 650 7788")
]

# Nxenesi qe eshte "i kyçur" ne Student App
konstante nxenesi_aktual = nxenesit[0]

konstante emri_i_adminit = "Znj. Mirela"
konstante roli_i_adminit = "Bibliotekare"

konstante librat = [
    i_ri Libri("LB-0001", "Kronike ne gur", "Ismail Kadare", "Roman", 1971, 304, "Rafti A2",
        "Nje qytet guri para syve te nje femije gjate Luftes se Dyte Boterore. Nje roman i njohur i letersise shqipe.", "#7A5C45", gabim_val),
    i_ri Libri("LB-0002", "Princi i vogel", "Antoine de Saint-Exupery", "Roman", 1943, 96, "Rafti B1",
        "Nje perrallë poetike per miqesine, dashurine dhe per gjerat qe shihen vetem me zemer.", "#2E7D9A", gabim_val),
    i_ri Libri("LB-0003", "Gjenerali i ushtrise se vdekur", "Ismail Kadare", "Roman", 1963, 330, "Rafti A2",
        "Nje gjeneral italian kthehet ne Shqiperi per te gjetur eshtrat e ushtareve te rene gjate luftes.", "#55606E", gabim_val),
    i_ri Libri("LB-0004", "Vargjet e lira", "Millosh Gjergj Nikolla (Migjeni)", "Poezi", 1936, 120, "Rafti C3",
        "Permbledhje poetike me tone sociale dhe moderne, nje nga veprat themelore te poezise shqipe.", "#8B3A3A", vertete),
    i_ri Libri("LB-0005", "Lahuta e Malcis", "Gjergj Fishta", "Poezi", 1937, 480, "Rafti C3",
        "Eposi kombetar shqiptar, qe rrefen luftërat e maleve per mbrojtjen e vendit.", "#5C6B3A", vertete),
    i_ri Libri("LB-0006", "1984", "George Orwell", "Roman", 1949, 328, "Rafti B2",
        "Nje bote e kontrolluar nga \"Vellai i Madh\", ku edhe mendimet jane nen vezhgim.", "#3B3B4F", gabim_val),
    i_ri Libri("LB-0007", "Romeo dhe Zhuljeta", "William Shakespeare", "Drame", 1597, 224, "Rafti D1",
        "Tragjedia e dy te rinjve nga familje ne armiqesi, nje nga historite me te njohura te dashurise.", "#B2486B", vertete),
    i_ri Libri("LB-0008", "Harry Potter dhe Guri Filozofal", "J. K. Rowling", "Fantazi", 1997, 309, "Rafti B3",
        "Nje djale zbulon se eshte magjistar dhe fillon shkollen e magjise Hogwarts.", "#6A4C93", gabim_val),
    i_ri Libri("LB-0009", "Historia e Shqiperise", "Autore te ndryshem", "Histori", 2002, 410, "Rafti E1",
        "Nje permbledhje e historise se shqiptareve nga lashtesia deri ne ditet tona.", "#C0392B", vertete),
    i_ri Libri("LB-0010", "Hyrje ne Algjebër", "Autore te ndryshem", "Shkence", 2018, 256, "Rafti F2",
        "Tekst ndihmes per nxenesit e gjimnazit: ekuacione, funksione dhe ushtrime te zgjidhura.", "#2F4B8C", vertete),
    i_ri Libri("LB-0011", "Don Kishoti", "Miguel de Cervantes", "Roman", 1605, 520, "Rafti B4",
        "Aventurat e nje zoterie qe lexon shume romane kalorësish dhe vendos te behet vete kalores.", "#B7791F", vertete),
    i_ri Libri("LB-0012", "Atlasi Gjeografik", "Autore te ndryshem", "Gjeografi", 2015, 180, "Rafti F4",
        "Harta te vendeve dhe kontinenteve per mesimin e gjeografise.", "#1F8A70", vertete)
]

# Gjen nje liber me ID (p.sh. "LB-0001")
funksion libri_me_id(id) { kthe librat.find((l) => l.id === id) }

# Te gjitha huazimet (aktive dhe te kthyera)
konstante huazimet = [
    # --- Era Hoxha (nxenesi i Student App) ---
    i_ri Huazimi(libri_me_id("LB-0001"), nxenesit[0], dite_para(21), dite_para(7)),     # vonuar 7 dite
    i_ri Huazimi(libri_me_id("LB-0002"), nxenesit[0], dite_para(11), dite_pas(3)),      # afati afer
    i_ri Huazimi(libri_me_id("LB-0006"), nxenesit[0], dite_para(3), dite_pas(11)),      # brenda afatit
    i_ri Huazimi(libri_me_id("LB-0009"), nxenesit[0], dite_para(40), dite_para(26), dite_para(28)),   # e kthyer
    i_ri Huazimi(libri_me_id("LB-0004"), nxenesit[0], dite_para(60), dite_para(46), dite_para(47)),   # e kthyer
    # --- Nxenes te tjere ---
    i_ri Huazimi(libri_me_id("LB-0003"), nxenesit[1], dite_para(10), dite_pas(4)),
    i_ri Huazimi(libri_me_id("LB-0008"), nxenesit[2], dite_para(16), dite_para(2))      # vonuar 2 dite
]

# Huazimet aktive te nje nxenesi, me afatin me te afert ne krye
funksion huazimet_aktive_te(nxenesi) {
    kthe huazimet
        .filter((h) => h.nxenesi.id === nxenesi.id && !h.eshte_kthyer())
        .sort((a, b) => a.afati - b.afati)
}

# Huazimet e kthyera te nje nxenesi (historiku)
funksion huazimet_e_kthyera_te(nxenesi) {
    kthe huazimet.filter((h) => h.nxenesi.id === nxenesi.id && h.eshte_kthyer())
}

# ─── Funksione ndihmese per Admin App (filtrime te thjeshta mbi listat e mesiperme) ───

# Te gjitha huazimet aktive te bibliotekes (ende te pakthyera)
funksion huazimet_aktive() { kthe huazimet.filter((h) => !h.eshte_kthyer()) }

# Huazimet me vonese (per Dashboard)
funksion huazimet_me_vonese() { kthe huazimet_aktive().filter((h) => h.gjendja() === GJENDJA.ME_VONESE) }

# Huazimi aktiv i nje libri (asnje nese libri eshte i lire)
funksion huazimi_aktiv_i_librit(libri) {
    kthe huazimet.find((h) => h.libri.id === libri.id && !h.eshte_kthyer())
}

funksion numri_i_librave_te_huazuar() { kthe librat.filter((l) => !l.i_lire).length }

# Njoftimet e nxenesit
konstante njoftimet_e_nxenesit = [
    i_ri Njoftimi("Libri eshte me vonese", "\"Kronike ne gur\" duhej kthyer 7 dite me pare. Te lutemi kthejeni sa me shpejt.", "Sot, 08:30", LLOJET_NJOFTIMIT.VONESE),
    i_ri Njoftimi("Afati po afrohet", "\"Princi i vogel\" duhet kthyer pas 3 diteve.", "Sot, 08:00", LLOJET_NJOFTIMIT.KUJTESE),
    i_ri Njoftimi("Huazim i ri", "Ke marre \"1984\" nga biblioteka. Lexim te kendshem!", "3 dite me pare", LLOJET_NJOFTIMIT.MARRJE, vertete),
    i_ri Njoftimi("Libri u kthye", "\"Historia e Shqiperise\" u regjistrua si i kthyer. Faleminderit!", "4 jave me pare", LLOJET_NJOFTIMIT.KTHIM, vertete),
    i_ri Njoftimi("Orari i bibliotekes", "Biblioteka eshte e hapur cdo dite shkollore 08:00 - 15:00.", "1 muaj me pare", LLOJET_NJOFTIMIT.INFO, vertete)
]

# Njoftimet e administratorit (per Admin App ne fazen tjeter)
konstante njoftimet_e_adminit = [
    i_ri Njoftimi("2 libra me vonese", "Era Hoxha dhe Dritan Leka kane libra te pakthyer pas afatit.", "Sot, 08:30", LLOJET_NJOFTIMIT.VONESE),
    i_ri Njoftimi("Afate qe skadojne kete jave", "2 huazime kane afat brenda 4 diteve.", "Sot, 08:00", LLOJET_NJOFTIMIT.KUJTESE),
    i_ri Njoftimi("Nxenes i ri u regjistrua", "Elira Basha (10-C) u regjistrua nga shtepia.", "Dje, 17:20", LLOJET_NJOFTIMIT.INFO),
    i_ri Njoftimi("Huazim i regjistruar", "Arben Krasniqi mori \"Gjenerali i ushtrise se vdekur\".", "10 dite me pare", LLOJET_NJOFTIMIT.MARRJE, vertete),
    i_ri Njoftimi("Kthim i regjistruar", "Era Hoxha ktheu \"Historia e Shqiperise\".", "4 jave me pare", LLOJET_NJOFTIMIT.KTHIM, vertete)
]

module.exports = {
    nxenesit, nxenesi_aktual, emri_i_adminit, roli_i_adminit, librat, libri_me_id,
    huazimet, huazimet_aktive_te, huazimet_e_kthyera_te,
    huazimet_aktive, huazimet_me_vonese, huazimi_aktiv_i_librit, numri_i_librave_te_huazuar,
    njoftimet_e_nxenesit, njoftimet_e_adminit
}

import random
import time

# mängime_veebilehitsejas() on veebilehe versiooni testimiseks
def mängime_veebilehitsejas()->None:
    kuva_algseis()

    while True:
        täht:str = input('Sisesta täht: ').upper()
        if täht == "-":   # kui sisestatakse - siis tee reset
            reset_game()
        reageeri_sisendtähele(täht)

# {{{ Siia tulevad globaalsed muutujad, mida peavad nägema/käsitlema mänguga seotud funktsioonid
# kuva_algseis, reageeri_sisendtähele, reset_game,
# kuva_järjekordset_poomispilti, kuva_arvamismängu_sõna_uut_seisu.
sõnade_list: list[str] = [
    'APELSIN', 'MANDARIIN', 'KOOLIMAJA', 'PROTSESSOR', 'MAAILMARUUM', 'MATEMAATIKA', 'RAUDTEEJAAM', 
    'EHITUSOBJEKT', 'RÕÕMSAMEELNE', 'TÖÖARMASTUS', 'PROGRAMMEERIJA', 'KESKKONNAKAITSE', 'KAITSEVÄGI'] 
juhuslik_sõna_ideks:int = 0
valed_tähed:set = set()
tähtede_list: list[str] = []
mängijale_nähtav: list[str] = []
poomise_pilte = 13  # 13 viga tähendab kaotust
poomise_pildi_idex = 0
game_active = True
# }}}

# Algseis paika
def kuva_algseis()->None:
    global juhuslik_sõna_ideks
    global tähtede_list
    global mängijale_nähtav
    global valed_tähed
    global poomise_pildi_idex
    global game_active
    juhuslik_sõna_ideks = random.randint(0, len(sõnade_list)-1)
    tähtede_list = list(sõnade_list[juhuslik_sõna_ideks])
    mängijale_nähtav = ['-'] * len(tähtede_list) 
    valed_tähed.clear()
    poomise_pildi_idex = 0
    game_active = True
    kuva_järjekordset_poomispilti()
    kuva_arvamismängu_sõna_uut_seisu(mängijale_nähtav)
    

# Uue tähe sisestamise reageerimise loogika
def reageeri_sisendtähele(sisendtäht:str)->None: 
    global game_active
    global poomise_pildi_idex
    
    if not game_active:
        return
    
    oli_õige_täht = False
    for idx, täht in enumerate(tähtede_list):
        if sisendtäht == täht:
            mängijale_nähtav[idx] = sisendtäht
            oli_õige_täht = True
    if oli_õige_täht is True:
        kuva_arvamismängu_sõna_uut_seisu(mängijale_nähtav)
    else:
        valed_tähed.add(sisendtäht)
        if len(valed_tähed) < poomise_pilte:
            poomise_pildi_idex = len(valed_tähed)
            kuva_järjekordset_poomispilti()
        kuva_valesti_arvatud_tähtede_loendit(valed_tähed)

    if len(valed_tähed) >= poomise_pilte:
        game_active = False
        # 1. Näitame pilti poomine_12 2 sekundit
        poomise_pildi_idex = 12
        kuva_järjekordset_poomispilti()
        print("Oodatakse 2 sekundit...")
        time.sleep(2)
        # 2. Näitame pilti poomine_13
        poomise_pildi_idex = 13
        kuva_järjekordset_poomispilti()
        kuva_võit_või_kaotus("Kaotasid mängu")
    elif '-' not in mängijale_nähtav:
        kuva_võit_või_kaotus("Võitsid mängu")
        game_active = False
    
# Nupule "Uus mäng" reageerimise loogika
def reset_game()->None:
    print('Uus mäng')
    kuva_algseis()

def kuva_järjekordset_poomispilti()->None:
    # veebilehitsejas tuleb siia pildi vahetamise loogika
    # praegu kuvame print käsuga terminaliaknasse
    print(f'Jooksev poomise pilt on poomine_{poomise_pildi_idex}')

def kuva_arvamismängu_sõna_uut_seisu(mängijale_nähtav)->None:
    # veebilehitsejas tuleb siia äraarvatud tähega täiendatult arvatava sõna uus seis
    # praegu kuvame print käsuga terminaliaknasse
    print(' '.join(mängijale_nähtav))

def kuva_valesti_arvatud_tähtede_loendit(valed_tähed)->None:
    # veebilehitsejas tuleb siia valesti äraarvatud tähega täiendatult valesti pakutud tähtede uus seis
    # praegu kuvame print käsuga terminaliaknasse
    tähed_str = ", ".join(sorted(valed_tähed))
    print(f'Sisestatud täht ei olnud sõnas, {tähed_str}')

def kuva_võit_või_kaotus(teade:str)->None:
    print(teade)


if __name__ == "__main__": 
    #mängime_terminaliaknas()
    mängime_veebilehitsejas()
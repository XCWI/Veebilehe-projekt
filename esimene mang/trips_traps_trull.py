#!/usr/bin/python3
"""
# terminali aknas
# alustad sellest (tõmbad endale teiste muudatused)
$ git pull # tõmbab versioonihoidlast uusima versiooni

# lõpetad sellega (salvestad oma muutused versioonihoidlas)
$ git status # näitab milleiseid faile oled muutnud
$ git add UUDETUD-FAILI-NIMI
$ git commit -m "KOMMENTAAR MUUDATUSTE KOHTA"
$ git push # lisab versioonihoidlasse (internetis)
"""

import random
import sys
import copy
from typing import Any

"""
ANSI_RESET  = "\u001B[0m"
ANSI_BLACK  = "\u001B[30m"
ANSI_RED    = "\u001B[31m"
ANSI_GREEN  = "\u001B[32m"
ANSI_YELLOW = "\u001B[33m"
ANSI_BLUE   = "\u001B[34m"
ANSI_PURPLE = "\u001B[35m"
ANSI_CYAN   = "\u001B[36m"
ANSI_WHITE  = "\u001B[37m"
"""

Xvärv: str = "\u001b[35m"  # magenta
Ovärv: str = "\u001b[36m"  # cyan
muuvärv: str = "\u001b[32m"  # green

kolmikud: tuple = (
    # kõikvõimalikud read/veerud/diagonaalid, vastavad self.väljak indeksid.
    # read
    (1, 2, 3),  # 1. rida
    (4, 5, 6),  # 2. rida
    (7, 8, 9),  # 3. rida
    # veerud
    (1, 4, 7),  # 1. veerg
    (2, 5, 8),  # 2. veerg
    (3, 6, 9),  # 3. veerg
    # diagonaalid
    (1, 5, 9),  # \ diagonaal
    (3, 5, 7),  # / diagonaal
)


class TRIPSTRAPSTRULL:
    def __init__(self) -> None:
        self.Xmärk: str = "X"  # 1. mängija
        self.Omärk: str = "O"  # 2. mängija

        self.väljak: list[str] = []  # mänguväljak
        self.n: int = 0  # jooksva käigu number alustame 1st

        self.kes_mängib: str = (
            "  1. Inimene valib käigu\n  2. Arvuti käib juhuslikult\nValik? "
        )
        self.esimene_mängija: int = '0'  # valik stringist kes_mängib
        self.teine_mängija: int = '0'  # valik stringist kes_mängib

    def käi_lahtrisse(self, idx: int) -> bool:
        """Käigukorrale vastav märk indeksiga etteaantud kohta mänguväljakul

        idx (int): kuhu käime (self.väljak-u indeks)
        self.n (int): jooksva käigu nr, et leida kelle käik parajasti on

        Returns:
            bool: True: käik tehtud, False: seal oli kellegi märk juba ees
        """

        käija, _ = self.kes_mis_märgiga_mängib()
        self.väljak[idx] = käija


    def tee_juhuslik_käik(self) -> int:
        """Vali juhuslikult vabade lahtrite hulgast üks

        Returns:
            (int): Juhuslikult valitud vaba lahtri indeks (self.väljak-u indeks)
        """
        lahtrinr: int = self.kas_mina_saan_1_käiguga_võita()
        if lahtrinr >= 1:
            return lahtrinr

        lahtrinr = self.kas_vastane_saab_1_käiguga_võita()
        if lahtrinr >= 1:
            return lahtrinr

        vabad_lahtrid: list[int] = self.leia_kõik_vabad_lahtrid()
        juhuslik_indeks_vabade_hulgast: int = random.randrange(len(vabad_lahtrid))
        return vabad_lahtrid[juhuslik_indeks_vabade_hulgast]

    def küsi_käiku_inimeselt(self) -> int:
        """Küsime inimese käest kuhu käia

        Returns:
           int: lahtri idx (`self.väljak`-u indeks)
        """
        käija: str = (
            self.Omärk if self.n % 2 == 0 else self.Xmärk
        )  # paarisarvulised käigud teeb 'X', paaritud 'O'
        while True:
            print(f"Käib {käija}. Kuhu käid?")
            try:
                l = int(input())
                if self.kas_vaba(l) is True:
                    return l
                else:
                    print("Sinna ei saa käia.")
                    continue
            except:
                print("Sinna ei saa käia!")  # küsime uuesti
                
    def mängi(self) -> None:
        """Mängime, küsime/teeme käike, näitame mänguväljakut jne"""
        self.vali_mängijad()
        self.tee_tühi_väljak()
        self.näita_väljakut()
        while True:
            # Esimese mängija käigukord
            match self.esimene_mängija:
                case 1:  # Inimene valib käigu
                    idx = self.küsi_käiku_inimeselt()
                    pass
                case 2:  # Arvuti käib (pea-aegu) juhuslikult
                    idx = self.tee_juhuslik_käik()
                    print(f"Arvuti käib {self.väljak[idx]}")
                    pass
            self.käi_lahtrisse(idx)  # teeme käigu
            self.näita_väljakut()  # näitame väljakut
            if self.kas_keegi_võitis() == True:  # kui keegi võitis
                return  # Esimene mängija võitis
            # kui vabu käike pole -- len(leia_kõik_vabad_lahtrid())==0
            if len(self.leia_kõik_vabad_lahtrid()) == 0:
                print("Mäng jäi viiki")
                return
            self.n += 1  # järgmine käik
            # Esimese mängija käigukord läbi

            # Teise mängija käigukord
            match self.teine_mängija:
                case 1:  # Inimene valib käigu
                    idx = self.küsi_käiku_inimeselt()
                    pass
                case 2:  # Arvuti käib (pea-aegu) juhuslikult
                    idx = self.tee_juhuslik_käik()
                    print(f"Arvuti käib {self.väljak[idx]}")
                    pass
            self.käi_lahtrisse(idx)
            self.näita_väljakut()  # näita väljakut
            if self.kas_keegi_võitis() == True:  # kui keegi võitis
                return  # Teine mängija võitis
            self.n += 1  # järgmine käik
            # Teise mängija käigukord läbi

    def vali_mängijad(self) -> None:
        """Valime mängija (inimene, arvuti käib juhuslikult, arvuti käib plaanipäraselt)

        self.kes_mängib (str): Menüüstring võimalike mängijatega

        Returns:
            self.esimene_mängija (int): 1. mängija kood menüüstringist
            self.teine_mängija (int): 2. mängija kood menüüstringist
        """
        # Küsime kes mängib 1. mängija eest
        while True:
            sys.stdout.write(f"1. mängija?\n{self.kes_mängib}")
            try:
                self.esimene_mängija = int(input())
                if self.esimene_mängija not in range(1, 4):
                    raise Exception("Vigane valik\n")
                break  # 1. mängija valitud
            except:
                sys.stdout.write("Vigane valik\n")
                continue

        # Küsime kes mängib 2. mängija eest
        while True:
            sys.stdout.write(f"2. mängija?\n{self.kes_mängib}")
            try:
                self.teine_mängija = int(input())
                if self.teine_mängija not in range(1, 3):
                    raise Exception("Vigane valik\n")
                break  # 2. mängija valitud
            except:
                sys.stdout.write("Vigane valik\n")
                continue

    def tee_tühi_väljak(self) -> None:
        """Algväärtustame mänguväljaku self.väljak

        Massiivi elemendid 1-3 on 1. rida, 4-6 2. rida, 7-9 kolmas rida.
        Massivi elementi 0 ei kasuta.Valime
        """
        self.väljak = [
            "et indeksid klapiksid",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ]
        self.n = 1

    def näita_väljakut(self):
        """Kuvame mänguväljaku (self.väljak) ekraanile

        self.väljak (list[str]): mänguväljak
        muuvärv (str): vaikimisi mänguväljaku värv
        """
        """print(f"{muuvärv}{self.väljak[1]}|{self.väljak[2]}|{self.väljak[3]}")
        print("-+-+-")
        print(f"{self.väljak[4]}|{self.väljak[5]}|{self.väljak[6]}")
        print("-+-+-")
        print(f"{self.väljak[7]}|{self.väljak[8]}|{self.väljak[9]}")"""
        return self.väljak

    def kas_saab_1_käiguga_võita(self, märk) -> int:
        """Kontrolli kas `märk` saab 1 käiguga võita

        Returns:
            int: 0: ei saa 1 käiguga võita; 1-9: kui saab võita(`self.väljak[idx]`).
        """

        for k in kolmikud:
            lahter1, lahter2, lahter3 = k
            if (
                self.väljak[lahter1] == märk
                and self.väljak[lahter2] == märk
                and self.kas_vaba(lahter3) == True
            ):
                assert lahter3 == int(self.väljak[lahter3])
                return lahter3
            if (
                self.väljak[lahter3] == märk
                and self.väljak[lahter2] == märk
                and self.kas_vaba(lahter1) == True
            ):
                assert lahter1 == int(self.väljak[lahter1])
                return lahter1
            if (
                self.väljak[lahter1] == märk
                and self.väljak[lahter3] == märk
                and self.kas_vaba(lahter2) == True
            ):
                assert lahter2 == int(self.väljak[lahter2])
                return lahter2
        return 0

    def kas_mina_saan_1_käiguga_võita(self) -> int:
        """Kontrolli, kas jooksev mängija saab 1 käiguga võita

        Returns:
            int: 0: ma ei saa 1 käiguga võita; 1-9: ma saan võita(self.väljak[idx]).

        """
        minumärk, _ = self.kes_mis_märgiga_mängib()
        # print("db", self.n, minumärk, vastasemärk)
        return self.kas_saab_1_käiguga_võita(minumärk)

    def kas_vastane_saab_1_käiguga_võita(self) -> int:
        """Kontrolli, kas vastasmängija saab 1 käiguga võita

        Returns:
            int: 0: ma ei saa 1 käiguga võita; 1-9: ma saan võita(self.väljak[idx]).

        """
        _, vastasemärk = self.kes_mis_märgiga_mängib()
        return self.kas_saab_1_käiguga_võita(vastasemärk)

    def kes_mis_märgiga_mängib(self) -> tuple[str, str]:
        """Leia jooksva mängija ja vastese märgid

        Returns:
            str, str: jooksva mängija märk, vastase märk
        """
        if self.n % 2 == 0:
            return self.Omärk, self.Xmärk
        else:
            return self.Xmärk, self.Omärk

    def leia_kõik_vabad_lahtrid(self) -> list[int]:
        """Leia kõik vabad lahtrid mänguväljakul, kuhu saab veel käia (massiiv mille elmentideks on `self.väljak`-u indeksid).

        Returns:
            list[int]: Mänguväljaku kõigi vabade lahtrite loend (self.väljak'u indeksid).
        """
        vabad_lahtrid: list[int] = []
        for idx in range(1, 10):
            if self.kas_vaba(idx) == True:  # kontrolli kas on vaba
                vabad_lahtrid.append(idx)
        return vabad_lahtrid

    def kas_vaba(self, idx: int) -> bool:
        """Vaatab kas sinna saab käia

        Args:
            idx (int): Kontrollitava lahtri idx

        Returns:
            bool: True: Kui on vaba, False kui ei ole vaba.
        """

        """ versioon 1: Kas lahtris on X või O 
        if self.väljak[idx] != self.Xmärk and self.väljak[idx] != self.Omärk:
            return True
        else:
            return False
        """
        # versioon 4: vaatame lahtri sisu pikkust, X ja o on koos värvikoodiga, 1...9 ilma (pikkus==1)
        return (self.väljak[idx] != "X" and self.väljak[idx] != "O")

    def kas_keegi_võitis(self, kuva_võitjat: bool = True) -> bool:
        """Vaatame kas keegi sai kolm ritta, veergu või diagonaali.

        Kasutab: self.väljak, kolmikud.

        Args:
            kuva_võitjat (bool): True: kuvame võitja ekraanile, False: ei kuvata võitjat ekraanile.
        Returns:
            bool: True: Keegi võitis (vastav teade ekraanil), False: Keegi ei võitnud.
        """
        mängija_nr = 0
        for k in kolmikud:
            if self.väljak[k[0]] == self.väljak[k[1]] == self.väljak[k[2]]:
                mängija_nr = (
                    2 if self.n % 2 == 0 else 1
                )  # paarisarvulised käigud teeb 2. mämgija, paaritud 1. mängija
                return True, mängija_nr
        return False, mängija_nr


if __name__ == "__main__":    
    
    while True:
        ttt = TRIPSTRAPSTRULL()
        ttt.mängi()
        print("Kas tahad veel mängida(Jah/Ei)")
        valik = input()
        if valik[0] != "J" and valik[0] != "j":
            break

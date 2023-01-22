import { Dostava } from "./Dostava.js";
import {dcrtaj} from "./main_dostavljac.js"

import { funDostava, funOcena } from "./main_korisnik.js";

export class Dostavljac {
    constructor(id, prezime, ProsecnaOcena, BrOcena, Ime, Userime, jwt) {
        this.id = id;
        this.prezime = prezime;
        this.prosecnaOcena = ProsecnaOcena;
        this.brOcena = BrOcena;
        this.ime = Ime;
        this.userime = Userime;
        this.jwt = jwt;
    }

zahtevDostave(porizvodiNaziv, porizvodiID, Cena, ime_kor, id_kor){
        let divZahtev = document.createElement("div")
        divZahtev.id = "divZahtev"+this.id
        document.getElementById("divZahtevDostava"+this.id).appendChild(divZahtev)

        porizvodiNaziv.forEach(pro => {
            let divPro = document.createElement("div")
            divPro.id = "divPro"+this.id
            document.getElementById("divZahtev"+this.id).appendChild(divPro);

            let labPro = document.createElement("label")
            labPro.innerHTML = "Proizvod: " + pro
            divPro.appendChild(labPro);
        });
        let divKor = document.createElement("div")
        divKor.id = "divKor"+this.id
        document.getElementById("divZahtev"+this.id).appendChild(divKor);

        let labKor = document.createElement("label")
        labKor.innerHTML = "Ime korisnika: " + ime_kor
        divKor.appendChild(labKor);

        let divPrihvati = document.createElement("div")
        divPrihvati.id = "divPrihvati"+this.id
        document.getElementById("divZahtevDostava"+this.id).appendChild(divPrihvati);

        let buttonPrihvati = document.createElement("button")
        buttonPrihvati.id = "buttonPrihvati"+this.id
        buttonPrihvati.innerHTML = "Prihvati"
        divPrihvati.appendChild(buttonPrihvati);

        document.getElementById("buttonPrihvati"+this.id).addEventListener('click', (e) =>{
            e.preventDefault();
            document.getElementById("divZahtevDostava"+this.id).replaceChildren();

            //prvo fetch add dostava 
            let dostava = new Dostava();
            dostava.cena = Cena
            dostava.proizvodiID = porizvodiID;
            dostava.korisnikId = id_kor
            dostava.dostavljacId = this.id

            let myHeaders = new Headers({ 
                'Authorization': 'Bearer ' + this.jwt,
                'Content-Type': 'application/x-www-form-urlencoded'
              });
            fetch("https://localhost:7094/Dostava/AddDostava/"+dostava.cena+"/"+dostava.korisnikId+"/"+this.id,{
                method:"POST",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        dostava.id = data.id

                        let divDostava = document.createElement("div")
                        divDostava.id = "divDostava"+this.id
                        document.getElementById("divDostavaDostava"+this.id).appendChild(divDostava)
                
                        porizvodiNaziv.forEach(pro => {
                            let divPro = document.createElement("div")
                            divPro.id = "divPro"+this.id
                            document.getElementById("divDostava"+this.id).appendChild(divPro);
                
                            let labPro = document.createElement("label")
                            labPro.innerHTML = "Proizvod: " + pro
                            divPro.appendChild(labPro);
                        });

                        let divKor = document.createElement("div")
                        divKor.id = "divKor"+this.id
                        document.getElementById("divDostava"+this.id).appendChild(divKor);
                
                        let labKor = document.createElement("label")
                        labKor.innerHTML = "Ime korisnika: " + ime_kor
                        divKor.appendChild(labKor);
                        
                        let divCena = document.createElement("div")
                        divCena.id = "divCena"+this.id
                        document.getElementById("divDostava"+this.id).appendChild(divCena);
            
                        let labCena = document.createElement("label")
                        labCena.innerHTML = "Cena: " + Cena
                        divCena.appendChild(labCena);
            
                        let divPrihvati = document.createElement("div")
                        divPrihvati.id = "divPrihvati"+this.id
                        document.getElementById("divDostavaDostava"+this.id).appendChild(divPrihvati);
                
                        let buttonIsporuci = document.createElement("button")
                        buttonIsporuci.id = "buttonIsporuci"+this.id
                        buttonIsporuci.innerHTML = "Isporucena"
                        divPrihvati.appendChild(buttonIsporuci);
                        // nacraj dostavu kod korisnika
                        funDostava(porizvodiNaziv, Cena, this.ime);

                        document.getElementById("buttonIsporuci"+this.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            let myHeaders = new Headers({ 
                                'Authorization': 'Bearer ' + this.jwt,
                                'Content-Type': 'application/x-www-form-urlencoded'
                              });
                            fetch("https://localhost:7094/Dostavljac/DeleteDostava/"+this.id+"/"+dostava.id,{
                                method:"DELETE",
                                headers : myHeaders
                            }).then(s=>{
                                funOcena(this.id, this.ime);
                                document.getElementById("divDostavaDostava"+this.id).replaceChildren();
                            });
                        });
                    })

                   
                }
            })         
        });
    }
}
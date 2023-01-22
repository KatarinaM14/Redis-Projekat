import { Dostava } from "./Dostava.js";
import { Dostavljac} from "./Dostavljac.js";
import { Kategorija } from "./Kategorija.js";
import { Korisnik } from "./Korisnik.js";
import { Objekat } from "./Objekat.js";
import { Proizvod } from "./Proizvod.js";
import { Vlasnik } from "./Vlasnik.js";
import { Covek } from "./Covek.js";

export function dcrtaj(dost){
    let dostavljac = new Dostavljac(dost.id, dost.prezime, dost.prosecnaOcena, dost.brOcena, dost.ime, dost.userime, dost.jwt)
    document.getElementById("igi").style.display = "none"
    document.getElementById("buttonGetll").style.display = "none"

    let glavni = document.getElementById("glavni2")
    document.getElementById("glavni").style.display = "none"

    let dugmeUpdate = document.createElement("button")
    dugmeUpdate.id = "dugmepodaci2"
    dugmeUpdate.innerHTML = "Promeni podatke"
    glavni.appendChild(dugmeUpdate)

    let dugmeDelete = document.createElement("button")
    dugmeDelete.id = "dugmedelete2"
    dugmeDelete.innerHTML = "Obrisi nalog"
    glavni.appendChild(dugmeDelete)

    document.getElementById("dugmedelete2").addEventListener('click', (e) =>{
        e.preventDefault();
        let myHeaders = new Headers({
            'Authorization': 'Bearer ' + dostavljac.jwt,
            'Content-Type': 'application/x-www-form-urlencoded'
          });
        fetch("https://localhost:7094/Dostavljac/Delete/"+dostavljac.id,{
            method: "DELETE",
            headers : myHeaders
        }).then(s=>{
            if(s.ok){
                glavni.style.display = "none"
                document.getElementById("igi").style.display = "block"
            }
        })
    });
    document.getElementById("dugmepodaci2").addEventListener('click', (e) =>{
        e.preventDefault();
        glavni.style.display = "none"
        document.getElementById("tab").style.display = "none"

        document.getElementById("name2").value = dostavljac.ime
        document.getElementById("prezime2").value = dostavljac.prezime;
        document.getElementById("formadostavljac").style.display = "block"
        
        document.getElementById("buttonUpdate2").addEventListener('click', (e) =>{
            e.preventDefault();
            let pima = document.getElementById("name2").value
            let prez = document.getElementById("prezime2").value
            let myHeaders = new Headers({ 
                'Authorization': 'Bearer ' + dostavljac.jwt,
                'Content-Type': 'application/x-www-form-urlencoded'
              });
            fetch("https://localhost:7094/Dostavljac/Update/"+dostavljac.id+"/"+pima+"/"+prez,{
                method:"PUT",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    dostavljac.ime = document.getElementById("name2").value
                    dostavljac.prezime = document.getElementById("prezime2").value
                    document.getElementById("formadostavljac").style.display = "none"
                    glavni.style.display = "block"
                    document.getElementById("tab").style.display = "block"
                }
            })
        });
    });

    let divZahtevDostava = document.createElement("div")
    divZahtevDostava.id = "divZahtevDostava"+dostavljac.id
    glavni.appendChild(divZahtevDostava)
    
    let lab = document.createElement("label")
    lab.innerHTML = "Prozor za zahteve"
    divZahtevDostava.appendChild(lab)

    let divDostava = document.createElement("div")
    divDostava.id = "divDostavaDostava"+dostavljac.id
    glavni.appendChild(divDostava)
    
    let lab2 = document.createElement("label")
    lab.innerHTML = "Prozor za dostave"
    divDostava.appendChild(lab2)
    
}

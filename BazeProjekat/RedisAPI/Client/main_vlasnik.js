import { Dostava } from "./Dostava.js";
import { Dostavljac} from "./Dostavljac.js";
import { Kategorija } from "./Kategorija.js";
import { Korisnik } from "./Korisnik.js";
import { Objekat } from "./Objekat.js";
import { Proizvod } from "./Proizvod.js";
import { Vlasnik } from "./Vlasnik.js";
import { Covek } from "./Covek.js";
import {KategorijaPom } from "./KategorijaPom.js"

const listaKategorija = [];

export function vcrtaj(vla){
    
    let vlasnik = new Vlasnik(vla.id, vla.prezime, vla.email, vla.brTelefona,  vla.objekatId, vla.ime, vla.userime, vla.jwt)

    document.getElementById("igi").style.display = "none"
    document.getElementById("buttonGetll").style.display = "none"
    
    let glavni = document.getElementById("glavni3")

    let dugmeUpdate = document.createElement("button")
    dugmeUpdate.id = "dugmepodaci3"
    dugmeUpdate.innerHTML = "Promeni podatke"
    glavni.appendChild(dugmeUpdate)

    let dugmeDelete = document.createElement("button")
    dugmeDelete.id = "dugmedelete3"
    dugmeDelete.innerHTML = "Obrisi nalog"
    glavni.appendChild(dugmeDelete)

    document.getElementById("dugmedelete3").addEventListener('click', (e) =>{
        e.preventDefault();
        let myHeaders = new Headers({
            'Authorization': 'Bearer ' + vlasnik.jwt,
            'Content-Type': 'application/x-www-form-urlencoded'
          });
        fetch("https://localhost:7094/Vlasnik/Delete/"+vlasnik.id,{
            method: "DELETE",
            headers : myHeaders
        }).then(s=>{
            if(s.ok){
                glavni.style.display = "none"
                document.getElementById("glavni3").style.display = "block"
                history.go()
            }
        })
    });
    document.getElementById("dugmepodaci3").addEventListener('click', (e) =>{
        e.preventDefault();
        glavni.style.display = "none"
        document.getElementById("tab").style.display = "none"

        document.getElementById("name3").value = vlasnik.ime
        document.getElementById("prezime3").value = vlasnik.prezime;
        document.getElementById("email3").value = vlasnik.email
        document.getElementById("formaVlasnik").style.display = "block"
        
        document.getElementById("buttonUpdate3").addEventListener('click', (e) =>{
            e.preventDefault();
            let pima = document.getElementById("name3").value
            let prez = document.getElementById("prezime3").value
            let pemail = document.getElementById("email3").value
            let myHeaders = new Headers({
                'Authorization': 'Bearer ' + vlasnik.jwt,
                'Content-Type': 'application/x-www-form-urlencoded'
              });
            fetch("https://localhost:7094/Vlasnik/Update/"+vlasnik.id+"/"+pima+"/"+prez+"/"+pemail+"/"+"061",{
                method:"PUT",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    vlasnik.ime = document.getElementById("name3").value
                    vlasnik.prezime = document.getElementById("prezime3").value
                    vlasnik.email = document.getElementById("email3").value
                    document.getElementById("formaVlasnik").style.display = "none"
                    glavni.style.display = "block"
                }
            })
        });
    });

    let divSve = document.createElement("div")
    divSve.id = "divSve"
    glavni.appendChild(divSve)

    let divDodajObj = document.createElement("div")
    divDodajObj.id = "divSve" + vlasnik.id
    divSve.appendChild(divDodajObj)

    let buttonDodajObj = document.createElement("button")
    buttonDodajObj.id = "buttonDodajObj" + vlasnik.id
    buttonDodajObj.innerHTML = "Dodaj objekat"
    divDodajObj.appendChild(buttonDodajObj)

    document.getElementById("buttonDodajObj" + vlasnik.id).addEventListener('click', (e) =>{
        e.preventDefault();
        glavni.style.display = "none"
        document.getElementById("formaDodajObjekat").style.display = "block"

        document.getElementById("buttonUpdateObj").style.display = "none"
        document.getElementById("buttonAddObj").style.display = "block"

        document.getElementById("buttonAddObj").addEventListener('click', (e) =>{
            e.preventDefault();
            let naziv = document.getElementById("nazivobj").value;
            
            let myHeaders = new Headers({
                'Authorization': 'Bearer ' + vlasnik.jwt,
                'Content-Type': 'application/json'
              });
            let objekat = new Objekat(naziv, vlasnik.id);
            fetch("https://localhost:7094/Objekat/Add",{
                method:"POST",
                headers: myHeaders,
                body:JSON.stringify(objekat)
            }).then(ss=>{
                if (ss.ok){
                    glavni.style.display = "block"
                    document.getElementById("formaDodajObjekat").style.display = "none"     
                    history.go();       
                }
            });
        });
    });
    let otvoreno = false;

    fetch("https://localhost:7094/Objekat/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                data.forEach(da => {

                    if(da.vlasnikID == vlasnik.id){
                        let divobjekat = document.createElement("div")
                        divobjekat.id = "divobjekat"+da.id
                        divSve.appendChild(divobjekat)

                        let objekatdugme = document.createElement("button")
                        objekatdugme.id = "objekatdugme"+da.id
                        objekatdugme.innerHTML = da.naziv
                        divobjekat.appendChild(objekatdugme)
                        
                        let objekatUredi = document.createElement("button")
                        objekatUredi.id = "objekatUredi"+da.id
                        objekatUredi.innerHTML = "Promeni"
                        divobjekat.appendChild(objekatUredi)

                        let objekatObrisi = document.createElement("button")
                        objekatObrisi.id = "objekatObrisi"+da.id
                        objekatObrisi.innerHTML = "Obrisi"
                        divobjekat.appendChild(objekatObrisi)

                        let objekatAddKat = document.createElement("button")
                        objekatAddKat.id = "objekatAddKat"+da.id
                        objekatAddKat.innerHTML = "Dodaj kategoriju"
                        divobjekat.appendChild(objekatAddKat)

                        let divkat = document.createElement("div")
                        divkat.id = "divkat"+da.id
                        divobjekat.appendChild(divkat)
                        
                        document.getElementById("objekatAddKat"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            glavni.style.display = "none"
                            document.getElementById("formaDodajKategorija").style.display = "block"  
                            document.getElementById("buttonUpdateKat").style.display = "none"
                            document.getElementById("buttonAddKat").style.display = "block"

                            document.getElementById("buttonAddKat").addEventListener('click', (e) =>{
                                e.preventDefault();

                                let naziv = document.getElementById("nazivkat").value;
                                let myHeaders = new Headers({
                                    'Authorization': 'Bearer ' + vlasnik.jwt,
                                    'Content-Type': 'application/json'
                                  });
                                let katica = new KategorijaPom(naziv, da.id);
                                fetch("https://localhost:7094/Kategorija/Add/"+vlasnik.id,{
                                    method:"POST",
                                    headers: myHeaders,
                                    body:JSON.stringify(katica)
                                }).then(ss=>{
                                    if (ss.ok){
                                        glavni.style.display = "block"
                                        document.getElementById("formaDodajKategorija").style.display = "none"     
                                        history.go();         
                                    }
                                });
                            });                           
                        });


                        document.getElementById("objekatUredi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            glavni.style.display = "none"
                            document.getElementById("formaDodajObjekat").style.display = "block"  

                            document.getElementById("buttonUpdateObj").style.display = "block"
                            document.getElementById("buttonAddObj").style.display = "none"
                            
                            document.getElementById("nazivobj").value = da.naziv
                            
                            document.getElementById("buttonUpdateObj").addEventListener('click', (e) =>{
                                e.preventDefault();
                                let naziv = document.getElementById("nazivobj").value;
                                
                                let myHeaders = new Headers({
                                    'Authorization': 'Bearer ' + vlasnik.jwt,
                                    'Content-Type': 'application/json'
                                  });
                                fetch("https://localhost:7094/Objekat/UpdateName/"+vlasnik.id+"/"+da.id+"/"+naziv,{
                                    method:"PUT",
                                    headers: myHeaders,
                                }).then(ss=>{
                                    if (ss.ok){
                                        glavni.style.display = "block"
                                        document.getElementById("formaDodajObjekat").style.display = "none"    
                                        history.go();       
                                    }
                                });
                            });
                        });
                        document.getElementById("objekatObrisi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            let myHeaders = new Headers({
                                'Authorization': 'Bearer ' + vlasnik.jwt,
                                'Content-Type': 'application/x-www-form-urlencoded'
                              });
                            fetch("https://localhost:7094/Objekat/Delete/"+vlasnik.id+"/"+da.id,{
                                method: "DELETE",
                                headers : myHeaders
                            }).then(s=>{
                                if(s.ok){
                                    history.go();  
                                }
                            });

                        });
                        document.getElementById("objekatdugme"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            if(otvoreno){
                                document.getElementById("divkat"+da.id).replaceChildren();
                            }
                            else{
                                let kata = new Kategorija()
                                listaKategorija.push(kata);
                                kata.preuzmiKategorijeVlasnik(document.getElementById("divkat"+da.id), da.id, vlasnik);
                            }    
                            otvoreno = !otvoreno;               
                        });
                        
                    }             
                });
            })
        }
    });

}
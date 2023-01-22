import { Dostava } from "./Dostava.js";
import { Dostavljac } from "./Dostavljac.js";
import { Kategorija } from "./Kategorija.js";
import { Korisnik } from "./Korisnik.js";
import { Objekat } from "./Objekat.js";
import { Proizvod } from "./Proizvod.js";
import { Vlasnik } from "./Vlasnik.js";
import { Covek } from "./Covek.js";

import {kcrtaj} from "./main_korisnik.js"
import {vcrtaj} from "./main_vlasnik.js"
import {dcrtaj} from "./main_dostavljac.js"

window.addEventListener("load", () => {
document.getElementById("buttonReg").addEventListener('click', (e) =>{
    e.preventDefault();
    if (document.getElementById("name").value != "" & document.getElementById("password").value != ""){
        let tip = 3
        if(document.getElementById("radioOne").checked){
            tip = 1
        }
        if(document.getElementById("radioThree").checked){
            tip = 2
        }
        let covek = new Covek(tip, document.getElementById("name").value, document.getElementById("password").value);
        let username = document.getElementById("name").value;
        fetch("https://localhost:7094/Auth/Register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(covek)
        }).then(s=>{
                if(s.ok){
                    s.json().then(da=>{
                        fetch("https://localhost:7094/Auth/Login",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(covek)
                        }).then(ss=>{
                            if (ss.ok){
                                    ss.text().then(data2=>{
                                        if(covek.tip == 1){
                                            fetch("https://localhost:7094/Korisnik/GetMe/"+username,{
                                                method:"GET"
                                            }).then(sss=>{
                                                if(sss.ok){
                                                    sss.json().then(data =>{
                                                        let korisnik = new Korisnik();
                                                        korisnik.id = data.id
                                                        korisnik.prezime = data.prezime
                                                        korisnik.email = data.email
                                                        korisnik.adressa = data.adressa
                                                        korisnik.ime = data.ime
                                                        korisnik.userime = data.userime
                                                        korisnik.brTelefona = data.brTelefona;
                                                        korisnik.jwt = data2       
                                                        kcrtaj(korisnik)                                                         
                                                    })
                                                }
                                            })   
                                        }
                                        else if(covek.tip == 2){
                                            fetch("https://localhost:7094/Vlasnik/GetMe/"+username,{
                                                method:"GET"
                                            }).then(sss=>{
                                                if(sss.ok){
                                                    sss.json().then(data =>{
                                                        let vlasnik = new Vlasnik();
                                                        vlasnik.id = data.id
                                                        vlasnik.prezime = data.prezime
                                                        vlasnik.email = data.email
                                                        vlasnik.brTelefona = data.brTelefona
                                                        vlasnik.objekatID = data.objekatID
                                                        vlasnik.ime = data.ime
                                                        vlasnik.userime = data.userime
                                                        vlasnik.jwt = data2
                                                        
                                                        vcrtaj(vlasnik)     
                                                    })
                                                }
                                            })
                                        }
                                        else{
                                            fetch("https://localhost:7094/Dostavljac/GetMe/"+username,{
                                                method:"GET"
                                            }).then(sss=>{
                                                if(sss.ok){
                                                    sss.json().then(data =>{
                                                        let dostavljac = new Dostavljac();
                                                        dostavljac.id = data.id
                                                        dostavljac.prezime = data.prezime
                                                        dostavljac.prosecnaocena = data.prosecnaocena
                                                        dostavljac.brOcena = data.brOcena
                                                        dostavljac.ime = data.ime
                                                        dostavljac.userime = data.userime
                                                        dostavljac.jwt = data2
                                                        dcrtaj(dostavljac)     
                                                    })
                                                }
                                            })
                                        }
                                    })   
                            }
                        })
                    })  
                }
                else{
                    return s.text().then(text => {throw new Error(text)})
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }
});

document.getElementById("buttonLog").addEventListener('click', (e) =>{
    e.preventDefault();
    if (document.getElementById("name").value != "" & document.getElementById("password").value != ""){
        let tip = 3
        if(document.getElementById("radioOne").checked)
        {
            tip = 1
        }
        if(document.getElementById("radioThree").checked)
        {
            tip = 2
        }
        let covek = new Covek(tip, document.getElementById("name").value, document.getElementById("password").value);
        let username = document.getElementById("name").value;
        fetch("https://localhost:7094/Auth/Login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(covek)
        }).then(ss=>{
            if (ss.ok){
                    ss.text().then(data2=>{
                        if(covek.tip == 1){
                            fetch("https://localhost:7094/Korisnik/GetMe/"+username,{
                                method:"GET"
                            }).then(s=>{
                                if(s.ok){
                                    s.json().then(data =>{
                                        let korisnik = new Korisnik();
                                        korisnik.id = data.id
                                        korisnik.prezime = data.prezime
                                        korisnik.email = data.email
                                        korisnik.adressa = data.adressa
                                        korisnik.ime = data.ime
                                        korisnik.userime = data.userime
                                        korisnik.brTelefona = data.brTelefona;
                                        korisnik.jwt = data2       
                                        kcrtaj(korisnik)    
                                    })
                                }
                            })
                        }
                        else if(covek.tip == 2){
                            fetch("https://localhost:7094/Vlasnik/GetMe/"+username,{
                                method:"GET"
                            }).then(s=>{
                                if(s.ok){
                                    s.json().then(data =>{
                                        let vlasnik = new Vlasnik();
                                        vlasnik.id = data.id
                                        vlasnik.email = data.email
                                        vlasnik.prezime = data.prezime
                                        vlasnik.brTelefona = data.brTelefona
                                        vlasnik.objekatID = data.objekatID
                                        vlasnik.ime = data.ime
                                        vlasnik.userime = data.userime
                                        vlasnik.jwt = data2
                                        vcrtaj(vlasnik)     
                                    })
                                }
                            })
                        }
                        else{
                            fetch("https://localhost:7094/Dostavljac/GetMe/"+username,{
                                method:"GET"
                            }).then(s=>{
                                if(s.ok){
                                    s.json().then(data =>{
                                        let dostavljac = new Dostavljac();
                                        dostavljac.id = data.id
                                        dostavljac.prezime = data.prezime
                                        dostavljac.prosecnaocena = data.prosecnaocena
                                        dostavljac.brOcena = data.brOcena
                                        dostavljac.ime = data.ime
                                        dostavljac.userime = data.userime
                                        dostavljac.jwt = data2
                                        dcrtaj(dostavljac)     
                                    })
                                }
                            })
                        }
                    })   
            }
        })
    }
});
});

document.getElementById("buttonKorisnik").addEventListener('click', (e) =>{
    e.preventDefault();
    document.getElementById("glavni2").style.display = "none"
    document.getElementById("glavni").style.display = "block"
});
document.getElementById("buttonDostavljac").addEventListener('click', (e) =>{
    e.preventDefault();
    document.getElementById("glavni").style.display = "none"
    document.getElementById("glavni2").style.display = "block"
});
document.getElementById("buttonGetll").addEventListener('click', (e) =>{
    e.preventDefault();
    document.getElementById("igi").style.display = "none"
    document.getElementById("buttonGetll").style.display = "none"
    
    fetch("https://localhost:7094/Korisnik/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AllKorisnik = document.createElement("div")
            AllKorisnik.innerHTML = "Svi korisnici"
            document.getElementById("getall").appendChild(AllKorisnik)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AllKorisnik.appendChild(divPomocni)

                    let labKorisnik = document.createElement("label")
                    labKorisnik.innerHTML = "Korisnik: " + da.ime
                    divPomocni.appendChild(labKorisnik)
                });
            })
        }
    });
    fetch("https://localhost:7094/Dostavljac/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AllDostavljac = document.createElement("div")
            AllDostavljac.innerHTML = "Svi dostavljaci"
            document.getElementById("getall").appendChild(AllDostavljac)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AllDostavljac.appendChild(divPomocni)

                    let labDostavljac = document.createElement("label")
                    labDostavljac.innerHTML = "Dostavljac: " + da.ime
                    divPomocni.appendChild(labDostavljac)
                });
            })
        }
    });
    fetch("https://localhost:7094/Vlasnik/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AllVlasnik = document.createElement("div")
            AllVlasnik.innerHTML = "Svi vlasnici"
            document.getElementById("getall").appendChild(AllVlasnik)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AllVlasnik.appendChild(divPomocni)

                    let labVlasnik = document.createElement("label")
                    labVlasnik.innerHTML = "Vlasnik: " + da.ime
                    divPomocni.appendChild(labVlasnik)
                });
            })
        }
    });
    fetch("https://localhost:7094/Objekat/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AllObjekat = document.createElement("div")
            AllObjekat.innerHTML = "Svi objekti"
            document.getElementById("getall").appendChild(AllObjekat)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AllObjekat.appendChild(divPomocni)

                    let labObjekat = document.createElement("label")
                    labObjekat.innerHTML = "Objekat: " + da.naziv
                    divPomocni.appendChild(labObjekat)
                });
            })
        }
    });
    fetch("https://localhost:7094/Kategorija/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AllKategorija= document.createElement("div")
            AllKategorija.innerHTML = "Sve kategorija   "
            document.getElementById("getall").appendChild(AllKategorija)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AllKategorija.appendChild(divPomocni)

                    let labKategorija = document.createElement("label")
                    labKategorija.innerHTML = "Kategorija: " + da.naziv
                    divPomocni.appendChild(labKategorija)
                });
            })
        }
    });
    fetch("https://localhost:7094/Proizvod/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            let AlllProizvod= document.createElement("div")
            AlllProizvod.innerHTML = "Svi proizvodi   "
            document.getElementById("getall").appendChild(AlllProizvod)
            s.json().then(data=>{
                data.forEach(da => {
                    let divPomocni = document.createElement("div")
                    AlllProizvod.appendChild(divPomocni)

                    let labProizvod = document.createElement("label")
                    labProizvod.innerHTML = "Proizvod: " + da.naziv
                    divPomocni.appendChild(labProizvod)
                });
            })
        }
    });
});
  
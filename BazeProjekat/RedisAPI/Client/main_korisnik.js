import { Dostava } from "./Dostava.js";
import { Dostavljac} from "./Dostavljac.js";
import { Kategorija } from "./Kategorija.js";
import { Korisnik } from "./Korisnik.js";
import { Objekat } from "./Objekat.js";
import { Proizvod } from "./Proizvod.js";
import { Vlasnik } from "./Vlasnik.js";
import { Covek } from "./Covek.js";
import { dcrtaj } from "./main_dostavljac.js";

const listaKategorija = [];
const korisnik = new Korisnik();

export function kcrtaj(kor){
    document.getElementById("tab").style.display = "block"

    korisnik.id = kor.id;
    korisnik.prezime = kor.prezime;
    korisnik.email = kor.email;
    korisnik.adressa = kor.adressa;
    korisnik.ime = kor.ime;
    korisnik.userime = kor.userime;
    korisnik.brTelefona = kor.brTelefona;
    korisnik.jwt = kor.jwt;

    document.getElementById("igi").style.display = "none"
    document.getElementById("buttonGetll").style.display = "none"
    
    let glavni = document.getElementById("glavni")

    let dugmeUpdate = document.createElement("button")
    dugmeUpdate.id = "dugmepodaci"
    dugmeUpdate.innerHTML = "Promeni podatke"
    glavni.appendChild(dugmeUpdate)

    let dugmeDelete = document.createElement("button")
    dugmeDelete.id = "dugmedelete"
    dugmeDelete.innerHTML = "Obrisi nalog"
    glavni.appendChild(dugmeDelete)

    document.getElementById("dugmedelete").addEventListener('click', (e) =>{
        e.preventDefault();
        let myHeaders = new Headers({
            'Authorization': 'Bearer ' + korisnik.jwt,
            'Content-Type': 'application/x-www-form-urlencoded'
          });
        fetch("https://localhost:7094/Korisnik/Delete/"+korisnik.id,{
            method: "DELETE",
            headers : myHeaders
        }).then(s=>{
            if(s.ok){
                glavni.style.display = "none"
                document.getElementById("igi").style.display = "block"
            }
        })
    });
    document.getElementById("dugmepodaci").addEventListener('click', (e) =>{
        e.preventDefault();
        glavni.style.display = "none"
        document.getElementById("tab").style.display = "none"

        document.getElementById("name1").value = korisnik.ime
        document.getElementById("prezime1").value = korisnik.prezime;
        document.getElementById("email1").value = korisnik.email
        document.getElementById("adresa1").value = korisnik.adressa
        document.getElementById("brtelefona1").value = korisnik.brTelefona;
        document.getElementById("formakorisnik").style.display = "block"
        
        document.getElementById("buttonUpdate").addEventListener('click', (e) =>{
            e.preventDefault();
            let pima = document.getElementById("name1").value
            let prez = document.getElementById("prezime1").value
            let pemail = document.getElementById("email1").value
            let padresa = document.getElementById("adresa1").value
            let brtel = document.getElementById("brtelefona1").value
            let myHeaders = new Headers({
                'Authorization': 'Bearer ' + korisnik.jwt,
                'Content-Type': 'application/x-www-form-urlencoded'
              });
            fetch("https://localhost:7094/Korisnik/Update/"+korisnik.id+"/"+pima+"/"+prez+"/"+pemail+"/"+padresa+"/"+brtel,{
                method:"PUT",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    korisnik.ime = document.getElementById("name1").value
                    korisnik.prezime = document.getElementById("prezime1").value
                    korisnik.email = document.getElementById("email1").value
                    korisnik.adressa = document.getElementById("adresa1").value
                    korisnik.brTelefona = document.getElementById("brtelefona1").value
                    document.getElementById("formakorisnik").style.display = "none"
                    glavni.style.display = "block"
                    document.getElementById("tab").style.display = "block"
                }
            })
        });
    });

    let divSve = document.createElement("div")
    divSve.id = "divSve"
    glavni.appendChild(divSve)

    let otvoreno = false;

    fetch("https://localhost:7094/Objekat/GetAll",{
        method:"GET"
    }).then(s=>{
        if(s.ok){
            s.json().then(data=>{
                data.forEach(da => {
                    let divobjekat = document.createElement("div")
                    divobjekat.id = "divobjekat"+da.id
                    divSve.appendChild(divobjekat)

                    let objekatdugme = document.createElement("button")
                    objekatdugme.id = "objekatdugme"+da.id
                    objekatdugme.innerHTML = da.naziv
                    divobjekat.appendChild(objekatdugme)
                    
                    let divkat = document.createElement("div")
                    divkat.id = "divkat"+da.id
                    divobjekat.appendChild(divkat)

                    document.getElementById("objekatdugme"+da.id).addEventListener('click', (e) =>{
                        e.preventDefault();
                        if(otvoreno){
                            document.getElementById("divkat"+da.id).replaceChildren();
                        }
                        else{
                            let kata = new Kategorija()
                            listaKategorija.push(kata);
                            kata.preuzmiKategorije(document.getElementById("divkat"+da.id), da.id);
                        }    
                        otvoreno = !otvoreno;               
                    });
                });
            })
        }
    });

    let divKorpa = document.createElement("div")
    divKorpa.id = "divKorpa"
    glavni.appendChild(divKorpa)
    
    let labelkorpa = document.createElement("label")
    labelkorpa.innerHTML = "Vasa korpa"
    divKorpa.appendChild(labelkorpa)

    let dugmePoruci = document.createElement("button")
    dugmePoruci.id = "dugmePoruci"
    dugmePoruci.innerHTML = "Poruci sve"
    divKorpa.appendChild(dugmePoruci)

    document.getElementById("dugmePoruci").addEventListener('click', (e) =>{
        e.preventDefault();
        document.getElementById("dugmePoruci").disabled  = true;

        let porizvodiID = [];
        let proizvodiNaziv = [];
        let cena = 0;
        let myHeaders = new Headers({
            'Authorization': 'Bearer ' + korisnik.jwt,
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var bar = new Promise((resolve, reject) => {
            listaKategorija.forEach(kata=>{
            kata.listaZaPorucivanje.forEach(pro=>{
                fetch("https://localhost:7094/Proizvod/Order/"+pro.id+"/"+pro.BrBrkorpa,{
                    method:"PUT",
                    headers : myHeaders
                }).then(s=>{
                    if(s.ok){
                        document.getElementById("divKorpa").removeChild(document.getElementById("divprokorpa"+pro.id))
                        pro.BrBrkorpa = 0
                        kata.listaZaPorucivanje.pop(pro);
                        porizvodiID.push(pro.id)
                        proizvodiNaziv.push(pro.naziv)
                        cena += pro.cena
                        resolve()
                    }
                })
            })
            })       
        })
        bar.then(x => {
            fetch("https://localhost:7094/Dostavljac/GetFree",{
                method:"GET",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{                 
                        let covek = new Covek(3, data.userime, data.userime);
                        fetch("https://localhost:7094/Auth/Login",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(covek)
                        }).then(ss=>{
                            if (ss.ok){
                                    console.log(ss)
                                    ss.text().then(data2=>{                                  
                                        fetch("https://localhost:7094/Dostavljac/GetMe/"+ data.userime,{
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
                                                    dostavljac.zahtevDostave(proizvodiNaziv, porizvodiID, cena, korisnik.ime, korisnik.id);    
                                                })
                                            }
                                        })                                    
                                    })   
                            }
                        })          
                    })
                }
            })      
        })
    });
}
export function funDostava(proizvodNazivi, cena, ime_dost){
    let divDostavaKor = document.createElement("div")
    divDostavaKor.id = "divDostavaKor"+korisnik.id
    glavni.appendChild(divDostavaKor)
    
    let labelaDostKor = document.createElement("label")
    labelaDostKor.innerHTML = "Vasa dostava"
    divDostavaKor.appendChild(labelaDostKor)

    proizvodNazivi.forEach(pro => {
        let divPro = document.createElement("div")
        divPro.id = "divPro"+korisnik.id
        document.getElementById("divDostavaKor"+korisnik.id).appendChild(divPro);

        let labPro = document.createElement("label")
        labPro.innerHTML = "Proizvod: " + pro
        divPro.appendChild(labPro);
    });
    let labCena = document.createElement("label")
    labCena.innerHTML = "Cena: " + cena
    document.getElementById("divDostavaKor"+korisnik.id).appendChild(labCena);

    let divPom = document.createElement("div")
    divPom.id = "divPom"+korisnik.id
    document.getElementById("divDostavaKor"+korisnik.id).appendChild(divPom);

    let labDost = document.createElement("label")
    labDost.innerHTML = "Vas dostavljac: " + ime_dost
    document.getElementById("divPom"+korisnik.id).appendChild(labDost);

    document.getElementById("dugmePoruci").disabled  = false;
}
export function funOcena(id_dost, ime_dost){
    document.getElementById("glavni").removeChild(document.getElementById("divDostavaKor"+korisnik.id))
    let divOcenaKor = document.createElement("div")
    divOcenaKor.id = "divOcenaKor"+korisnik.id
    glavni.appendChild(divOcenaKor)
    
    let labelaOcenaKor = document.createElement("label")
    labelaOcenaKor.innerHTML = "Ocenite dostavljaca"
    divOcenaKor.appendChild(labelaOcenaKor)
    
    let divPomoc = document.createElement("div")
    divPomoc.id = "divPomoc"+korisnik.id
    document.getElementById("divOcenaKor"+korisnik.id).appendChild(divPomoc)

    let labDost = document.createElement("label")
    labDost.innerHTML = "Vas dostavljac: " + ime_dost
    document.getElementById("divPomoc"+korisnik.id).appendChild(labDost);

    let ocena_vr = document.createElement("input")
    ocena_vr.type = "number"
    ocena_vr.min = "1"
    ocena_vr.max = "5"
    ocena_vr.id = "ocena_vr" + korisnik.id
    ocena_vr.value = "5"
    document.getElementById("divOcenaKor"+korisnik.id).appendChild(ocena_vr)

    let divZaDugmeOcena = document.createElement("div")
    divZaDugmeOcena.id = "divZaDugmeOcena"+korisnik.id
    document.getElementById("divOcenaKor"+korisnik.id).appendChild(divZaDugmeOcena)

    let dugmeOcena = document.createElement("button")
    dugmeOcena.id = "dugmeOcena"+korisnik.id
    dugmeOcena.innerHTML = "Oceni"
    document.getElementById("divZaDugmeOcena"+korisnik.id).appendChild(dugmeOcena)

    document.getElementById("dugmeOcena"+korisnik.id).addEventListener('click', (e) =>{
        e.preventDefault();
        if(ocena_vr.value > 0 && ocena_vr.value < 6){
            let myHeaders = new Headers({
                'Authorization': 'Bearer ' + korisnik.jwt,
                'Content-Type': 'application/x-www-form-urlencoded'
              });
            fetch("https://localhost:7094/Dostavljac/GiveGrade/"+ id_dost +"/"+ocena_vr.value,{
                method:"PUT",
                headers : myHeaders
            }).then(s=>{
                if(s.ok){
                    document.getElementById("glavni").removeChild(document.getElementById("divOcenaKor"+korisnik.id))     
                    history.go()     
                }
            });
        }
    });
    
}
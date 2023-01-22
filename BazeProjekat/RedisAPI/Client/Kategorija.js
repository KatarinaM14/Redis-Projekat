import { Proizvod } from "./Proizvod.js";
import {ProizvodPom} from "./ProizvodPom.js"


export class Kategorija {
    constructor(id, Naziv, ObjekatId) {
        this.id = id;
        this.naziv = Naziv;
        this.objekatId = ObjekatId;
        this.otvoreno = false;
        this.listaZaPorucivanje = [];
    }
    
    preuzmiKategorije(parent, id_obj){
        fetch("https://localhost:7094/Kategorija/GetKategorije/"+id_obj,{
        method:"GET"
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    parent.replaceChildren();
                    data.forEach(da => {
                        let divkategorija = document.createElement("div")
                        divkategorija.id = "divkategorija"+da.id
                        parent.appendChild(divkategorija)

                        let kategorijadugme = document.createElement("button")
                        kategorijadugme.id = "kategorijadugme"+da.id
                        kategorijadugme.innerHTML = da.naziv
                        divkategorija.appendChild(kategorijadugme)
                        
                        let divpro = document.createElement("div")
                        divpro.id = "divpro"+da.id
                        divkategorija.appendChild(divpro)

                        document.getElementById("kategorijadugme"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            if(this.otvoreno){
                                document.getElementById("divpro"+da.id).replaceChildren();
                            }
                            else{
                                this.preuzmiProizvod(document.getElementById("divpro"+da.id), da.id);
                            }                    
                            this.otvoreno = !this.otvoreno;
                        });
                    });
                })
            }
        });
    }
    preuzmiKategorijeVlasnik(parent, id_obj, vlasnik){
        fetch("https://localhost:7094/Kategorija/GetKategorije/"+id_obj,{
        method:"GET"
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    parent.replaceChildren();
                    data.forEach(da => {
                        let divkategorija = document.createElement("div")
                        divkategorija.id = "divkategorija"+da.id
                        parent.appendChild(divkategorija)

                        let kategorijadugme = document.createElement("button")
                        kategorijadugme.id = "kategorijadugme"+da.id
                        kategorijadugme.innerHTML = da.naziv
                        divkategorija.appendChild(kategorijadugme)
                        
                        let katDugmeUredi = document.createElement("button")
                        katDugmeUredi.id = "katDugmeUredi"+da.id
                        katDugmeUredi.innerHTML = "Uredi"
                        divkategorija.appendChild(katDugmeUredi)

                        let katDugmeObrisi = document.createElement("button")
                        katDugmeObrisi.id = "katDugmeObrisi"+da.id
                        katDugmeObrisi.innerHTML = "Obrisi"
                        divkategorija.appendChild(katDugmeObrisi)                

                        let kataAddPro = document.createElement("button")
                        kataAddPro.id = "kataAddPro"+da.id
                        kataAddPro.innerHTML = "Dodaj proizvod"
                        divkategorija.appendChild(kataAddPro)

                        let divpro = document.createElement("div")
                        divpro.id = "divpro"+da.id
                        divkategorija.appendChild(divpro)
                        
                        document.getElementById("kataAddPro"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            document.getElementById("glavni3").style.display = "none"
                            document.getElementById("formaDodajProizvod").style.display = "block"  
                            document.getElementById("buttonUpdatePro").style.display = "none"
                            document.getElementById("buttonAddPro").style.display = "block"

                            document.getElementById("buttonAddPro").addEventListener('click', (e) =>{
                                e.preventDefault();

                                let naziv = document.getElementById("nazivpro").value;
                                let cena = document.getElementById("cenapro").value;
                                let opis = document.getElementById("opispro").value;

                                let myHeaders = new Headers({
                                    'Authorization': 'Bearer ' + vlasnik.jwt,
                                    'Content-Type': 'application/json'
                                  });
                                let proizvodic = new ProizvodPom(naziv, cena, opis, da.id);
                                fetch("https://localhost:7094/Proizvod/Add/"+vlasnik.id,{
                                    method:"POST",
                                    headers: myHeaders,
                                    body:JSON.stringify(proizvodic)
                                }).then(ss=>{
                                    if (ss.ok){
                                        document.getElementById("glavni3").style.display = "block"
                                        document.getElementById("formaDodajProizvod").style.display = "none"     
                                        //azurira prikaz   
                                        history.go();         
                                    }
                                });
                            });                           
                        });

                        document.getElementById("katDugmeUredi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                           
                            document.getElementById("glavni3").style.display = "none"
                            document.getElementById("formaDodajKategorija").style.display = "block"  

                            document.getElementById("buttonUpdateKat").style.display = "block"
                            document.getElementById("buttonAddKat").style.display = "none"
                            
                            document.getElementById("nazivkat").value = da.naziv
                            
                            document.getElementById("buttonUpdateKat").addEventListener('click', (e) =>{
                                e.preventDefault();
                                let naziv = document.getElementById("nazivkat").value;
                                
                                let myHeaders = new Headers({
                                    'Authorization': 'Bearer ' + vlasnik.jwt,
                                    'Content-Type': 'application/json'
                                  });
                                fetch("https://localhost:7094/Kategorija/UpdateName/"+vlasnik.id+"/"+da.id+"/"+naziv,{
                                    method:"PUT",
                                    headers: myHeaders,
                                }).then(ss=>{
                                    if (ss.ok){
                                        document.getElementById("glavni3").style.display = "block"
                                        document.getElementById("formaDodajKategorija").style.display = "none"    
                                        //azurira prikaz  
                                        history.go();          
                                    }
                                });
                            });
                        });
                        
                        document.getElementById("katDugmeObrisi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            let myHeaders = new Headers({
                                'Authorization': 'Bearer ' + vlasnik.jwt,
                                'Content-Type': 'application/x-www-form-urlencoded'
                              });
                            fetch("https://localhost:7094/Kategorija/Delete/"+vlasnik.id+"/"+da.id,{
                                method: "DELETE",
                                headers : myHeaders
                            }).then(s=>{
                                if(s.ok){
                                    //azurira prikaz
                                    history.go();  
                                }
                            });
                        });

                        document.getElementById("kategorijadugme"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            if(this.otvoreno){
                                document.getElementById("divpro"+da.id).replaceChildren();
                            }
                            else{
                                this.preuzmiProizvodVlasnik(document.getElementById("divpro"+da.id), da.id, vlasnik);
                            }                    
                            this.otvoreno = !this.otvoreno;
                        });
                    });
                })
            }
        });
    }

    preuzmiProizvodVlasnik(parent, id_kat, vlasnik){
        fetch("https://localhost:7094/Proizvod/Get/"+id_kat,{
        method:"GET"
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    parent.replaceChildren();
                    data.forEach(da => {
                        let pro = new Proizvod();
                        pro.id = da.id;
                        pro.cena = da.cena;
                        pro.naziv = da.naziv;
                        pro.opis = da.opis;

                        let divproizvod = document.createElement("div")
                        divproizvod.id = "divproizvod"+da.id
                        parent.appendChild(divproizvod)
                        
                        let divlabpro = document.createElement("div")
                        divlabpro.id = "divlabpro"+da.id
                        divproizvod.appendChild(divlabpro)

                        let divpronaziv = document.createElement("div")
                        divpronaziv.id = "divpronaziv"+da.id
                        divproizvod.appendChild(divpronaziv)
                        let proizvodnaziv = document.createElement("label")
                        proizvodnaziv.innerHTML = "Naziv: " + da.naziv
                        divpronaziv.appendChild(proizvodnaziv)

                        let divproopis = document.createElement("div")
                        divproopis.id = "divproopis"+da.id
                        divproizvod.appendChild(divproopis)
                        let proizvodopis = document.createElement("label")
                        proizvodopis.innerHTML = "Opis: " + da.opis
                        divproopis.appendChild(proizvodopis)

                        let divprocena = document.createElement("div")
                        divprocena.id = "divproopis"+da.id
                        divproizvod.appendChild(divprocena)
                        let proizvodcena = document.createElement("label")
                        proizvodcena.innerHTML = "Cena: " +da.cena
                        divprocena.appendChild(proizvodcena)
                        
                        let proDugmeUredi = document.createElement("button")
                        proDugmeUredi.id = "proDugmeUredi"+da.id
                        proDugmeUredi.innerHTML = "Uredi"
                        divproizvod.appendChild(proDugmeUredi)

                        let proDugmeObrisi = document.createElement("button")
                        proDugmeObrisi.id = "proDugmeObrisi"+da.id
                        proDugmeObrisi.innerHTML = "Obrisi"
                        divproizvod.appendChild(proDugmeObrisi)

                        document.getElementById("proDugmeUredi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                           
                            document.getElementById("glavni3").style.display = "none"
                            document.getElementById("formaDodajProizvod").style.display = "block"  

                            document.getElementById("buttonUpdatePro").style.display = "block"
                            document.getElementById("buttonAddPro").style.display = "none"
                            
                            document.getElementById("nazivpro").value = da.naziv
                            document.getElementById("cenapro").value = da.cena
                            document.getElementById("opispro").value = da.opis
                            
                            document.getElementById("buttonUpdatePro").addEventListener('click', (e) =>{
                                e.preventDefault();
                                let naziv = document.getElementById("nazivpro").value;
                                let cena = document.getElementById("cenapro").value;
                                let opis = document.getElementById("opispro").value;

                                let myHeaders = new Headers({
                                    'Authorization': 'Bearer ' + vlasnik.jwt,
                                    'Content-Type': 'application/json'
                                  });
                                fetch("https://localhost:7094/Proizvod/UpdatePrice/"+vlasnik.id+"/"+da.id+"/"+naziv+"/"+cena+"/"+opis,{
                                    method:"PUT",
                                    headers: myHeaders,
                                }).then(ss=>{
                                    if (ss.ok){
                                        document.getElementById("glavni3").style.display = "block"
                                        document.getElementById("formaDodajProizvod").style.display = "none"    
                                        //azurira prikaz   
                                        history.go();         
                                    }
                                });
                            });
                        });
                        
                        document.getElementById("proDugmeObrisi"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            let myHeaders = new Headers({
                                'Authorization': 'Bearer ' + vlasnik.jwt,
                                'Content-Type': 'application/x-www-form-urlencoded'
                              });
                            fetch("https://localhost:7094/Proizvod/Delete/"+vlasnik.id+"/"+da.id,{
                                method: "DELETE",
                                headers : myHeaders
                            }).then(s=>{
                                if(s.ok){
                                    //azurira prikaz
                                    history.go();  
                                }
                            });
                        });              
                    });
                })
            }
        });
    }
    preuzmiProizvod(parent, id_kat){
        fetch("https://localhost:7094/Proizvod/Get/"+id_kat,{
        method:"GET"
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    parent.replaceChildren();
                    data.forEach(da => {
                        let pro = new Proizvod();
                        pro.id = da.id;
                        pro.cena = da.cena;
                        pro.naziv = da.naziv;
                        pro.opis = da.opis;

                        let divproizvod = document.createElement("div")
                        divproizvod.id = "divproizvod"+da.id
                        parent.appendChild(divproizvod)
                        
                        let divlabpro = document.createElement("div")
                        divlabpro.id = "divlabpro"+da.id
                        divproizvod.appendChild(divlabpro)

                        let divpronaziv = document.createElement("div")
                        divpronaziv.id = "divpronaziv"+da.id
                        divproizvod.appendChild(divpronaziv)
                        let proizvodnaziv = document.createElement("label")
                        proizvodnaziv.innerHTML = "Naziv: " + da.naziv
                        divpronaziv.appendChild(proizvodnaziv)

                        let divproopis = document.createElement("div")
                        divproopis.id = "divproopis"+da.id
                        divproizvod.appendChild(divproopis)
                        let proizvodopis = document.createElement("label")
                        proizvodopis.innerHTML = "Opis: " + da.opis
                        divproopis.appendChild(proizvodopis)

                        let divprocena = document.createElement("div")
                        divprocena.id = "divproopis"+da.id
                        divproizvod.appendChild(divprocena)
                        let proizvodcena = document.createElement("label")
                        proizvodcena.innerHTML = "Cena: " +da.cena
                        divprocena.appendChild(proizvodcena)

                        let divpouci = document.createElement("div")
                        divpouci.className = "divpouci"
                        divproizvod.appendChild(divpouci)

                        let buttonplus = document.createElement("button")
                        buttonplus.id = "buttonporuci"+da.id
                        buttonplus.innerHTML = "Plus"
                        divpouci.appendChild(buttonplus)
                        let buttonminus = document.createElement("button")
                        buttonminus.id = "buttonminus"+da.id
                        buttonminus.innerHTML = "Minus"
                        divpouci.appendChild(buttonminus)

                        document.getElementById("buttonporuci"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            if(pro.BrBrkorpa > 0){
                                pro.BrBrkorpa++;
                                document.getElementById("prpokoraKol"+da.id).innerHTML = "Kolicina: " + pro.BrBrkorpa;
                            }
                            else{
                                this.listaZaPorucivanje.push(pro);

                                let divprokorpa = document.createElement("div")
                                divprokorpa.id = "divprokorpa"+da.id
                                document.getElementById("divKorpa").appendChild(divprokorpa)
                                let prokorpaNaziv = document.createElement("label")
                                prokorpaNaziv.innerHTML = "Naziv: " + da.naziv
                                divprokorpa.appendChild(prokorpaNaziv)
                                let prpokoraKol = document.createElement("label")
                                pro.BrBrkorpa++;
                                prpokoraKol.id = "prpokoraKol" + da.id
                                prpokoraKol.innerHTML = "Kolicina: " + pro.BrBrkorpa;
                                divprokorpa.appendChild(prpokoraKol)
                            }            
                        });
                        document.getElementById("buttonminus"+da.id).addEventListener('click', (e) =>{
                            e.preventDefault();
                            if(pro.BrBrkorpa > 1){
                                pro.BrBrkorpa--;
                                document.getElementById("prpokoraKol"+da.id).innerHTML = "Kolicina: " + pro.BrBrkorpa;
                            }
                            else{
                                if(document.getElementById("divprokorpa"+da.id)){
                                    this.listaZaPorucivanje.pop(pro);
                                    pro.BrBrkorpa--;
                                    document.getElementById("divKorpa").removeChild(document.getElementById("divprokorpa"+da.id))
                                }                  
                            }
                        });
                    });
                })
            }
        });
    }
}
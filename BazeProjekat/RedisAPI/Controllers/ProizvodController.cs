using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Redis.OM.Searching;
using Redis.OM.Skeleton.Model;

namespace Redis.OM.Skeleton.Controllers;

[ApiController]
[Route("[controller]")]
public class ProizvodController : ControllerBase
{
    private RedisCollection<Proizvod> _proizvodi;
    private RedisConnectionProvider _provider;

    public ProizvodController(RedisConnectionProvider provider)
    {
        _provider = provider;
        _proizvodi = (RedisCollection<Proizvod>)provider.RedisCollection<Proizvod>();
    }
    [HttpPost("Add/{id_vlasnik}"), Authorize(Roles = "vlasnik")]
    public IActionResult AddProizvod ([FromRoute] string id_vlasnik, [FromBody] Proizvod proizvod)
    {
        var _kategorije = (RedisCollection<Kategorija>)_provider.RedisCollection<Kategorija>();
        var kat = _kategorije.FindById(proizvod.KategorijaId);
        if(kat == null){
            return BadRequest("Ne postoji ta kategorija");
        }
        var _objkat = (RedisCollection<Objekat>)_provider.RedisCollection<Objekat>();
        var obj = _objkat.FindById(kat.ObjekatId); 
        if(obj != null && obj.vlasnikID == id_vlasnik){
            _proizvodi.Insert(proizvod);
            return Ok(proizvod);
        } 
        else{
            return BadRequest("Ne postoji ta kategorija");
        }
        
    }

    [HttpGet("GetAll")]
    public IActionResult GetAllProizvod()
    {
        try{
            var pom = _proizvodi.ToList();
            if(pom != null){
                return Ok(pom);
            }
            return BadRequest(3);
        }
        catch(Exception e)
        {
            return Ok(e.Message);
        }
    }

    [HttpGet("Get/{id_kategorije}")]
    public IActionResult GetProizvod([FromRoute] string id_kategorije)
    {
        try{
            var pom2 = _proizvodi.ToList().Where(x => x.KategorijaId == id_kategorije);
            if(pom2 != null){
                 return Ok(pom2);
            }
            return BadRequest("Ne postoje proizvodi u toj kategoriji");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("Order/{id}/{br}"), Authorize(Roles = "korisnik")]
    public IActionResult OrderProizvod([FromRoute] string id, [FromRoute] int br = 1)
    {
        try{
            var proizvod =_proizvodi.FindById(id);
            if (proizvod != null)
            {
                proizvod.BrPorudzbina += br;
            }
            else{
                return BadRequest("Ne postoji proizvod s tim ID");
            }    
            _proizvodi.Save();
            return Ok(proizvod);
        }
        catch(Exception e)
        {
            return Ok(e.Message);
        }   
    }

    [HttpPut("UpdatePrice/{id_vlasnik}/{id}/{naziv}/{cena}/{opis}"), Authorize(Roles = "vlasnik")]
    public IActionResult UpdatePrice([FromRoute] string id_vlasnik, [FromRoute] string id, [FromRoute] string naziv, [FromRoute] int cena, [FromRoute] string opis)
    {
        try{
            var proizvod =_proizvodi.FindById(id);    
            if(proizvod == null){
                return BadRequest("Ne postoji taj proizvod");
            }
            var _kategorije = (RedisCollection<Kategorija>)_provider.RedisCollection<Kategorija>();
            var kat = _kategorije.FindById(proizvod.KategorijaId);
            if(kat == null){
                return BadRequest("Ne postoji ta kategorija");
            }
            var _objkat = (RedisCollection<Objekat>)_provider.RedisCollection<Objekat>();
            var obj = _objkat.FindById(kat.ObjekatId); 
            if (obj != null && obj.vlasnikID == id_vlasnik)
            {
                proizvod.Naziv = naziv;
                proizvod.Cena = cena;
                proizvod.Opis = opis;
            }    
            _proizvodi.Save();
            return Ok(proizvod);
        }
        catch(Exception e)
        {
            return Ok(e.Message);
        }   
    }

    [HttpDelete("Delete/{id_vlasnik}/{id}"), Authorize(Roles = "vlasnik")]
    public IActionResult DeleteProizvod([FromRoute] string id_vlasnik, [FromRoute] string id)
    {
        try
        {
            var pro =_proizvodi.FindById(id);
            if(pro != null){
                var _kategorije = (RedisCollection<Kategorija>)_provider.RedisCollection<Kategorija>();
                var kat = _kategorije.FindById(pro.KategorijaId);
                if(kat == null){
                    return BadRequest("Ne postoji ta kategorija");
                }
                var _objkat = (RedisCollection<Objekat>)_provider.RedisCollection<Objekat>();
                var obj = _objkat.FindById(kat.ObjekatId); 
                if (obj != null && obj.vlasnikID == id_vlasnik){
                    _provider.Connection.Unlink($"Proizvod:{id}");
                    return Ok(id); 
                }
                return BadRequest("Ne moze");
            }
            return BadRequest("Ne postoji taj proizvod");        
        }
        catch(Exception e)
        {
            return Ok(e.Message);
        }  
    }
}
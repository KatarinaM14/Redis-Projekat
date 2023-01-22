using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Redis.OM.Searching;
using Redis.OM.Skeleton.Model;

namespace Redis.OM.Skeleton.Controllers;

[ApiController]
[Route("[controller]")]
public class ObjekatController : ControllerBase
{
    private RedisCollection<Objekat> _objekat;
    private RedisConnectionProvider _provider;
    public ObjekatController(RedisConnectionProvider provider)
    {
        _provider = provider;
        _objekat = (RedisCollection<Objekat>)provider.RedisCollection<Objekat>();
    }
    [HttpPost("Add"), Authorize(Roles = "vlasnik")]
    public IActionResult AddObjekat ([FromBody] Objekat obj)
    {   
        var _vlasnik = (RedisCollection<Vlasnik>)_provider.RedisCollection<Vlasnik>();
        var vla = _vlasnik.FindById(obj.vlasnikID);
        if(vla == null){
            return BadRequest("Ne postoji taj vlasnik");
        }
        _objekat.InsertAsync(obj);
        return Ok(obj);
    }

    [HttpGet("GetAll")]
    public IActionResult GetAllObjekat()
    {
        try
        {
            var pom = _objekat.ToList();
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
    [HttpPut("UpdateName/{id_vlasnik}/{id}/{naziv}"), Authorize(Roles = "vlasnik")]
    public IActionResult UpdateName([FromRoute] string id_vlasnik, [FromRoute] string id, [FromRoute] string naziv)
    {
        try{
            var objekat = _objekat.FindById(id);
            if (objekat != null && objekat.vlasnikID == id_vlasnik)
            {
                objekat.Naziv = naziv;
            }    
            _objekat.Save();
            return Ok(objekat);
        }
        catch(Exception e)
        {
            return Ok(e.Message);
        }   
    }


    [HttpDelete("Delete/{id_vlasnik}/{id}"), Authorize(Roles = "vlasnik")]
    public IActionResult DeleteObjekat([FromRoute] string id_vlasnik, [FromRoute] string id)
    {
        try
        {   var obj = _objekat.FindById(id);
            if(obj != null && obj.vlasnikID == id_vlasnik){
                var _kategorija = (RedisCollection<Kategorija>)_provider.RedisCollection<Kategorija>();
                foreach(Kategorija kat in _kategorija)
                {
                    if(kat.ObjekatId == id)
                    {
                        var _proizvodi = (RedisCollection<Proizvod>)_provider.RedisCollection<Proizvod>();
                        foreach(Proizvod pro in _proizvodi)
                        {
                            if(pro.KategorijaId == kat.Id)
                            {
                                _provider.Connection.Unlink($"Proizvod:{pro.Id}");
                            }
                        }
                        _provider.Connection.Unlink($"Kategorija:{kat.Id}");
                    }
                }
                _provider.Connection.Unlink($"Objekat:{id}");
                return Ok(id);
            }      
            return BadRequest("Ne mozete da obrisete taj objekat");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
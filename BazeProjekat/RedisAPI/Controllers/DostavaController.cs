using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Redis.OM.Searching;
using Redis.OM.Skeleton.Model;

namespace Redis.OM.Skeleton.Controllers;

[ApiController]
[Route("[controller]")]
public class DostavaController : ControllerBase
{
    private RedisCollection<Dostava> _dostava;
    private RedisConnectionProvider _provider;
    public DostavaController(RedisConnectionProvider provider)
    {
        _provider = provider;
        _dostava = (RedisCollection<Dostava>)provider.RedisCollection<Dostava>();
    }
    [HttpPost("AddDostava/{cena}/{id_kor}/{id_dost}"), Authorize(Roles = "dostavljac")]
    public IActionResult AddDostava ([FromRoute] int cena, string id_kor, string id_dost)
    {   
        var _proizvod = (RedisCollection<Proizvod>)_provider.RedisCollection<Proizvod>();
        var _korisnik = (RedisCollection<Korisnik>)_provider.RedisCollection<Korisnik>();
        var _dostavljac = (RedisCollection<Dostavljac>)_provider.RedisCollection<Dostavljac>();

        var ko = _korisnik.FindById(id_kor);
        var dost = _dostavljac.FindById(id_dost);
        
        if(ko == null){
            return BadRequest("Ne postoji taj korisnik");
        }
        if(dost == null){
            return BadRequest("Ne postoji taj dostavljac");
        }
        dost.Slobodan = 0;
        _dostavljac.Save();
        List<string> lista = new List<string>();

        var dostava = new Dostava{
            Cena = cena,
            KorisnikId = id_kor,
            DostavljacId = id_dost
        };

        _dostava.InsertAsync(dostava);
        return Ok(dostava);
    }

    [HttpGet("GetAll")]
    public IActionResult GetAllDostava()
    {
        try
        {
            var pom = _dostava.ToList();
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

    [HttpDelete("Delete/{id}"), Authorize(Roles = "dostavljac")]
    public IActionResult DeleteDostava([FromRoute] string id)
    {
        try
        {   
            _provider.Connection.Unlink($"Dostava:{id}");
            return Ok(id);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
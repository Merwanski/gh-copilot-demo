using albums_api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace albums_api.Controllers
{
    [Route("albums")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        // Usage:
        // - GET /albums
        // - GET /albums?sortBy=title
        // - GET /albums?sortBy=artist
        // - GET /albums?sortBy=price
        [HttpGet]
        public IActionResult Get([FromQuery] string? sortBy)
        {
            var albums = Album.GetAll();

            if (string.IsNullOrWhiteSpace(sortBy))
            {
                return Ok(albums);
            }

            var sortedAlbums = sortBy.Trim().ToLowerInvariant() switch
            {
                "title" => albums.OrderBy(a => a.Title).ToList(),
                "artist" => albums.OrderBy(a => a.Artist).ToList(),
                "price" => albums.OrderBy(a => a.Price).ToList(),
                _ => null
            };

            if (sortedAlbums is null)
            {
                return BadRequest("Invalid sortBy value. Use: title, artist, or price.");
            }

            return Ok(sortedAlbums);
        }

        // Usage:
        // - GET /albums/{id}
        // Example: GET /albums/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var album = Album.GetById(id);

            if (album is null)
            {
                return NotFound();
            }

            return Ok(album);
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class MongoBooksController : ControllerBase
    {
        private readonly IBookServices _bookServices;

        public MongoBooksController(IBookServices bookServices)
        {
            _bookServices = bookServices;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            return Ok(_bookServices.GetBooks());
        }

        [HttpPost]
        public IActionResult AddBook(Book book)
        {
            return Ok(_bookServices.AddBook(book));
        }

        [HttpGet("{id}")]
        public IActionResult GetBook(string id)
        {
            return Ok(_bookServices.GetBook(id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(string id)
        {
            _bookServices.DeleteBook(id);
            return NoContent();
        }

        [HttpPut]
        public IActionResult UpdateBook(Book book)
        {
            return Ok(_bookServices.UpdateBook(book));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using EbookConverter.WebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace EbookConverter.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        public BooksController(BookRepository repo)
        {
            _bookRepository = repo;        
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> Get()
        {
            var books = await _bookRepository.GetAllAsync();
            if (books.Any())
                return Ok(books);

            return NotFound();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> Get(int id)
        {
            var book = await _bookRepository.GetAsync(id);
            if (book != null)
                return Ok(book);

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Post(Book book)
        {
            await _bookRepository.AddAsync(book);
            return Ok();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _bookRepository.DeleteAsync(id);
            return Ok();
        }

        
        private static int DistinctMoves(string s, int n, int x, int y) 
        {
            var subSequences = new HashSet<string>();
            CalculateSubSequences(s, n, x, y,0, new StringBuilder(), subSequences);
            return subSequences.Count;
        }

        private static void CalculateSubSequences(string s, int n, int x, int y, int currentIndex, StringBuilder currentPath, 
            ISet<string> subSequences) 
        {
            if (x == y)
                subSequences.Add(currentPath.ToString());
            if (currentIndex < 0 || currentIndex >= n)
                return;

            CalculateSubSequences(s, n, x, y,currentIndex+1, currentPath, subSequences); 
            
            if (s[currentIndex].Equals('r'))
                CalculateSubSequences(s, n,x+1, y,currentIndex+1, currentPath.Append("r"), subSequences);
            else
                CalculateSubSequences(s, n,x-1, y,currentIndex+1, currentPath.Append("l"), subSequences); 
          
            currentPath.Remove(currentPath.Length - 1, 1);
        }
        
        private readonly BookRepository _bookRepository;
    }
}

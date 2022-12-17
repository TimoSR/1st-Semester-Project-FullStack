using System.Security.Cryptography.X509Certificates;
using MongoDB.Driver;

namespace BookStore.Core;

public class BookServices : IBookServices
{

    private readonly IMongoCollection<Book> _books;

    public BookServices(IDbClient dbClient)
    {
        _books = dbClient.GetBooksCollection();
    }
    
    public List<Book> GetBooks()
    {
        return _books.Find(book => true).ToList();
    }
}
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

    public Book AddBook(Book book)
    {
        _books.InsertOne(book);
        return book;
    }

    public Book GetBook(string id) => _books.Find(book => book.Id == id).First();

    public void DeleteBook(string id) => _books.DeleteOne(book => book.Id == id);

    public Book UpdateBook(Book book)
    {
        GetBook(book.Id);
        _books.ReplaceOne(b => b.Id == book.Id, book);
        return book;
    }
}
using System;
using Amazon.DynamoDBv2.DataModel;

namespace EbookConverter.WebApi.Data
{
    [DynamoDBTable("Book")]
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int Year { get; set; }
    }
}

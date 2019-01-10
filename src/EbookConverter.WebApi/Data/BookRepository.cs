using Amazon.DynamoDBv2;

namespace EbookConverter.WebApi.Data
{
    public class BookRepository : DynamoRepository<int, Book>
    {
        public BookRepository(IAmazonDynamoDB dynamoDb) : base(dynamoDb)
        {
        }
    }
}
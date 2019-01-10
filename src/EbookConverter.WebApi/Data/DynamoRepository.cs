using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

namespace EbookConverter.WebApi.Data
{
    public abstract class DynamoRepository<TK, T> : IRepository<TK, T> where T: class
    {
        protected DynamoRepository(IAmazonDynamoDB dynamoDb)
        {
            _context = new DynamoDBContext(dynamoDb);
        }
        
        public async Task<T> GetAsync(TK id)
        {
            var item = await _context.LoadAsync<T>(id);
            return item;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = new List<T>();
            var scan =  _context.ScanAsync<T>(new List<ScanCondition>());
            while (!scan.IsDone)
            {
                var result = await scan.GetRemainingAsync();
                entities.AddRange(result);
            }

            return entities;
        }

        public async Task AddAsync(T entity)
        {
            await _context.SaveAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            var batch = _context.CreateBatchWrite<T>();
            batch.AddPutItems(entities);

            await _context.ExecuteBatchWriteAsync(new[] {batch});
        }

        public async Task Update(T entity)
        {
            await _context.SaveAsync(entity);
        }

        public async Task DeleteAsync(TK id)
        {
            await _context.DeleteAsync(id);
        }

        private readonly DynamoDBContext _context;
    }
}
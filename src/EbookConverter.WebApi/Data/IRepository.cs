using System.Collections.Generic;
using System.Threading.Tasks;

namespace EbookConverter.WebApi.Data
{
    public interface IRepository<in TK, T> where T: class
    {
        Task<T> GetAsync(TK id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task Update(T entity);
        Task DeleteAsync(TK id);
    }
}
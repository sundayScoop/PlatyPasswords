namespace PlatypusPasswords.Services;

using PlatypusPasswords.Helpers;
using PlatypusPasswords;
using System.Data.SqlTypes;

public interface IUserService
{
    List<string> GetUserPasswords(string id);
    void AddPassword(string userId, string newPasswordData);
}

public class UserService : IUserService
{
    private DataContext _context;

    public UserService(DataContext context)
    {
        _context = context;
    }


    public List<string> GetUserPasswords(string id)
    {
        return _context.Entries.Where(e => e.User.Equals(id))
            .Select(e => e.EncryptedData).ToList();
    }

    public void AddPassword(string userId, string newPasswordData)
    {
        Entry newEntry = new Entry{
            User = userId,
            EncryptedData = newPasswordData
        };
        _context.Entries.Add(newEntry);
        
        _context.SaveChanges();
    }

}
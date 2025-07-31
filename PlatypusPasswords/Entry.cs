using System.ComponentModel.DataAnnotations;

namespace PlatypusPasswords
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }
        public string User { get; set; }
        public string EncryptedData { get; set; }
    }
}
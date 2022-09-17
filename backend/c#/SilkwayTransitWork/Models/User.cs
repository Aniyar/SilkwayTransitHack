using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SilkwayTransitWork.Models
{
    public class User
    {
        public string Id { get; set; }
        
        public string Type { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public string Password { get; set; }
    }
}

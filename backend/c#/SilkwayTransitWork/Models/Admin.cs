using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SilkwayTransitWork.Models
{
    public class Admin
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Surname { get; set; }

        public string Password { get; set; }

    }
}

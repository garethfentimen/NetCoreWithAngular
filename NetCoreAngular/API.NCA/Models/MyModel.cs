

using System.ComponentModel.DataAnnotations;

namespace API.NCA.Models
{
    public class MyModel
    {
        [Required]
        [MaxLength(15, ErrorMessage = "No more than 15 characters allowed!")]
        public string Text { get; set; }

        [Range(1, 100)]
        public int Number { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]

        /*
            .* represents any character
            (?=.**\\d) atleast one character needs to be a number
            (?=.*[a-z]) atleast one character need to lowercase letter within the range a-z
            (?=.*[A-Z]) atleast one character needs to be a uppercase letter within the range A-Z
            .{4, 100} the string length needs to be atleast 6 or max 100 characters long.
        */
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,100}", ErrorMessage = "Password must be more complex")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
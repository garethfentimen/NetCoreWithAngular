using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using API.NCA.Models;
using System.Linq;

namespace API.NCA.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowMyOrigin")]
    public class ReverseController : Controller
    {

        // POST api/reverse
        [HttpPost]
        [EnableCors("AllowMyOrigin")]
        public IActionResult Post([FromBody]MyModel MyModel)
        {
            try {
                if (!ModelState.IsValid)
                {
                    var errorList = (from item in ModelState
                                     where item.Value.Errors.Any()
                                     select new { key = item.Key, error = item.Value.Errors[0].ErrorMessage });
                    return StatusCode(400, errorList);
                }
                if (string.IsNullOrEmpty(MyModel.Text))
                {
                    return StatusCode(400, new { Error = "No text" });
                }

                char[] charArray = MyModel.Text.ToCharArray();
                Array.Reverse(charArray);
                var result = new {
                    result = new string(charArray)
                };
                return Ok(result);
            } catch (Exception ex)
            {
                //LogException(e);
                return StatusCode(500, ex);
            }
        }

        // PUT api/values/5
        // [HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/values/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}

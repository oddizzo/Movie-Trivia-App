using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.Linq;
using System.Web;

namespace Movie_Trivia_App.Models
{
    public static class SpiderModel
    {
        // Returns html result
        public static async Task<string> HttpGet(string url)
        {
            try
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage responses = await client.GetAsync(url);
                var content = responses.Content;
                string result = await content.ReadAsStringAsync();
                if (result != null)
                {
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }
    }
}
using Movie_Trivia_App.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using HtmlAgilityPack;

namespace Movie_Trivia_App.Controllers
{
    public class MoviesController : ApiController
    {
        // Returns scraped movie data
        public async Task<IEnumerable<MovieModel>> GetMovies()
        {
            string url = "https://www.imdb.com/chart/top?ref_=nb_mv_3_chttp";
            string html = await SpiderModel.HttpGet(url);
            if (html != null)
            {
                HtmlDocument htmlDoc = new HtmlDocument();
                htmlDoc.LoadHtml(html);
                var Images = htmlDoc.DocumentNode.SelectNodes("//td[@class='posterColumn']//img");
                var Titles = htmlDoc.DocumentNode.SelectNodes("//td[@class='titleColumn']//a");
                var Years = htmlDoc.DocumentNode.SelectNodes("//span[@class='secondaryInfo']");
                if (Years != null)
                {
                    List<MovieModel> movieList = new List<MovieModel>();
                    for (int z = 0; z < Years.Count; z++)
                    {
                        MovieModel movie = new MovieModel();
                        HtmlAttribute src = Images[z].Attributes[@"src"];
                        string[] split = src.Value.Split('@');
                        movie.Image = split.Length == 3 ? (split[0] + "@@._V1_UY368_CR3,0,240,360_AL_.jpg") : (split[0] + "@._V1_UY368_CR3,0,240,360_AL_.jpg");
                        movie.Title = Titles[z].InnerText;
                        movie.Year = Years[z].InnerText.Substring(1, 4);
                        movieList.Add(movie);
                    }
                    MoviesListModel.SetMoviesData(movieList);
                    return MoviesListModel.GetMoviesData();
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
}

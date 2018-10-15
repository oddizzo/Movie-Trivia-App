using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Movie_Trivia_App.Models
{
    public static class MoviesListModel
    {
        // Movie data list
        public static List<MovieModel> MoviesList = new List<MovieModel>();

        // Set movies data into list
        public static void SetMoviesData(List<MovieModel> movies)
        {
            MoviesList = null;
            MoviesList = movies.ToList();
        }

        // Get list of random movies
        public static List<MovieModel> GetMoviesData()
        {
            List<MovieModel> randomList = new List<MovieModel>();
            Random random = new Random(DateTime.Now.Millisecond);
            for (int x = 0; x < 8; x++)
            {
                int randomInt = random.Next(1, 251);
                randomList.Add(MoviesList[randomInt]);
            }
            return randomList;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Movie_Trivia_App.Models
{
    public class MovieModel
    {
        // Movie data model
        public string Image { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }

        public MovieModel(){}

        public MovieModel(string image, string title, string year) 
        {
            
        }
    }
}
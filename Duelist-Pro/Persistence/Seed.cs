using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (userManager.Users.Any() == false)
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "James", UserName = "james", Email = "james@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }

            /* Checks if there is any activities in the database already
                If True, the SeedData will return nothing. 
                If False, the Activity list elements will be stored to the database. 
            */

            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks"
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture"
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture"
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music"
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks"
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks"
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks"
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music"
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel"
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film"
                }
            };

            // I request tracking of the activities
            await context.Activities.AddRangeAsync(activities);

            // Creating the request and saving the activities
            await context.SaveChangesAsync();
        }
    }
}
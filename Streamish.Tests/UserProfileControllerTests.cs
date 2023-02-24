using Microsoft.AspNetCore.Mvc;
using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Streamish.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_Profiles()
        {
            // Arrange
            var profileCount = 20;
            List<UserProfile> profiles = CreateTestUserProfiles(profileCount);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get();

            // Assert 
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(profileCount, actualProfiles.Count);
            Assert.Equal(profiles, actualProfiles);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_Id()
        {
            // Arrange
            var profiles = new List<UserProfile>();
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_Profile_With_Given_Id()
        {
            var profiles = CreateTestUserProfiles(20);
            var testProfileId = 99;
            profiles[0].Id = testProfileId;

            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            var result = controller.Get(testProfileId);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testProfileId, actualProfile.Id);

        }

        [Fact]
        public void Post_Method_Adds_A_New_User_Profile()
        {
            // Arrange
            var profileCount = 20;
            var profiles = CreateTestUserProfiles(profileCount);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);

            // Act
            controller.Post(new UserProfile
            {
                Name = "Test",
                Email = "Test",
                ImageUrl = "test",
                DateCreated = DateTime.Now
            });

            // Assert
            Assert.Equal(profileCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Dont_Match()
        {
            // Arrange
            var profiles = CreateTestUserProfiles(5);
            var repo = new InMemoryUserProfileRepository(profiles);
            var controller = new UserProfileController(repo);
            var testProfileId = 99;

            // Act
            var result = controller.Put(testProfileId, new UserProfile
            {
                Id = testProfileId + 1,
            });

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        private List<UserProfile> CreateTestUserProfiles(int quantity)
        {
            List<UserProfile> profiles = new List<UserProfile>();
            for (int i = 1; i <= quantity; i++)
            {
                profiles.Add(new UserProfile
                {
                    Id = i,
                    Name = $"User {i}",
                    Email = $"user{i}@example.com",
                    DateCreated = DateTime.Today.AddDays(-i),
                    ImageUrl = $"http://user.url/{i}",
                });
            }
            return profiles;
        }
    }
}

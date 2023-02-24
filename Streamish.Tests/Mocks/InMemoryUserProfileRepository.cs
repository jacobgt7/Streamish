using Streamish.Models;
using Streamish.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Streamish.Tests.Mocks
{
    class InMemoryUserProfileRepository : IUserProfileRepository
    {
        private readonly List<UserProfile> _data;

        public List<UserProfile> InternalData
        {
            get { return _data; }
        }

        public InMemoryUserProfileRepository(List<UserProfile> startingData)
        {
            _data = startingData;
        }

        public void Add(UserProfile profile)
        {
            UserProfile lastProfile = _data.Last();
            profile.Id = lastProfile.Id + 1;
            _data.Add(profile);
        }

        public void Delete(int id)
        {
            UserProfile profileToDelete = _data.FirstOrDefault(p => p.Id == id);
            if (profileToDelete == null)
            {
                return;
            }
            _data.Remove(profileToDelete);
        }

        public List<UserProfile> GetAll()
        {
            return _data;
        }

        public UserProfile GetById(int id)
        {
            return _data.FirstOrDefault(p => p.Id == id);
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            throw new NotImplementedException();
        }

        public void Update(int id, UserProfile profile)
        {
            UserProfile profileToEdit = _data.FirstOrDefault(p => p.Id == id);
            if (profileToEdit == null)
            {
                return;
            }
            profileToEdit.Name = profile.Name;
            profileToEdit.Email = profile.Email;
            profileToEdit.ImageUrl = profile.ImageUrl;
        }

        public UserProfile GetByIdWithVideos(int id)
        {
            return _data.FirstOrDefault(p => p.Id == id);
        }


    }
}

using Streamish.Models;
using System.Collections.Generic;

namespace Streamish.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile profile);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(int id, UserProfile profile);
        UserProfile GetByIdWithVideos(int id);
    }
}
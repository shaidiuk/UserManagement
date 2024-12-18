using ReactNet.Data.Entities;
using ReactNet.Models;
using System.Threading.Tasks;

namespace ReactNet.Services
{
    public interface IAccountService
    {
        Task Register(RegisterModel user);

        Task<LoginResponseModel> Login(LoginRequestModel loginModel);

        Task Update(RegisterModel updatedUser);

        Task Logout();
    }
}

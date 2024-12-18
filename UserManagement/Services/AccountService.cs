using Microsoft.AspNetCore.Identity;
using ReactNet.Data.Entities;
using ReactNet.Models;
using System;
using System.Threading.Tasks;

namespace ReactNet.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly SignInManager<UserEntity> _signInManager;

        public AccountService(UserManager<UserEntity> userManager, 
                              SignInManager<UserEntity> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task Register(RegisterModel userModel)
        {
            UserEntity identityUser = MapUserModelToEntity(userModel);

            IdentityResult result = await _userManager.CreateAsync(identityUser, userModel.Password);

            if (result.Succeeded)
            {
               await _signInManager.SignInAsync(identityUser, isPersistent: false);
            }
            else
            {
                throw new ArgumentException("Failure upon registration of user");
            }
        }

        public async Task<LoginResponseModel> Login(LoginRequestModel loginModel)
        {
            SignInResult result = await _signInManager.PasswordSignInAsync(loginModel.Email, loginModel.Password, false, false);

            if (!result.Succeeded)
            {
                throw new ArgumentException("Invalid login attempt");
            }

            var user = await _userManager.FindByEmailAsync(loginModel.Email);

            return MapUserEntityToLoginResponseModel(user);
        }

        public async Task Update(RegisterModel registerModel)
        {
            var identityUser = await _userManager.FindByEmailAsync(registerModel.Email);

            identityUser.FirstName = registerModel.FirstName;
            identityUser.LastName = registerModel.LastName;
            identityUser.Gender = registerModel.Gender;
            identityUser.DateOfBirth = registerModel.DateOfBirth;
            identityUser.Phone = registerModel.Phone;
            identityUser.CivicAddress = registerModel.CivicAddress;
            identityUser.City = registerModel.City;
            identityUser.Province = registerModel.Province;
            identityUser.PostalCode = registerModel.PostalCode;


            //will work all except passwords
            IdentityResult result = await _userManager.UpdateAsync(identityUser);

            if (!result.Succeeded)
            {
                throw new ArgumentException("Update user failure");
            }
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        private static UserEntity MapUserModelToEntity(RegisterModel userModel)
        {
            var identityUser = new UserEntity();

            identityUser.FirstName = userModel.FirstName;
            identityUser.LastName = userModel.LastName;
            identityUser.Gender = userModel.Gender;
            identityUser.DateOfBirth = userModel.DateOfBirth;
            identityUser.Phone = userModel.Phone;
            identityUser.CivicAddress = userModel.CivicAddress;
            identityUser.City = userModel.City;
            identityUser.Province = userModel.Province;
            identityUser.PostalCode = userModel.PostalCode;
            identityUser.UserName = userModel.Email;
            identityUser.Email = userModel.Email;

            return identityUser;
        }

        private static LoginResponseModel MapUserEntityToLoginResponseModel(UserEntity tyiuserEnt)
        {
            var oginResponseModel = new LoginResponseModel();

            oginResponseModel.FirstName = tyiuserEnt.FirstName;
            oginResponseModel.LastName = tyiuserEnt.LastName;
            oginResponseModel.Gender = tyiuserEnt.Gender;
            oginResponseModel.DateOfBirth = tyiuserEnt.DateOfBirth.ToString("yyyy-MM-dd");
            oginResponseModel.Phone = tyiuserEnt.Phone;
            oginResponseModel.CivicAddress = tyiuserEnt.CivicAddress;
            oginResponseModel.City = tyiuserEnt.City;
            oginResponseModel.Province = tyiuserEnt.Province;
            oginResponseModel.PostalCode = tyiuserEnt.PostalCode;
            oginResponseModel.Email = tyiuserEnt.Email;

            return oginResponseModel;
        }
    }
}

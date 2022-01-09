using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Http;
using VirtuWally.Data;
using VirtuWally.Domain;

namespace VirtuWally.API.Services
{
    public class JwtService
    {
        private readonly string secureKey = "this is a very secure key";
        public string Generate(int id)
        {
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            SigningCredentials credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            JwtHeader header = new JwtHeader(credentials);
            JwtPayload payload = new JwtPayload(id.ToString(), null, null, null, DateTime.Today.AddDays(1));
            JwtSecurityToken securityToken = new JwtSecurityToken(header, payload);
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken Verify(string jwt)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(secureKey);
            tokenHandler.ValidateToken(jwt,
                                        new TokenValidationParameters
                                        {
                                            IssuerSigningKey = new SymmetricSecurityKey(key),
                                            ValidateIssuerSigningKey = true,
                                            ValidateIssuer = false,
                                            ValidateAudience = false
                                        },
                                        out SecurityToken validatedToken);
            return (JwtSecurityToken)validatedToken;
        }

        public User CheckIfUserIsLogged(IUserRepository repository, HttpRequest request)
        {
            try
            {
                string jwt = request.Cookies["jwt"];
                JwtSecurityToken token = Verify(jwt);

                int userId = int.Parse(token.Issuer);
                User user = repository.GetById(userId);
                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}

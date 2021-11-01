using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

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
    }
}

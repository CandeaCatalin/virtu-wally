using System;
using MailKit.Net.Smtp;
using MimeKit;
namespace MailService
{
    public class MailService
    {
        MimeMessage message = new MimeMessage();
        string emailAddress = "virtuwallyapp@gmail.com";
        string password = "CosminaCandea1";
        SmtpClient client = new SmtpClient();

        public string sendEmail(string toEmail, string body, string subject)
        {
            message.From.Add(new MailboxAddress("VirtuWallySupport", "virtuwallyapp@gmail.com"));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain")
            {
                Text = body
            };
            try
            {
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate(emailAddress, password);
                client.Send(message);
                return ("Mail sent!");
            }
            catch (Exception ex)
            {
                return (ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}

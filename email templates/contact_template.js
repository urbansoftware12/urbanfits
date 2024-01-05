const ContactTemplate = (user)=>{
    return `
    <html>
    <head>
<meta charset="utf-8">
<title>Password Reset Email</title>
<style>
  body {
    font-family: Arial, sans-serif;
    color: #333;
}
section{
    width: 100%;
    height: 100vh;
    padding: 1rem;
    background: #000326;
  }
  h1{
    text-align: center;
  }
  span{
     cursor: pointer;
     padding: 0.7rem 1rem;
     border: none;
     outline: none;
     border-radius: 1rem;
     background: linear-gradient(90deg, #FAE892 0%, #B3903E 100%)
     color: #ffff;
  }
</style>
</head>
    <body>
    <section>
    <h1>Cutomer Contact</h1>
    <h3>User Details</h3>
    <h4>User Name ${user.firstname} ${user.lastname}</h4>
    <h4>Email address: ${user.email}</h4>
    <h4>Phone number: ${user.phone_prefix} ${user.phone_number}</h4>
    <p>${user.msg}</p>
    </br><small>~Urban Fits</small>
    </section>
    </body>
    </html>`
}
export default ContactTemplate
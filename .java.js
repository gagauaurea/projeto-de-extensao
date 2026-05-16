const API_CONTATO = "https://sheetdb.io/api/v1/jde9p6x41odi0";

/* MENU */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn && navLinks){
  menuBtn.addEventListener("click", function(){
    navLinks.classList.toggle("active");
  });
}

/* MODO ESCURO */
const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("tema") === "dark"){
  document.body.classList.add("dark");

  if(themeBtn){
    themeBtn.textContent = "☀️";
  }
}

if(themeBtn){
  themeBtn.addEventListener("click", function(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
      themeBtn.textContent = "☀️";
      localStorage.setItem("tema", "dark");
    }else{
      themeBtn.textContent = "🌙";
      localStorage.setItem("tema", "light");
    }
  });
}

/* TIPOS DE LIXO */
const wasteCards = document.querySelectorAll(".waste-card");

wasteCards.forEach(function(card){
  card.addEventListener("click", function(){
    card.classList.toggle("active");
  });
});

/* CONTATO */
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const sugestao = document.getElementById("sugestao").value.trim();

    contactStatus.style.display = "block";
    contactStatus.textContent = "Enviando...";

    fetch(API_CONTATO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [
          {
            Nome: nome,
            Email: email,
            Sugestao: sugestao
          }
        ]
      })
    })
    .then(function(response){
      if(response.ok){
        contactStatus.textContent = "✅ Sugestão enviada com sucesso!";
        contactForm.reset();
      }else{
        contactStatus.textContent = "❌ Erro ao enviar. Confira o link da API.";
      }
    })
    .catch(function(error){
      contactStatus.textContent = "❌ Erro de conexão.";
      console.log(error);
    });
  });
}
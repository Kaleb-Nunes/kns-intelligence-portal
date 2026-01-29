/* KNS CORE LOGIC - ENTERPRISE EDITION v2.0 */

// 1. SECURITY CHECK (SESSION GATEKEEPER)
// Se não tiver o token 'kns_token' (gerado no login), chuta para fora.
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        const token = localStorage.getItem('kns_session');
        if (!token) {
            alert("Sessão expirada ou inválida. Faça login novamente.");
            window.location.href = 'index.html';
        } else {
            console.log("KNS Security: Session Validated for user " + token);
            // Atualiza o nome do usuário na tela
            document.getElementById('user-name-display').innerText = token;
        }
    }
});

// 2. LOGIC PARA O LOGIN (INDEX.HTML)
function performLogin(event) {
    event.preventDefault(); // Não recarrega a página
    const user = document.querySelector('input[type="text"]').value;
    const pass = document.querySelector('input[type="password"]').value;
    const check = document.getElementById('lgpd-check');

    if(!check.checked) {
        alert("Você precisa aceitar os termos de Compliance.");
        return;
    }

    // Simulação de Autenticação
    if(user && pass) {
        const btn = document.getElementById('btn-submit');
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Autenticando LDAP...';
        btn.disabled = true;

        setTimeout(() => {
            // Salva a sessão no navegador
            localStorage.setItem('kns_session', "Caio (Gestor)"); 
            window.location.href = 'dashboard.html';
        }, 1500);
    }
}

// 3. LOGIC PARA O DASHBOARD (SPA NAVIGATION)
function navigate(viewId) {
    // Esconde todas as views
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));

    // Mostra a view selecionada
    const target = document.getElementById('view-' + viewId);
    if(target) target.classList.add('active');
    
    // Ativa o menu
    const menu = document.getElementById('nav-' + viewId);
    if(menu) menu.classList.add('active');
}

// 4. LOGIC PARA UPLOAD DE ARQUIVOS (REEMBOLSO/CHAMADOS)
function triggerUpload(inputId) {
    document.getElementById(inputId).click();
}

function updateFileName(input) {
    const fileName = input.files[0] ? input.files[0].name : "Nenhum arquivo selecionado";
    // Procura o label próximo para atualizar o texto
    const label = input.parentElement.querySelector('.upload-label');
    if(label) label.innerHTML = `<i class="fa-solid fa-check" style="color:#2ecc71"></i> ${fileName}`;
}

// 5. USER DROPDOWN (AVATAR MENU)
function toggleUserMenu() {
    const menu = document.getElementById('user-dropdown');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    localStorage.removeItem('kns_session');
    window.location.href = 'index.html';
}

// 6. MODAL LOGIC (ABERTURA DE CHAMADO COMPLEXO)
function openTicketModal() {
    const modal = document.getElementById('ticket-modal');
    modal.style.display = 'flex';
}

function closeTicketModal() {
    document.getElementById('ticket-modal').style.display = 'none';
}

// Fecha menus se clicar fora
window.onclick = function(event) {
    if (!event.target.matches('.avatar') && !event.target.matches('.avatar *')) {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
}
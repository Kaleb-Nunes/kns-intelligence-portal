/* KNS ENTERPRISE SYSTEM - CORE CONTROLLER v5.0 (FINAL) */

const app = {
    // --- 1. INICIALIZAÇÃO INTELIGENTE ---
    init: function() {
        console.log("KNS System: Initializing...");
        
        // Identifica em qual página estamos
        const isLoginPage = document.getElementById('login-card');
        const isDashboard = document.querySelector('.sidebar');

        if (isLoginPage) {
            this.initLogin();
        } else if (isDashboard) {
            this.initDashboard();
        }
    },

    // ============================================================
    // LÓGICA DE LOGIN (INDEX)
    // ============================================================
    initLogin: function() {
        // Checagem de "Lembrar de mim" ou estado do checkbox
        const checkbox = document.getElementById('lgpd-check');
        if (checkbox && checkbox.checked) this.checkLoginState();

        // Listeners
        document.getElementById('toggle-pass').addEventListener('click', () => this.togglePassword());
        document.getElementById('terms-box').addEventListener('click', () => this.toggleTerms());
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLoginSubmit(e));
    },

    toggleTerms: function() {
        const checkbox = document.getElementById('lgpd-check');
        checkbox.checked = !checkbox.checked;
        this.checkLoginState();
    },

    checkLoginState: function() {
        const checkbox = document.getElementById('lgpd-check');
        const box = document.getElementById('terms-box');
        const btn = document.getElementById('btn-submit');
        
        if (checkbox.checked) {
            box.classList.add('active');
            btn.disabled = false;
            btn.classList.add('enabled');
            btn.innerHTML = "Acessar Sistema <i class='fa-solid fa-arrow-right'></i>";
        } else {
            box.classList.remove('active');
            btn.disabled = true;
            btn.classList.remove('enabled');
            btn.innerHTML = '<i class="fa-solid fa-lock"></i> Aguardando Aceite';
        }
    },

    togglePassword: function() {
        const passInput = document.getElementById('pass');
        const icon = document.getElementById('toggle-pass');
        if (passInput.type === "password") {
            passInput.type = "text";
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passInput.type = "password";
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    },

    handleLoginSubmit: function(event) {
        event.preventDefault();
        const user = document.getElementById('user');
        const pass = document.getElementById('pass');
        const btn = document.getElementById('btn-submit');
        const card = document.getElementById('login-card');
        const originalText = btn.innerHTML;

        // Reset Visual
        card.classList.remove('shake');
        user.style.borderColor = "#333";
        pass.style.borderColor = "#333";

        // Loading
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Validando Credenciais...';
        btn.style.opacity = "0.9";

        setTimeout(() => {
            // REGRA: Usuário > 3 chars e Senha > 3 chars
            if (user.value.length > 3 && pass.value.length > 3) {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> SUCESSO';
                btn.style.background = "#2ecc71";
                btn.style.color = "#000";
                
                // CRIA A SESSÃO
                localStorage.setItem('kns_session', 'active');
                localStorage.setItem('kns_user', user.value);
                
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
            } else {
                btn.innerHTML = originalText;
                btn.style.opacity = "1";
                card.classList.add('shake');
                user.style.borderColor = "#ff4d4d";
                pass.style.borderColor = "#ff4d4d";
                pass.value = "";
                user.focus();
            }
        }, 1500);
    },

    // ============================================================
    // LÓGICA DE DASHBOARD (SISTEMA)
    // ============================================================
    initDashboard: function() {
        // Gatekeeper (Segurança de Sessão)
        const session = localStorage.getItem('kns_session');
        if (!session) {
            console.warn("Acesso negado: Redirecionando para login.");
            window.location.href = 'index.html';
            return;
        }
        console.log("KNS Secure: Session Active");
    },

    navigate: function(viewId) {
        // Remove active de tudo
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        
        // Adiciona active no alvo
        const view = document.getElementById('view-' + viewId);
        if(view) view.classList.add('active');
        
        const nav = document.getElementById('nav-' + viewId);
        if(nav) nav.classList.add('active');
        
        // Fecha menu se estiver aberto
        const menu = document.getElementById('user-menu');
        if(menu) menu.style.display = 'none';
    },

    toggleMenu: function() {
        const menu = document.getElementById('user-menu');
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    },

    logout: function() {
        const items = document.querySelectorAll('.dropdown-item');
        // Acha o botão de sair e muda o texto
        items.forEach(item => {
            if(item.textContent.includes('Sair')) item.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saindo...';
        });
        
        localStorage.removeItem('kns_session');
        setTimeout(() => { window.location.href = 'index.html'; }, 800);
    },

    // --- SISTEMA DE MODAIS ---
    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if(modal) modal.style.display = 'flex';
    },

    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if(modal) modal.style.display = 'none';
    },

    // Wrappers específicos para os botões do menu
    openProfileModal: function() {
        this.openModal('modal-profile');
        this.toggleMenu(); // Fecha o dropdown
    },

    openConfigModal: function() {
        this.openModal('modal-config');
        this.toggleMenu(); // Fecha o dropdown
    },

    openServiceModal: function(type) {
        const modal = document.getElementById('modal-simple');
        const title = document.getElementById('modal-simple-title');
        const body = document.getElementById('modal-simple-body');
        
        if (modal) {
            modal.style.display = 'flex';
            if(type === 'reembolso') {
                title.innerText = "Solicitar Reembolso";
                body.innerHTML = "<label class='form-label'>Valor (R$)</label><input type='number' class='form-control' placeholder='0,00'><label class='form-label'>Nota Fiscal</label><input type='file' class='form-control' style='padding:5px'>";
            } else if (type === 'acesso') {
                title.innerText = "Acesso Predial";
                body.innerHTML = "<label class='form-label'>Visitante</label><input type='text' class='form-control'><label class='form-label'>RG</label><input type='text' class='form-control'>";
            }
        }
    },

    // --- LÓGICA DE EDIÇÃO DE PERFIL ---
    enableEditMode: function() {
        const fields = ['input-role', 'input-dept', 'input-email', 'input-phone'];
        fields.forEach(id => {
            const el = document.getElementById(id);
            if(el) {
                el.disabled = false;
                el.style.border = "1px solid #444";
            }
        });
        document.getElementById('btn-save-profile').style.display = 'inline-block';
        document.getElementById('btn-edit-profile').style.display = 'none';
    },

    saveProfile: function() {
        const btn = document.getElementById('btn-save-profile');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
        
        setTimeout(() => {
            const fields = ['input-role', 'input-dept', 'input-email', 'input-phone'];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if(el) {
                    el.disabled = true;
                    el.style.border = "none";
                }
            });
            btn.innerHTML = 'Salvo!';
            btn.style.background = '#2ecc71';
            
            setTimeout(() => {
                this.closeModal('modal-profile');
                btn.style.display = 'none';
                btn.innerHTML = 'Salvar';
                btn.style.background = '#00E5FF';
                document.getElementById('btn-edit-profile').style.display = 'inline-block';
            }, 1000);
        }, 1000);
    },

    previewPhoto: function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('profile-pic-preview').src = e.target.result;
                document.getElementById('profile-pic-preview').style.display = 'block';
                document.getElementById('profile-initial').style.display = 'none';
                document.getElementById('header-avatar').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    saveConfig: function() {
        const btn = document.getElementById('btn-save-config');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Salvo';
        btn.style.background = '#2ecc71';
        setTimeout(() => { 
            this.closeModal('modal-config'); 
            btn.innerHTML = 'Salvar';
            btn.style.background = '#00E5FF';
        }, 800);
    }
};

// Inicializa o sistema quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => app.init());
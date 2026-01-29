/* KNS INTELLIGENCE PORTAL
   Core Logic v1.0 (Simulation Mode)
   Author: Kaleb Nunes
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("KNS System: Online and Ready.");
    
    // --- 1. SIMULAÇÃO DE DADOS EM TEMPO REAL (GRÁFICOS) ---
    const bars = document.querySelectorAll('.bar');
    
    function randomizeCharts() {
        bars.forEach(bar => {
            // Gera uma altura aleatória entre 15% e 100%
            const randomHeight = Math.floor(Math.random() * 85) + 15;
            
            // Aplica a nova altura com animação CSS
            bar.style.height = `${randomHeight}%`;
            
            // LÓGICA DE ALERTA VISUAL:
            // Se passar de 90%, fica vermelho (Crítico)
            if(randomHeight > 90) {
                bar.style.background = '#ff3366'; // Vermelho Neon
                bar.style.boxShadow = '0 0 15px rgba(255, 51, 102, 0.8)';
            } else {
                bar.style.background = '#222'; // Cor padrão (Cinza escuro)
                bar.style.boxShadow = 'none';
            }
        });
    }

    // Roda a simulação a cada 2 segundos
    setInterval(randomizeCharts, 2000);


    // --- 2. PULSO DO SISTEMA (HEARTBEAT) ---
    // Faz a bolinha verde piscar para mostrar que está "vivo"
    const dot = document.querySelector('.status-dot');
    
    function updateSystemStatus() {
        if(dot) {
            // Alterna a transparência
            dot.style.opacity = (dot.style.opacity === '0.4' ? '1' : '0.4');
        }
    }
    
    setInterval(updateSystemStatus, 800); // Pisca rápido (0.8s)


    // --- 3. MENU LATERAL INTERATIVO ---
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Tira a cor azul de todos
            menuItems.forEach(i => i.classList.remove('active'));
            // Coloca a cor azul só no que foi clicado
            e.currentTarget.classList.add('active');
        });
    });


    // --- 4. O "EVENTO SURPRESA" (NOTIFICAÇÃO) ---
    // Simula um problema chegando exatamente 5 segundos após abrir a tela.
    // Ótimo para você falar: "Olha, o sistema acabou de pegar algo..."
    
    const notifBadge = document.querySelector('.user-profile span span');
    
    setTimeout(() => {
        if(notifBadge) {
            // 1. Aumenta o número de notificações
            notifBadge.innerText = "1";
            
            // 2. Muda a cor para Vermelho Alerta
            notifBadge.style.background = '#ff3366';
            notifBadge.style.boxShadow = '0 0 10px #ff3366';
            
            // 3. Pisca a tela inteira (Feedback visual sutil)
            document.body.style.boxShadow = "inset 0 0 100px rgba(255, 0, 0, 0.15)";
            
            // 4. Log no console (para parecer técnico se estiver inspecionando)
            console.warn("[KNS PROTOCOL 09] ALERTA CRÍTICO: Latência detectada no Cluster WMS.");

            // Remove o flash vermelho da tela depois de 1 segundo
            setTimeout(() => { 
                document.body.style.boxShadow = "none"; 
            }, 1000);
        }
    }, 5000); // Acontece 5000ms (5 segundos) depois de carregar
});
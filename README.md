# 📘 KNS Service Management (Enterprise Portal)

> **Versão:** 6.0 (Production Release)  
> **Arquitetura:** Client-Side SPA (Single Page Application)  
> **Protocolo:** KNS-SEC-2026  

---

## 1. Visão Geral (Overview)

O **KNS Service Management** é uma plataforma SaaS (Software as a Service) focada em CSC (Centro de Serviços Compartilhados). Projetada para alta performance e latência zero, a aplicação gerencia incidentes, requisições de serviço e controle de acesso corporativo.

Diferente de sistemas legados, o KNS utiliza uma arquitetura **Serverless Client-Side**, onde toda a persistência de dados e lógica de negócios ocorre no navegador do cliente, garantindo velocidade instantânea e dependência zero de backend para operações básicas.

### 🚀 O Diferencial: Protocolo 09
Este sistema é a interface visual da metodologia proprietária **Protocolo 09**, focada em:
* **Zero Downtime:** Monitoramento preditivo.
* **Auto-Healing:** Remediação autônoma de incidentes.
* **Business Service Monitoring (BSM):** Foco em métricas de negócio, não apenas hardware.

---

## 2. Stack Tecnológica

O sistema foi construído utilizando os fundamentos puros da web para garantir compatibilidade universal e performance máxima (**Lighthouse Score 100**).

* **Frontend:** HTML5 Semântico.
* **Estilização:** CSS3 Avançado (CSS Variables, Flexbox, CSS Grid, Animations) com tema *Cyberpunk Enterprise*.
* **Lógica:** Vanilla JavaScript (ES6+) - Sem frameworks pesados, garantindo leveza.
* **Banco de Dados:** `localStorage` API (Persistência no navegador simulando NoSQL).
* **Hospedagem:** Vercel (Edge Network).

---

## 3. Estrutura do Projeto

A solução é composta por três artefatos principais:

| Arquivo | Função | Descrição Técnica |
| :--- | :--- | :--- |
| **`index.html`** | **Auth Gateway** | Porta de entrada. Gerencia Login, Cadastro de Usuários, Validação de Compliance (Termos de Uso) e criação de Sessão. |
| **`dashboard.html`** | **Workspace** | O painel principal. Contém toda a lógica de SPA, Modais, CRUD de chamados e Gestão de Perfil. |
| **`terms.html`** | **Compliance** | Documento jurídico estático referenciado no login para conformidade com LGPD/ISO 27001. |

---

## 4. Funcionalidades do Sistema

### 🔐 4.1. Autenticação & Segurança
* **Gatekeeper:** Scripts de proteção que impedem acesso direto ao Dashboard sem token de sessão.
* **Compliance Enforcement:** O botão de login permanece bloqueado até que o usuário abra e aceite os Termos de Uso.
* **Cadastro Self-Service:** Novos usuários podem se registrar via modal, salvos no banco local.

### 📊 4.2. Dashboard Operacional
* **KPIs em Tempo Real:** Cards superiores mostram contagem de chamados e SLA.
* **Tabelas Dinâmicas:** Listagem de chamados que atualiza automaticamente.
* **Menu Inteligente:** Avatar e nome adaptáveis ao usuário logado.

### 🛠️ 4.3. Administração (Root Access)
* **Database Viewer:** Módulo exclusivo para visualizar e excluir usuários cadastrados no `localStorage`.

### 👤 4.4. Gestão de Perfil
* **Interface ERP:** Modal com abas (*Pessoal, Preferências, Notificações*) inspirado em sistemas como SAP e Ellevo.

---

## 5. Guia de Instalação e Uso

### 5.1. Instalação (Local)
1.  Clone este repositório:
    ```bash
    git clone [https://github.com/KalebNunes/kns-intelligence-portal.git](https://github.com/KalebNunes/kns-intelligence-portal.git)
    ```
2.  Navegue até a pasta e abra o arquivo `index.html` no seu navegador.

### 5.2. Credenciais de Acesso (Demo)
O sistema vem pré-configurado com uma credencial "Root" para demonstração:

* **Usuário:** `kaleb.nunes`
* **Senha:** `13091993`

> **Nota:** Você também pode utilizar o botão "Criar Acesso" na tela de login para registrar um novo usuário.

---

## 6. Arquitetura de Dados (Data Schema)

O sistema utiliza chaves no `localStorage` para simular tabelas de banco de dados:

**Chave: `kns_db_users` (Tabela de Usuários)**
```json
[
  { 
    "nome": "Kaleb Nunes", 
    "email": "kaleb.nunes", 
    "cargo": "Head of Engineering", 
    "senha": "..." 
  }
]
Chave: kns_tickets (Tabela de Chamados)

JSON
[
  { 
    "id": "INC-1001", 
    "title": "Erro VPN", 
    "priority": "Alta", 
    "status": "Novo" 
  }
]
7. Roadmap (Próximos Passos)
[ ] Implementar persistência em Nuvem (Firebase/Supabase).

[ ] Integração via API com Zabbix para coleta real de métricas.

[ ] Módulo de Chat com IA para triagem automática.

[ ] Tema Light/Dark alternável.

<div align="center"> <p>Desenvolvido por <strong>Kaleb Nunes</strong></p> <p><em>Head of Engineering @ KNS Consultoria Global</em></p> <p>📍 Balneário Camboriú, SC - Brasil</p> </div>.

Last Update: 29/01/2026

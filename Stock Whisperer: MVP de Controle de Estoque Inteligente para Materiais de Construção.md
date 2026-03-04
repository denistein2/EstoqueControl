# Stock Whisperer

MVP de **Controle de Estoque Inteligente** para materiais de construção.  
Transformei um desafio de vaga (low-level + IA) em um produto real e funcional.

![Stock Whisperer Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Preview)  
*(Adicione um print real da tela principal aqui depois – tira com Print Screen ou Loom e sobe na pasta public/ ou usa link externo)*

## O que é isso?

Peguei uma vaga de desenvolvedor com foco em low-level e inteligência artificial para setor de materiais de construção. Analisei o problema real da empresa (controle de estoque caótico, sem previsões, perdas por falta/excesso) e criei este MVP completo:

- Fluxo centralizado de entrada/saída de materiais  
- Cadastro rápido de itens (nome, código, quantidade, unidade, fornecedor)  
- Alertas visuais para estoque baixo/crítica  
- Dashboard simples com totais e histórico de movimentações  
- UI moderna e responsiva (pronta pra mobile também)

**Objetivo**: Provar que consigo pegar um problema de negócio, prototipar rápido e entregar valor real — em vez de só "fazer o teste técnico e deletar".

## Tecnologias usadas

- **Frontend**: React + TypeScript + Vite  
- **UI Components**: shadcn-ui (belos e acessíveis)  
- **Estilo**: Tailwind CSS  
- **Build & Dev**: Vite (rápido pra caralho)  
- **Testes**: Vitest  
- **Linting**: ESLint  
- **Gerenciador**: Bun / npm  

*(Se tu adicionou banco como localStorage, Supabase, Firebase ou algo de IA — tipo previsão de demanda via modelo simples — coloca aqui! Ex: + OpenAI API para sugestões de reorder)*

## Como rodar localmente (em 2 minutos)

```bash
# 1. Clone o repo
git clone https://github.com/denistein2/stock-whisperer.git

# 2. Entre na pasta
cd stock-whisperer

# 3. Instale as dependências (usa npm ou bun)
npm install
# ou
bun install

# 4. Rode o servidor de dev
npm run dev
# ou
bun dev

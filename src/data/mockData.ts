// --- SETORES ---
export interface Setor {
  id: string;
  nome: string;
  tipo: string;
  ordem: number;
  ativo: boolean;
}

export const setores: Setor[] = [
  { id: "s1", nome: "Almoxarifado", tipo: "armazenamento", ordem: 1, ativo: true },
  { id: "s2", nome: "Produção", tipo: "produção", ordem: 2, ativo: true },
  { id: "s3", nome: "Expedição", tipo: "saída", ordem: 3, ativo: true },
  { id: "s4", nome: "Qualidade", tipo: "controle", ordem: 4, ativo: true },
  { id: "s5", nome: "Manutenção", tipo: "suporte", ordem: 5, ativo: true },
];

// --- CATEGORIAS ---
export interface Categoria {
  id: string;
  nome: string;
}

export const categorias: Categoria[] = [
  { id: "c1", nome: "Matéria-prima" },
  { id: "c2", nome: "Embalagem" },
  { id: "c3", nome: "Produto Acabado" },
  { id: "c4", nome: "Insumo" },
  { id: "c5", nome: "Peça de Reposição" },
];

// --- UNIDADES ---
export const unidades = ["un", "kg", "g", "m", "m²", "pç", "cx", "l"] as const;
export type Unidade = typeof unidades[number];

// --- PRODUTOS ---
export interface Produto {
  id: string;
  nome: string;
  sku: string;
  categoriaId: string;
  unidade: Unidade;
  estoqueMinimo: number;
  permiteNegativo: boolean;
  ativo: boolean;
}

export const produtos: Produto[] = [
  { id: "p1", nome: "Chapa de Aço 2mm", sku: "CHP-ACO-2MM", categoriaId: "c1", unidade: "un", estoqueMinimo: 50, permiteNegativo: false, ativo: true },
  { id: "p2", nome: "Parafuso M8x30", sku: "PRF-M8-30", categoriaId: "c4", unidade: "un", estoqueMinimo: 500, permiteNegativo: false, ativo: true },
  { id: "p3", nome: "Tinta Epóxi Cinza", sku: "TNT-EPX-CZ", categoriaId: "c4", unidade: "l", estoqueMinimo: 20, permiteNegativo: false, ativo: true },
  { id: "p4", nome: "Caixa Papelão 40x30", sku: "CXP-40-30", categoriaId: "c2", unidade: "un", estoqueMinimo: 200, permiteNegativo: false, ativo: true },
  { id: "p5", nome: "Motor Elétrico 1CV", sku: "MOT-ELE-1CV", categoriaId: "c5", unidade: "un", estoqueMinimo: 5, permiteNegativo: false, ativo: true },
  { id: "p6", nome: "Rolamento 6205", sku: "ROL-6205", categoriaId: "c5", unidade: "un", estoqueMinimo: 30, permiteNegativo: false, ativo: true },
  { id: "p7", nome: "Estrutura Soldada X1", sku: "EST-SLD-X1", categoriaId: "c3", unidade: "un", estoqueMinimo: 10, permiteNegativo: false, ativo: true },
  { id: "p8", nome: "Fita Adesiva Industrial", sku: "FTA-ADH-IND", categoriaId: "c4", unidade: "un", estoqueMinimo: 100, permiteNegativo: false, ativo: true },
  { id: "p9", nome: "Tubo Galvanizado 1\"", sku: "TUB-GAL-1P", categoriaId: "c1", unidade: "m", estoqueMinimo: 60, permiteNegativo: false, ativo: true },
  { id: "p10", nome: "Placa Eletrônica PCB", sku: "PLC-ELT-PCB", categoriaId: "c1", unidade: "un", estoqueMinimo: 15, permiteNegativo: false, ativo: true },
];

// --- ESTOQUE ---
export interface EstoqueItem {
  produtoId: string;
  setorId: string;
  quantidade: number;
}

export const estoque: EstoqueItem[] = [
  { produtoId: "p1", setorId: "s1", quantidade: 120 },
  { produtoId: "p1", setorId: "s2", quantidade: 30 },
  { produtoId: "p2", setorId: "s1", quantidade: 1200 },
  { produtoId: "p2", setorId: "s2", quantidade: 300 },
  { produtoId: "p3", setorId: "s1", quantidade: 18 },
  { produtoId: "p4", setorId: "s3", quantidade: 450 },
  { produtoId: "p5", setorId: "s5", quantidade: 3 },
  { produtoId: "p6", setorId: "s1", quantidade: 25 },
  { produtoId: "p6", setorId: "s5", quantidade: 8 },
  { produtoId: "p7", setorId: "s2", quantidade: 12 },
  { produtoId: "p7", setorId: "s3", quantidade: 5 },
  { produtoId: "p8", setorId: "s1", quantidade: 80 },
  { produtoId: "p9", setorId: "s1", quantidade: 45 },
  { produtoId: "p10", setorId: "s1", quantidade: 10 },
  { produtoId: "p10", setorId: "s2", quantidade: 3 },
];

// --- TRANSAÇÕES ---
export type TipoTransacao = "entrada" | "saida" | "movimentacao" | "producao_consumo" | "producao_entrada";

export interface Transacao {
  id: string;
  tipo: TipoTransacao;
  produtoId: string;
  setorOrigemId: string | null;
  setorDestinoId: string | null;
  quantidade: number;
  lote?: string;
  referencia?: string;
  observacao?: string;
  usuario: string;
  data: string;
}

export const transacoes: Transacao[] = [
  { id: "t1", tipo: "entrada", produtoId: "p1", setorOrigemId: null, setorDestinoId: "s1", quantidade: 50, lote: "L2024-001", referencia: "NF 12345", usuario: "Carlos Silva", data: "2026-03-03T08:30:00" },
  { id: "t2", tipo: "movimentacao", produtoId: "p1", setorOrigemId: "s1", setorDestinoId: "s2", quantidade: 20, usuario: "Ana Santos", data: "2026-03-03T09:15:00" },
  { id: "t3", tipo: "saida", produtoId: "p7", setorOrigemId: "s3", setorDestinoId: null, quantidade: 3, referencia: "Pedido #4521", usuario: "Pedro Lima", data: "2026-03-03T10:00:00" },
  { id: "t4", tipo: "entrada", produtoId: "p2", setorOrigemId: null, setorDestinoId: "s1", quantidade: 500, referencia: "NF 12350", usuario: "Carlos Silva", data: "2026-03-03T10:30:00" },
  { id: "t5", tipo: "movimentacao", produtoId: "p2", setorOrigemId: "s1", setorDestinoId: "s2", quantidade: 100, usuario: "Ana Santos", data: "2026-03-03T11:00:00" },
  { id: "t6", tipo: "entrada", produtoId: "p3", setorOrigemId: null, setorDestinoId: "s1", quantidade: 10, lote: "L2024-015", usuario: "Carlos Silva", data: "2026-03-02T14:00:00" },
  { id: "t7", tipo: "saida", produtoId: "p4", setorOrigemId: "s3", setorDestinoId: null, quantidade: 50, referencia: "Pedido #4519", usuario: "Pedro Lima", data: "2026-03-02T16:00:00" },
  { id: "t8", tipo: "movimentacao", produtoId: "p6", setorOrigemId: "s1", setorDestinoId: "s5", quantidade: 8, observacao: "Manutenção preventiva", usuario: "Ana Santos", data: "2026-03-01T09:00:00" },
];

// --- ORDENS DE PRODUÇÃO ---
export type StatusOrdem = "aberta" | "em_producao" | "concluida" | "cancelada";

export interface ItemConsumo {
  produtoId: string;
  quantidadePrevista: number;
}

export interface OrdemProducao {
  id: string;
  numero: string;
  produtoFinalId: string;
  quantidade: number;
  setorId: string;
  status: StatusOrdem;
  itensConsumo: ItemConsumo[];
  observacao?: string;
  data: string;
}

export const ordensProducao: OrdemProducao[] = [
  {
    id: "op1", numero: "OP-2026-001", produtoFinalId: "p7", quantidade: 10, setorId: "s2", status: "em_producao",
    itensConsumo: [
      { produtoId: "p1", quantidadePrevista: 20 },
      { produtoId: "p2", quantidadePrevista: 80 },
      { produtoId: "p3", quantidadePrevista: 5 },
    ],
    data: "2026-03-01T08:00:00",
  },
  {
    id: "op2", numero: "OP-2026-002", produtoFinalId: "p7", quantidade: 5, setorId: "s2", status: "aberta",
    itensConsumo: [
      { produtoId: "p1", quantidadePrevista: 10 },
      { produtoId: "p2", quantidadePrevista: 40 },
      { produtoId: "p3", quantidadePrevista: 3 },
    ],
    data: "2026-03-03T07:00:00",
  },
  {
    id: "op3", numero: "OP-2026-003", produtoFinalId: "p10", quantidade: 20, setorId: "s2", status: "aberta",
    itensConsumo: [
      { produtoId: "p6", quantidadePrevista: 20 },
    ],
    observacao: "Urgente - cliente prioritário",
    data: "2026-03-03T11:00:00",
  },
];

// --- USUÁRIOS MOCK ---
export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: "operador" | "supervisor" | "admin";
  ativo: boolean;
}

export const usuarios: Usuario[] = [
  { id: "u1", nome: "Carlos Silva", email: "carlos@empresa.com", perfil: "admin", ativo: true },
  { id: "u2", nome: "Ana Santos", email: "ana@empresa.com", perfil: "supervisor", ativo: true },
  { id: "u3", nome: "Pedro Lima", email: "pedro@empresa.com", perfil: "operador", ativo: true },
  { id: "u4", nome: "Maria Oliveira", email: "maria@empresa.com", perfil: "operador", ativo: true },
  { id: "u5", nome: "João Costa", email: "joao@empresa.com", perfil: "operador", ativo: false },
];

// --- HELPERS ---
export function getProduto(id: string) { return produtos.find(p => p.id === id); }
export function getSetor(id: string) { return setores.find(s => s.id === id); }
export function getCategoria(id: string) { return categorias.find(c => c.id === id); }

export function getEstoqueProdutoSetor(produtoId: string, setorId: string): number {
  return estoque.find(e => e.produtoId === produtoId && e.setorId === setorId)?.quantidade ?? 0;
}

export function getEstoqueTotalProduto(produtoId: string): number {
  return estoque.filter(e => e.produtoId === produtoId).reduce((sum, e) => sum + e.quantidade, 0);
}

export function getStatusEstoque(quantidade: number, minimo: number): "normal" | "critico" | "zerado" {
  if (quantidade === 0) return "zerado";
  if (quantidade <= minimo) return "critico";
  return "normal";
}

export const tipoTransacaoLabel: Record<TipoTransacao, string> = {
  entrada: "Entrada",
  saida: "Saída",
  movimentacao: "Movimentação",
  producao_consumo: "Consumo Produção",
  producao_entrada: "Produção",
};

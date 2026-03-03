import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, ArrowLeftRight, ClipboardList } from "lucide-react";
import {
  produtos, estoque, transacoes, ordensProducao, setores,
  getProduto, getSetor, getEstoqueTotalProduto, tipoTransacaoLabel,
} from "@/data/mockData";

export default function Dashboard() {
  const produtosAtivos = produtos.filter(p => p.ativo).length;

  const itensCriticos = produtos.filter(p => {
    const total = getEstoqueTotalProduto(p.id);
    return p.ativo && total <= p.estoqueMinimo;
  });

  const hoje = "2026-03-03";
  const movimentacoesHoje = transacoes.filter(t => t.data.startsWith(hoje)).length;

  const ordensAbertas = ordensProducao.filter(o => o.status === "aberta" || o.status === "em_producao").length;

  // Resumo por setor
  const resumoSetores = setores.filter(s => s.ativo).map(setor => {
    const itensSetor = estoque.filter(e => e.setorId === setor.id);
    const produtosNoSetor = itensSetor.length;
    const qtdTotal = itensSetor.reduce((sum, e) => sum + e.quantidade, 0);
    const criticos = itensSetor.filter(e => {
      const prod = getProduto(e.produtoId);
      return prod && e.quantidade <= prod.estoqueMinimo;
    }).length;
    return { setor, produtosNoSetor, qtdTotal, criticos };
  });

  const ultimasMovs = [...transacoes].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()).slice(0, 8);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {/* Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produtos Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold">{produtosAtivos}</p></CardContent>
        </Card>

        <Card className="border-critical/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-critical">Estoque Crítico</CardTitle>
            <AlertTriangle className="h-4 w-4 text-critical" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold text-critical">{itensCriticos.length}</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Movimentações Hoje</CardTitle>
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold">{movimentacoesHoje}</p></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ordens Abertas</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><p className="text-3xl font-bold">{ordensAbertas}</p></CardContent>
        </Card>
      </div>

      {/* Tabelas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Estoque por Setor</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setor</TableHead>
                  <TableHead className="text-right">Produtos</TableHead>
                  <TableHead className="text-right">Qtd Total</TableHead>
                  <TableHead className="text-right">Críticos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resumoSetores.map(r => (
                  <TableRow key={r.setor.id}>
                    <TableCell className="font-medium">{r.setor.nome}</TableCell>
                    <TableCell className="text-right">{r.produtosNoSetor}</TableCell>
                    <TableCell className="text-right">{r.qtdTotal}</TableCell>
                    <TableCell className="text-right">
                      {r.criticos > 0 ? (
                        <Badge variant="destructive" className="text-xs">{r.criticos}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Últimas Movimentações</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Qtd</TableHead>
                  <TableHead>Origem → Destino</TableHead>
                  <TableHead>Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ultimasMovs.map(t => {
                  const prod = getProduto(t.produtoId);
                  const origem = t.setorOrigemId ? getSetor(t.setorOrigemId)?.nome : "—";
                  const destino = t.setorDestinoId ? getSetor(t.setorDestinoId)?.nome : "—";
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium text-sm">{prod?.nome}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">{tipoTransacaoLabel[t.tipo]}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{t.quantidade}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{origem} → {destino}</TableCell>
                      <TableCell className="text-sm">{t.usuario}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

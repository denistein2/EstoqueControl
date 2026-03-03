import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { estoque, produtos, setores, getProduto, getSetor, getStatusEstoque } from "@/data/mockData";

export default function Stock() {
  const [setorFilter, setSetorFilter] = useState("todos");
  const [search, setSearch] = useState("");

  const items = estoque
    .map(e => {
      const prod = getProduto(e.produtoId)!;
      const setor = getSetor(e.setorId)!;
      const status = getStatusEstoque(e.quantidade, prod.estoqueMinimo);
      return { ...e, prod, setor, status };
    })
    .filter(e => {
      if (setorFilter !== "todos" && e.setorId !== setorFilter) return false;
      if (search && !e.prod.nome.toLowerCase().includes(search.toLowerCase()) && !e.prod.sku.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

  const statusConfig = {
    normal: { label: "Normal", className: "bg-success text-success-foreground" },
    critico: { label: "Crítico", className: "bg-warning text-warning-foreground" },
    zerado: { label: "Zerado", className: "bg-critical text-critical-foreground" },
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Estoque Atual</h1>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar produto..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={setorFilter} onValueChange={setSetorFilter}>
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os setores</SelectItem>
                {setores.filter(s => s.ativo).map(s => <SelectItem key={s.id} value={s.id}>{s.nome}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(e => {
                const cfg = statusConfig[e.status];
                return (
                  <TableRow key={`${e.produtoId}-${e.setorId}`}>
                    <TableCell className="font-medium">{e.prod.nome}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{e.prod.sku}</TableCell>
                    <TableCell>{e.setor.nome}</TableCell>
                    <TableCell className="text-right font-semibold">{e.quantidade}</TableCell>
                    <TableCell>{e.prod.unidade}</TableCell>
                    <TableCell>
                      <Badge className={cfg.className}>{cfg.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

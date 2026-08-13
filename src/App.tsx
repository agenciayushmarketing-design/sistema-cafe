import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import Dashboard from "@/pages/Dashboard"
import Lavoura from "@/pages/Lavoura"
import Colheita from "@/pages/Colheita"
import EstoqueCafe from "@/pages/EstoqueCafe"
import Vendas from "@/pages/Vendas"
import DecisaoVenda from "@/pages/DecisaoVenda"
import Insumos from "@/pages/Insumos"
import Financeiro from "@/pages/Financeiro"
import Equipe from "@/pages/Equipe"
import Aplicacoes from "@/pages/Aplicacoes"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lavoura" element={<Lavoura />} />
          <Route path="/colheita" element={<Colheita />} />
          <Route path="/estoque-cafe" element={<EstoqueCafe />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/decisao-venda" element={<DecisaoVenda />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/aplicacoes" element={<Aplicacoes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

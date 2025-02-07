import { useEffect, useState } from "react";
import { useLoja } from "@/context/LojaContext";
import { fetchLojaData } from "@/services/lojaService";
import { fetchPedidoData, fetchTodosPedidos } from "@/services/pedidoService";
import { Loading } from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MapPin, Clock, Package, TrendingUp, Users, DollarSign, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Pedido } from "@/types/Pedido";

const StatusColors = {
  'PENDENTE': '#FFA500',
  'PREPARANDO': '#4169E1',
  'AGUARDANDO_ENTREGADOR': '#9370DB',
  'A_CAMINHO': '#FF69B4',
  'ENTREGUE': '#228B22',
  'CANCELADO': '#FF0000',
};

export default function Dashboard() {
  const { setLoja, loja } = useLoja();
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<{
    totalPedidosHoje: number;
    pedidosEntregues: number;
    faturamentoHoje: number;
    clientesAtivos: number;
    recentOrders: Pedido[];
    salesData: { date: string; vendas: number }[];
  }>({
    totalPedidosHoje: 0,
    pedidosEntregues: 0,
    faturamentoHoje: 0,
    clientesAtivos: 0,
    recentOrders: [],
    salesData: [],
  });

  useEffect(() => {
    const inicializarDashboard = async () => {
      try {
        if (!loja) {
          const lojaData = await fetchLojaData();
          setLoja(lojaData);
        }

        const [allOrders, entregues] = await Promise.all([
          fetchTodosPedidos(),
          fetchPedidoData("ENTREGUE", 0),
        ]);

        const today = new Date().toLocaleDateString("pt-BR");
        const pedidosHoje = allOrders.content.filter((order: { dataPedido: string }) => {
          const orderDate = order.dataPedido.split(" ")[0];
          return orderDate === today;
        });

        const faturamentoHoje = pedidosHoje.reduce(
          (acc: any, curr: { valorTotal: any }) => acc + curr.valorTotal,
          0,
        );

        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toLocaleDateString("pt-BR");
        }).reverse();

        const salesData = last7Days.map((date) => ({
          date,
          vendas: allOrders.content.filter((order: { dataPedido: string }) => {
            const orderDate = order.dataPedido.split(" ")[0];
            return orderDate === date;
          }).length,
        }));

        const uniqueUserIds = new Set(
          allOrders.content.map((order: { criadoPor: { id: any } }) => order.criadoPor.id),
        );

        setDashboardData({
          totalPedidosHoje: pedidosHoje.length,
          pedidosEntregues: entregues?.totalElements || 0,
          faturamentoHoje,
          clientesAtivos: uniqueUserIds.size,
          recentOrders: allOrders?.content || [],
          salesData,
        });

        setLastUpdate(new Date());
      } catch (error: any) {
        toast.error("Erro ao carregar dados do dashboard: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    inicializarDashboard();

    const interval = setInterval(inicializarDashboard, 15000);

    return () => clearInterval(interval);
  }, [loja, setLoja]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao painel de controle da sua loja</p>
        </div>
        <div className="flex gap-4 justify-between">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Última atualização</p>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-600">{lastUpdate.toLocaleTimeString("pt-BR")}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">Data Atual</p>
            <p className="text-lg font-semibold">{new Date().toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        {loja && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Informações da Loja
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg">{loja.nome}</h3>
                <p className="text-gray-600">{loja.descricao}</p>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {loja.rua}, {loja.numero} - {loja.bairro}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {loja.horarioAbertura || "Não informado"} -{" "}
                    {loja.horarioFechamento || "Não informado"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Package className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                      <p className="text-2xl font-bold">{dashboardData.totalPedidosHoje}</p>
                      <p className="text-sm text-gray-600">Pedidos Hoje</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                      <p className="text-2xl font-bold">
                        R$ {dashboardData.faturamentoHoje.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Faturamento Hoje</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                      <p className="text-2xl font-bold">{dashboardData.clientesAtivos}</p>
                      <p className="text-sm text-gray-600">Clientes Ativos</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                      <p className="text-2xl font-bold">{dashboardData.pedidosEntregues}</p>
                      <p className="text-sm text-gray-600">Pedidos Entregues</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Vendas dos Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-l-4"
                  style={{ borderLeftColor: StatusColors[order.status as keyof typeof StatusColors] }}
                >
                  <div>
                    <p className="font-semibold">Pedido #{order.id}</p>
                    <p className="text-sm" style={{ color: StatusColors[order.status as keyof typeof StatusColors] }}>
                      Status: {order.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cliente: {order.criadoPor.firstName} {order.criadoPor.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {order.valorTotal.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      {order.dataPedido}
                    </p>
                  </div>
                </div>
              ))}
              {dashboardData.recentOrders.length === 0 && (
                <p className="text-center text-gray-500 py-4">Nenhum pedido recente</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import Dashboard from "views/Dashboard.js";
import Abastecimento from "views/abastecimento/Abastecimento.js";
import Bombeiros from "views/bombeiro/Bombeiros.js";
import GrupoBonus from "views/bonus/GrupoBonus.js";
import NovoGrupoBonus from "views/bonus/NovoGrupoBonus.js";
import NovoBombeiro from "views/bombeiro/NovoBombeiro.js"
import Clientes from "views/cliente/Clientes.js";
import Login from "views/Login.js";
import PerfilCliente from "views/cliente/PerfilCliente";
import NovoCliente from "views/cliente/NovoCliente";
import Produtos from "views/produto/Produtos";
import Pos from "views/pos/Pos";
import NovoPos from "views/pos/NovoPos";
import NovoProduto from "views/produto/NovoProduto";
import requireAuth from "variables/requireAuth";
import NovoCartao from "views/cartao/NovoCartao";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: "users_single-02",
    component: requireAuth(Clientes),
    layout: "/admin",
  },
  {
    path: "/abastecimentos",
    name: "Abastecimentos",
    icon: "shopping_cart-simple",
    component: Abastecimento,
    layout: "/admin",
  },
  
  {
    path: "/bombeiros",
    name: "Bombeiros",
    icon: "design-2_ruler-pencil",
    component: requireAuth(Bombeiros),
    layout: "/admin",
  },
  {
    path: "/produtos",
    name: "Produtos",
    icon: "design_bullet-list-67",
    component: requireAuth(Produtos),
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "Pos",
    icon: "shopping_credit-card",
    component: requireAuth(Pos),
    layout: "/admin",
  },
  {
    path: "/bonus",
    name: "Grupo Bonus",
    icon: "shopping_credit-card",
    component: requireAuth(GrupoBonus),
    layout: "/admin",
  },
];

var allRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/abastecimentos",
    name: "Pagamentos Bonus",
    icon: "design_image",
    component: Abastecimento,
    layout: "/admin",
  },
  {
    path: "/clientes",
    name: "Clientes",
    icon: "users_single-02",
    component: requireAuth(Clientes),
    layout: "/admin",
  },
  {
    path: "/bombeiros",
    name: "Bombeiros",
    icon: "design-2_ruler-pencil",
    component: requireAuth(Bombeiros),
    layout: "/admin",
  },
  {
    path: "/produtos",
    name: "Produtos",
    icon: "design_bullet-list-67",
    component: requireAuth(Produtos),
    layout: "/admin",
  },
  {
    path: "/pos",
    name: "Pos",
    icon: "design-2_ruler-pencil",
    component: requireAuth(Pos),
    layout: "/admin",
  },
  {
    path: "/bonus",
    name: "Grupo Bonus",
    icon: "shopping_credit-card",
    component: requireAuth(GrupoBonus),
    layout: "/admin",
  },
  {
    path: "/novoproduto/:productId",
    name: "Novo Produto",
    icon: "design-2_ruler-pencil",
    component: requireAuth(NovoProduto),
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "design-2_ruler-pencil",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/perfilcliente/:companyId",
    name: "Lista de Cartoes",
    icon: "design-2_ruler-pencil",
    component: requireAuth(PerfilCliente),
    layout: "/admin",
  },
  {
    path: "/novocliente/:companyId",
    name: "Novo Cliente",
    icon: "design-2_ruler-pencil",
    component: requireAuth(NovoCliente),
    layout: "/admin",
  },
  {
    path: "/novogrupobonus/:grupoBonusId",
    name: "Novo Bonus",
    icon: "design-2_ruler-pencil",
    component: requireAuth(NovoGrupoBonus),
    layout: "/admin",
  },
  {
    path: "/novobombeiro/:username",
    name: "Novo Bombeiro",
    icon: "design-2_ruler-pencil",
    component: requireAuth(NovoBombeiro),
    layout: "/admin",
  },
  {
    path: "/novopos/:posId",
    name: "Novo Pos",
    icon: "shopping_credit-card",
    component: requireAuth(NovoPos),
    layout: "/admin",
  },
  {
    path: "/novocartao/:cardId/:companyId",
    name: "Novo Pos",
    icon: "shopping_credit-card",
    component: requireAuth(NovoCartao),
    layout: "/admin",
  },
];
export {allRoutes, dashRoutes };

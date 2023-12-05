export const userMenu = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },
  {
    id: 2,
    name: "Consultas Marcadas",
    path: "/appointments",
    icon: "fa-solid fa-list",
  },
  {
    id: 3,
    name: "Marcar consulta",
    path: "/apply-doctor",
    icon: "fa-solid fa-user-doctor",
  },
  {
    id: 4,
    name: "Perfil",
    path: "/doctor/profile/:id",
    icon: "fa-solid fa-user",
  },
];

// admin menu
export const adminMenu = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house",
  },

  {
    id: 2,
    name: "Médicos",
    path: "/admin/doctors",
    icon: "fa-solid fa-user-doctor",
  },
  {
    id: 3,
    name: "Usúarios",
    path: "/admin/users",
    icon: "fa-solid fa-user",
  },
];

// ============================================================
// CAPA DE CONTROLADORES - Heladería El Iglú
// Sin try/catch: los errores viajan al middleware centralizado
// (estándar de la cátedra desde la Clase 12).
// ============================================================
const pedidosService = require("../services/pedidos.service");

const TAMANIOS_VALIDOS = ["Cuarto", "Medio", "Kilo"];

// GET /api/sabores
async function listarSabores(req, res) {
  const sabores = await pedidosService.listarSabores();
  res.json(sabores);
}

// GET /api/pedidos
async function listarPedidos(req, res) {
  const pedidos = await pedidosService.listarPedidos();
  res.json(pedidos);
}

// POST /api/pedidos
async function crearPedido(req, res) {
  const { cliente, tamanio, sabores } = req.body;

  if (!cliente || cliente.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre del cliente es obligatorio." });
  }
  if (!TAMANIOS_VALIDOS.includes(tamanio)) {
    return res.status(400).json({ mensaje: "El tamaño debe ser Cuarto, Medio o Kilo." });
  }
  if (!Array.isArray(sabores) || sabores.length < 1 || sabores.length > 3) {
    return res.status(400).json({ mensaje: "Debe elegir entre 1 y 3 sabores." });
  }
  if (sabores.some(s => Number.isNaN(Number(s)))) {
    return res.status(400).json({ mensaje: "Los sabores deben ser identificadores numéricos." });
  }

  const idPedido = await pedidosService.crear({
    cliente: cliente.trim(),
    tamanio,
    sabores: sabores.map(Number)
  });

  res.status(201).json({ idPedido, mensaje: `Pedido N° ${idPedido} registrado.` });
}

// PUT /api/pedidos/:id/avanzar
async function avanzarPedido(req, res) {
  const idPedido = Number(req.params.id);

  if (Number.isNaN(idPedido)) {
    return res.status(400).json({ mensaje: "El id del pedido debe ser numérico." });
  }

  await pedidosService.avanzar(idPedido);
  res.json({ mensaje: `Pedido N° ${idPedido} avanzó de estado.` });
}

module.exports = { listarSabores, listarPedidos, crearPedido, avanzarPedido };

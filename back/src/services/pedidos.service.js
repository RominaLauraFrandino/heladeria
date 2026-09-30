// ============================================================
// CAPA DE SERVICIOS - Heladería El Iglú
// El servicio arma el texto '1,3,7' que el SP separa con
// STRING_SPLIT. Sigue siendo UN parámetro (nunca concatenación
// dentro del SQL: el texto viaja como @Sabores).
// ============================================================
const { sql, getConnection } = require("../config/db");

async function listarSabores() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarSabores");
  return resultado.recordset;
}

async function listarPedidos() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarPedidos");
  return resultado.recordset;
}

async function crear({ cliente, tamanio, sabores }) {
  const pool = await getConnection();

  const resultado = await pool.request()
    .input("Cliente", sql.NVarChar(80), cliente)
    .input("Tamanio", sql.NVarChar(10), tamanio)
    .input("Sabores", sql.NVarChar(50), sabores.join(","))
    .output("IdPedido", sql.Int)
    .execute("usp_CrearPedido");

  return resultado.output.IdPedido;
}

async function avanzar(idPedido) {
  const pool = await getConnection();
  await pool.request()
    .input("IdPedido", sql.Int, idPedido)
    .execute("usp_AvanzarPedido");
}

module.exports = { listarSabores, listarPedidos, crear, avanzar };

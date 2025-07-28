const express = require("express");
const controller = require("../controllers/ClienteController");
const middlewares = require("../middlewares/middlewares");

const router = express.Router();

router.post("/", middlewares.checkCPF, controller.criar);
router.get("/", controller.listar);
router.get("/com-mais-pedidos", controller.clientesComMaisPedidos);
router.get("/com-mais-gastos", controller.clientesComMaisGastos);
router.get("/:id", controller.listarPorID);
router.put("/:id", middlewares.checkCPF, controller.atualizar);
router.delete("/:id", controller.remover);

module.exports = router;

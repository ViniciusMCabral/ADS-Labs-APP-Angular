const service = require("../services/PedidoService");

async function criar(req, res) {
    try {
        const pedidoCriado = await service.criar(req.body);

        return res.status(201).json({
            message: "Novo pedido criado",
            pedido: pedidoCriado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listar(req, res) {
    try {
        const pedidos = await service.listar();
        
        return res.json(pedidos);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listarPorID(req, res) {
    try {
        const { id } = req.params;
        const pedido = await service.listarPorID(id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.json(pedido);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const pedidoAtualizado  = await service.atualizar(id, req.body);

        if (!pedidoAtualizado) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.json({
            message: "Pedido atualizado",
            pedido: pedidoAtualizado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function remover(req, res) {
    try {
        const { id } = req.params;
        const pedidoRemovido = await service.remover(id);

        if (!pedidoRemovido) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        return res.status(200).json({ message: "Pedido removido com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { criar, listar, listarPorID, atualizar, remover };
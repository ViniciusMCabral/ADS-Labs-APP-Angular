const service = require("../services/PratoService");

async function criar(req, res) {
    try {
        const pratoCriado = await service.criar(req.body);
        return res.status(201).json({
            message: "Novo prato criado",
            prato: pratoCriado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listar(req, res) {
    try {
        const pratos = await service.listar(); 
        
        return res.json(pratos); 
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function listarPorID(req, res) {
    try {
        const { id } = req.params;
        const prato = await service.listarPorID(id);

        if (!prato) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }

        return res.json(prato);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
}

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const pratoAtualizado = await service.atualizar(id, req.body);

        if (!pratoAtualizado) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }

        return res.json({
            message: "Prato atualizado",
            prato: pratoAtualizado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function remover(req, res) {
    try {
        const { id } = req.params;
        const pratoRemovido = await service.remover(id);

        if (!pratoRemovido) {
            return res.status(404).json({ message: "Prato não encontrado" });
        }

        return res.status(200).json({ message: "Prato removido com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function pratosOrdenadosPorQuantidade(req, res) {
    try {
        const pratos = await service.pratosOrdenadosPorQuantidade();
        return res.json({ dados: pratos });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { criar, listar, listarPorID, atualizar, remover, pratosOrdenadosPorQuantidade };
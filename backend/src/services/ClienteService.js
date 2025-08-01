const { Cliente, Pedido, Prato } = require("../database/database");

async function criar(dados) {
    const cliente = await Cliente.create(dados);
    return cliente;
}

async function listar() {
    return await Cliente.findAll();
}

async function listarPorID(id) {
    const cliente = await Cliente.findByPk(id);
    return cliente;
}

async function atualizar(id, dados) {
    const cliente = await Cliente.findByPk(id);
    
    if (!cliente) {
        return null;
    }

    await cliente.update(dados);
    return cliente;
}

async function remover(id) {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
        return null;
    }

    await cliente.destroy();
    return cliente;
}

async function clientesComMaisPedidos() {
    console.log("\n--- [DEBUG] Iniciando Relatório: Clientes com Mais Pedidos ---");
    const clientes = await Cliente.findAll({
        include: [{ model: Pedido, as: 'pedidos' }] 
    });

    console.log("[DEBUG] Dados brutos recebidos:", JSON.stringify(clientes, null, 2));

    const clientesComPedidos = clientes.filter(cliente => (cliente.pedidos || []).length > 0);
    console.log(`[DEBUG] Clientes encontrados com pedidos: ${clientesComPedidos.length}`);

    const resultado = clientesComPedidos.map(cliente => ({
        id: cliente.id,
        nome: cliente.nome,
        totalPedidos: (cliente.pedidos || []).length 
    }));
    console.log("[DEBUG] Resultado final:", resultado);

    return resultado
        .sort((a, b) => b.totalPedidos - a.totalPedidos)
        .slice(0, 5);
}

async function clientesComMaisGastos() {
    const clientes = await Cliente.findAll({
        include: [{
            model: Pedido,
            as: "pedidos", 
            include: [{
                model: Prato,
                as: "pratos",
                through: { attributes: ["quantidade", "preco"] }
            }]
        }]
    });

    const resultado = clientes.map(cliente => {
        let totalGasto = 0;

        (cliente.pedidos || []).forEach(pedido => {
            (pedido.pratos || []).forEach(prato => {
                const preco = parseFloat(prato.PedidoPrato?.preco || 0);
                const quantidade = parseInt(prato.PedidoPrato?.quantidade || 0, 10);
                totalGasto += preco * quantidade;
            });
        });

        return {
            id: cliente.id,
            nome: cliente.nome,
            totalGasto
        };
    });

    const clientesComGastos = resultado.filter(c => c.totalGasto > 0);

    return clientesComGastos
        .sort((a, b) => b.totalGasto - a.totalGasto)
        .slice(0, 5);
}


module.exports = { criar, listar, listarPorID, atualizar, remover, clientesComMaisPedidos, clientesComMaisGastos };
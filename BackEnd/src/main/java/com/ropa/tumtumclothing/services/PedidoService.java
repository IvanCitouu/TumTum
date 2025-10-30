package com.ropa.tumtumclothing.services;

import java.util.List;
import java.util.Optional;

import com.ropa.tumtumclothing.entities.Pedido;

public interface PedidoService {

    List<Pedido> findByAll();

    Optional<Pedido> findById(Long id);

    Pedido save(Pedido unPedido);

    Optional<Pedido> delete(Pedido unPedido);
}

package com.ropa.tumtumclothing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ropa.tumtumclothing.entities.Pedido;
import com.ropa.tumtumclothing.repository.PedidoRepository;



@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Pedido> findByAll() {
        return (List<Pedido>)repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pedido> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Pedido save(Pedido unPedido) {
        return repository.save(unPedido);
    };

    @Override
    @Transactional
    public Optional<Pedido> delete(Pedido unPedido){
        Optional<Pedido> pedidoOptional = repository.findById(unPedido.getIdPedido());
        pedidoOptional.ifPresent(productoDB->{
            repository.delete(unPedido);
        });
        return pedidoOptional;
    }



}

    



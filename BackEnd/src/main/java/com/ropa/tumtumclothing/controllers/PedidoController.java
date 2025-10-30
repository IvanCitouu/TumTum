package com.ropa.tumtumclothing.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ropa.tumtumclothing.entities.Pedido;
import com.ropa.tumtumclothing.services.PedidoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService service;

    @GetMapping
    public List<Pedido> List(){
        return service.findByAll();
    }

    @GetMapping("/{idPedido}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id){
        Optional<Pedido> pedidoOptional = service.findById(id);
        if(pedidoOptional.isPresent()){
            return ResponseEntity.ok(pedidoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Pedido> crear(@RequestBody Pedido unPedido){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unPedido));
    }

    @PutMapping("/{idPedido}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Pedido unPedido){
        Optional<Pedido> pedidoOptional = service.findById(id);
        if(pedidoOptional.isPresent()){
            Pedido pedidoExistente = pedidoOptional.get();
            pedidoExistente.setCorreoClientePedido(unPedido.getCorreoClientePedido());
            pedidoExistente.setDetalles(unPedido.getDetalles());
            pedidoExistente.setEstadoPedido(unPedido.getEstadoPedido());
            pedidoExistente.setFechaCreacionPedido(unPedido.getFechaCreacionPedido());
            pedidoExistente.setIdPedido(unPedido.getIdPedido());
            pedidoExistente.setNombreClientePedido(unPedido.getNombreClientePedido());
            pedidoExistente.setTotalPedido(unPedido.getTotalPedido());
            Pedido pedidoModificado = service.save(unPedido);
            return ResponseEntity.ok(pedidoModificado);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{idPedido}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Pedido unPedido = new Pedido();
        unPedido.setIdPedido(id);
        Optional<Pedido> pedidoOptional = service.delete(unPedido);
        if(pedidoOptional.isPresent()){
            return ResponseEntity.ok(pedidoOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    
    

}

package com.ropa.tumtumclothing.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ropa.tumtumclothing.entities.Producto;
import com.ropa.tumtumclothing.services.ProductoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<Producto> List(){
        return service.findByAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id){
        Optional<Producto> prodOptional = service.findById(id);
        if (prodOptional.isPresent()){
            return ResponseEntity.ok(prodOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto unProducto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unProducto));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Producto unProducto){
        Optional<Producto> prodOptional = service.findById(id);
        if (prodOptional.isPresent()){
            Producto prodExistente = prodOptional.get();
            prodExistente.setNombre(unProducto.getNombre());
            prodExistente.setCategoria(unProducto.getCategoria());
            prodExistente.setDescripcion(unProducto.getDescripcion());
            prodExistente.setEstado(unProducto.getEstado());
            prodExistente.setFechaCreacion(unProducto.getFechaCreacion());
            prodExistente.setPrecio(unProducto.getPrecio());
            prodExistente.setStock(unProducto.getStock());
            prodExistente.setImgUrl(unProducto.getImgUrl());
            Producto prodModificado = service.save(prodExistente);
            return ResponseEntity.ok(prodModificado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Producto unProducto = new Producto();
        unProducto.setId(id);
        Optional<Producto> prodOptional = service.delete(unProducto);
        if(prodOptional.isPresent()){
            return ResponseEntity.ok(prodOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
}


package com.ropa.tumtumclothing.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ropa.tumtumclothing.entities.Usuario;
import com.ropa.tumtumclothing.services.UsuarioService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public List<Usuario> List(){
        return service.findByAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> verDetalle(@PathVariable Long id){
        Optional<Usuario> usuarioOptional = service.findById(id);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<Usuario> crear(@RequestBody Usuario unUsuario){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(unUsuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id, @RequestBody Usuario unUsuario){
        Optional<Usuario> usOptional = service.findById(id);
        if(usOptional.isPresent()){
            Usuario usExistente = usOptional.get();
            usExistente.setApellidos(unUsuario.getApellidos());
            usExistente.setComuna(unUsuario.getComuna());
            usExistente.setContrasenia(unUsuario.getContrasenia());
            usExistente.setCorreo(unUsuario.getCorreo());
            usExistente.setDireccion(unUsuario.getDireccion());
            usExistente.setEstado(unUsuario.getEstado());
            usExistente.setFechaCreacion(unUsuario.getFechaCreacion());
            usExistente.setNacimiento(unUsuario.getNacimiento());
            usExistente.setNombre(unUsuario.getNombre());
            usExistente.setRegion(unUsuario.getRegion());
            usExistente.setRol(unUsuario.getRegion());
            usExistente.setRut(unUsuario.getRut());
            Usuario usModificado = service.save(usExistente);
            return ResponseEntity.ok(usModificado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        Usuario unUsuario = new Usuario();
        unUsuario.setId(id);
        Optional<Usuario> usuarioOptional = service.delete(unUsuario);
        if(usuarioOptional.isPresent()){
            return ResponseEntity.ok(usuarioOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
}

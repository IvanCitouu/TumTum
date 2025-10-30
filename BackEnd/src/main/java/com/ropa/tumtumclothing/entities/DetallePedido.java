package com.ropa.tumtumclothing.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;


    @ManyToOne
    @JoinColumn(name = "idProducto") 
    private Producto productoDetalle;


    @ManyToOne
    @JoinColumn(name = "idPedido") 
    private Pedido pedidoDetalle;
    

    
    @Column(nullable = false)
    private Integer cantidadDetalle;
    

    public DetallePedido() {
    }

    public DetallePedido(Producto productoDetalle, Pedido pedidoDetalle, Integer cantidadDetalle) {
        this.productoDetalle = productoDetalle;
        this.pedidoDetalle = pedidoDetalle;
        this.cantidadDetalle = cantidadDetalle;
    }

    public DetallePedido(Long idDetalle, Producto productoIdDetalle, Pedido pedidoIdDetalle, Integer cantidadDetalle) {
        this.idDetalle = idDetalle;
        this.productoDetalle = productoIdDetalle;
        this.pedidoDetalle = pedidoIdDetalle;
        this.cantidadDetalle = cantidadDetalle;
    }

    public Long getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(Long idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Producto getProductoDetalle() {
        return productoDetalle;
    }

    public void setProductoDetalle(Producto productoDetalle) {
        this.productoDetalle = productoDetalle;
    }

    public Pedido getPedidoDetalle() {
        return pedidoDetalle;
    }

    public void setPedidoDetalle(Pedido pedidoDetalle) {
        this.pedidoDetalle = pedidoDetalle;
    }

    public Integer getCantidadDetalle() {
        return cantidadDetalle;
    }

    public void setCantidadDetalle(Integer cantidadDetalle) {
        this.cantidadDetalle = cantidadDetalle;
    }

    
}

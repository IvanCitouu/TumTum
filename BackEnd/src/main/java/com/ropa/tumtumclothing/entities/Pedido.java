package com.ropa.tumtumclothing.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "pedidos")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPedido;

    private String correoClientePedido, EstadoPedido, nombreClientePedido;
    private int totalPedido;

    @CreationTimestamp
    @Column(name = "fecha_creacion", updatable = false, nullable = false)
    private LocalDateTime fechaCreacionPedido;

    @OneToMany(mappedBy = "pedidoIdDetalle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();

    public Pedido() {
    }

    public Pedido(long idPedido, String correoClientePedido, String estadoPedido, String nombreClientePedido,
            int totalPedido, LocalDateTime fechaCreacionPedido, List<DetallePedido> productos) {
        this.idPedido = idPedido;
        this.correoClientePedido = correoClientePedido;
        EstadoPedido = estadoPedido;
        this.nombreClientePedido = nombreClientePedido;
        this.totalPedido = totalPedido;
        this.fechaCreacionPedido = fechaCreacionPedido;
        this.detalles = productos;
    }

    public void agregarProducto(Producto producto, int cantidad) {
        for (DetallePedido detalle : this.detalles) {
            if (detalle.getProductoDetalle().getIdProducto().equals(producto.getIdProducto())) {
                int cantidadActual = detalle.getCantidadDetalle();
                detalle.setCantidadDetalle(cantidadActual + cantidad);
                return;
            }
        }
        DetallePedido nuevoDetalle = new DetallePedido( producto, this, cantidad);
        this.detalles.add(nuevoDetalle);
    }

    public long getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(long idPedido) {
        this.idPedido = idPedido;
    }

    public String getCorreoClientePedido() {
        return correoClientePedido;
    }

    public void setCorreoClientePedido(String correoClientePedido) {
        this.correoClientePedido = correoClientePedido;
    }

    public String getEstadoPedido() {
        return EstadoPedido;
    }

    public void setEstadoPedido(String estadoPedido) {
        EstadoPedido = estadoPedido;
    }

    public String getNombreClientePedido() {
        return nombreClientePedido;
    }

    public void setNombreClientePedido(String nombreClientePedido) {
        this.nombreClientePedido = nombreClientePedido;
    }

    public int getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(int totalPedido) {
        this.totalPedido = totalPedido;
    }

    public LocalDateTime getFechaCreacionPedido() {
        return fechaCreacionPedido;
    }

    public void setFechaCreacionPedido(LocalDateTime fechaCreacionPedido) {
        this.fechaCreacionPedido = fechaCreacionPedido;
    }

    public List<DetallePedido> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallePedido> detalles) {
        this.detalles = detalles;
    }

    

}

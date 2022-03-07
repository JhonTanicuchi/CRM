package CRM4RTONOCTURNOA.CRM.controller;

import CRM4RTONOCTURNOA.CRM.entity.Seguimiento;
import CRM4RTONOCTURNOA.CRM.service.SeguimientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin({"http://localhost:4200"})
@RequestMapping("api/seguimiento")
public class SeguimientoController {

    @Autowired
    SeguimientoService seguimientoService;

    //allFind
    @PreAuthorize("hasAuthority('LEER_SEGUIMIENTO')")
    @GetMapping("/allSeguimiento")
    public List<Seguimiento> findAll(){
        return  seguimientoService.findAllSeguimientos();
    }

    //findById
    @PreAuthorize("hasAuthority('LEER_SEGUIMIENTO')")
    @GetMapping("/findById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Seguimiento findById(@PathVariable Long id){
        return seguimientoService.findById(id);
    }

    //create
    @PreAuthorize("hasAuthority('CREAR_SEGUIMIENTO')")
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Seguimiento createSeguimiento(@RequestBody Seguimiento seguimiento){
        return seguimientoService.saveSeguimiento(seguimiento);
    }

    //Update
    @PreAuthorize("hasAuthority('ACTUALIZAR_SEGUIMIENTO')")
    @PutMapping("/put")
    @ResponseStatus(HttpStatus.OK)
    public Seguimiento updateSeguimiento(@RequestBody Seguimiento seguimiento){
        return seguimientoService.updateSeguimiento(seguimiento);
    }

    //deleteLogic
    @PreAuthorize("hasAuthority('ELIMINAR_SEGUIMIENTO')")
    @PutMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Seguimiento deleteSeguimiento(@PathVariable Long id){
        Seguimiento seguimientoActual = seguimientoService.findById(id);
        seguimientoActual.setEstado(false);
        return seguimientoService.updateSeguimiento(seguimientoActual);
    }

    //deleteFisic
    @PreAuthorize("hasAuthority('ELIMINAR_SEGUIMIENTO')")
    @DeleteMapping("/deleteById/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteById(@PathVariable Long id){
        seguimientoService.deleteByIdSeguimiento(id);
    }
}

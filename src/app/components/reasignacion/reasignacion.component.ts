import { Component,ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import { Ticket } from '../model/ticket.model';
import { CustomerService } from '../../service/CustomerService';
import { RespuestaDto } from '../model/respuestaDto';
import { AlertaComponent } from '../../util/alerta.component';
import { authGuardService } from '../../service/auth-guard.service';
@Component({
  selector: 'app-reasignacion',
  templateUrl: './reasignacion.component.html',
  styleUrls: ['./reasignacion.component.css']
})
export class ReasignacionComponent {
  @ViewChild(AlertaComponent, { static: false }) mensajeAlerta!: AlertaComponent;
  token : string;
  tickets !: Ticket[];
  clonedProducts: { [s: string]: Ticket; } = {};
  constructor(
    private customerService: CustomerService,
    public _authGuardService: authGuardService
    ) {
      this.token = this._authGuardService.getToken();
    }

  
  ngOnInit() {
    this.obtenerTickets();
  }
//
obtenerTickets(){
  console.log("Token",this.token);
    this.customerService.getTicket(this.token).subscribe({
      next : (resp: RespuestaDto)  => {
        console.log("Obtener tickets",resp);
        let respuestaDto = <RespuestaDto>resp;
        if (respuestaDto.ok) {
          this.tickets = resp.addenda;
        } else {

        } // if
      },
        error : (error) => {
          let mensaje = <any>error;
          this.mensajeAlerta.alerta("AVISO", "", mensaje.message, "");
        }
      });

  }
    onRowEditInit(product: Ticket) {
        this.clonedProducts[product.idfolios] = {...product};
}
}


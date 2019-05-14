import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Cadastro } from '../modelos/cadastro.interface';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  todos: Cadastro[];
  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getTodos().subscribe(res => {this.todos = res });
}

}


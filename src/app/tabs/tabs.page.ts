import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Cadastro } from '../modelos/cadastro.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tudo: Cadastro = {
    nome: '',
    email:'',
    senha:'',
    sexo:'',
    datanasc:'',
    cpf:'',
    rg:'',
    cep:'',
    num:'',
    endereco:'',
    estado:'',
    cidade:'',
    nomecond:'',
    bloco:'',
    numapart:''
  };
  todoId = null;

  constructor(private route:ActivatedRoute, private nav: NavController,
    private usuariosService: UsuariosService, private loadingController: LoadingController
    ){ }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId){
      this.carregarTudo();
    }
  }

    async carregarTudo(){
      const loading = await this.loadingController.create({
        message: 'Carregando...'
      });
      await loading.present();
      this.usuariosService.getTudo(this.todoId).subscribe(res => {loading.dismiss();
      this.tudo = res;
      });
    }
}

import { Component, OnInit } from '@angular/core';
import { Cadastro } from '../modelos/cadastro.interface';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
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

    async Salvar(){
      const loading = await this.loadingController.create({
        message: 'Carregando...'
      });
      await loading.present();

      if(this.todoId){
         this.usuariosService.update(this.tudo,this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/usuarios');

        });
      }     
    }
    onRemove(todoId:string){
      this.usuariosService.deleteTudo(todoId);
    }
}

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Cadastro } from '../modelos/cadastro.interface';
import { AngularFirestore , AngularFirestoreCollection} from 'angularfire2/firestore';
import { UsuariosService } from '../services/usuarios.service';
import { strict } from 'assert';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private coletarTodos: AngularFirestoreCollection<Cadastro>;

  
  email: string;
  senha: string;

  constructor(private authService: AuthService, private usuariosService: UsuariosService,
    private route:ActivatedRoute, private loadingController: LoadingController) {
    }
    tudo: Cadastro = {
    nome:'',
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
   
  onSubmitLogin(){
    this.authService.login(this.email, this.senha);
    this.usuariosService.getTudo(this.todoId);
    console.log(this.todoId.value)
  }
 
  }
  
  




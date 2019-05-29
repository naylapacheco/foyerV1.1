import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, ToastController } from '@ionic/angular';

import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../modelos/cadastro.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  todo: Cadastro = {
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
  }

  todoId = null;

  constructor(private AFauth: AngularFireAuth, private nav: NavController,
     private route: Router, private usuariosService: UsuariosService, private router: Router,
     private toast: ToastController) { }
     

   

login(email:string, senha:string){
  
  this.AFauth.auth.signInWithEmailAndPassword(email, senha).then(res => {
  this.LoginToast();
    
    this.router.navigateByUrl('/TabsPageModule')
    
    
  }).catch(err => this.ErroToast())

  
}
//takvez eu tenha que tirar isso
getAuth() {
  return this.AFauth.auth;
}

  async LoginToast() {
    const toast = await this.toast.create({
      message: 'Login efetuado com sucesso!',
      duration: 3000
    });
    toast.present();
  }
  async ErroToast() {
    const toast = await this.toast.create({
      message: 'E-mail ou Senha está incorreta, tente novamente!',
      duration: 3000
    });
    toast.present();
  }
  

}



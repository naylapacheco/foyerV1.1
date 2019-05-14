import { Component, OnInit, } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import {  NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../modelos/cadastro.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  email:string = ""
  senha:string = ""
  confsenha:string = ""

  cadastro: Cadastro = {
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

  constructor(private route:ActivatedRoute, private nav: NavController,private toastCtrl: ToastController,
    private usuariosService: UsuariosService, private router: Router, public afAuth: AngularFireAuth) { }


   addTudo(){
      this.usuariosService.addTudo(this.cadastro).then(() => {
        this.router.navigateByUrl('/login');
      });    
   }

  async registrar(){
   const {email, senha , confsenha} = this
   if(senha !== confsenha){
     console.error("senha não se conhecidem")
   }
   try{
     const res = await this.afAuth.auth.createUserWithEmailAndPassword(email , senha) 
    console.log(res)
    }
   catch(error){
    console.dir(error)

   }
 }
}

 



import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Cadastro } from '../modelos/cadastro.interface';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public uploadPercent: Observable<number>;
  public downloadUrl: Observable<string>;

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

    constructor(public navCtrl: NavController,private camera: Camera , private platform: Platform,
      private file: File,private loadingController: LoadingController, private route:ActivatedRoute,
      private usuariosService: UsuariosService ) {}

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


  async abrirGaleria(){
  const options: CameraOptions = {
    quality:100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
  
  };
  
  try{
    const fileUri: string = await this.camera.getPicture(options);
  
    let file:string;
    
    if(this.platform.is('ios')){
      file = fileUri.split('/').pop();
    }
    else{
      file = fileUri.substring(fileUri.lastIndexOf('/') + 1, fileUri.indexOf('?'))
    }

    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
  
      const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
      const blob: Blob = new Blob ([buffer], {type: 'image/jpeg'});

      this.uploadPicture(blob);
  }
     catch(error){
     console.error(error);
    }
  
  }

  uploadPicture(blob: Blob){
   
  } 
}
